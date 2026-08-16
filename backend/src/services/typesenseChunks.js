import typesense from "../config/typesense.js";
import Chapter from "../models/chapter.js";

const COLLECTION = "book_chunks";
const CHUNK_SIZE = 1000;

const chunksSchema = {
  name: COLLECTION,
  fields: [
    { name: "bookId", type: "string", facet: true },
    { name: "order", type: "int32" },
    { name: "chapterNo", type: "int32" },
    { name: "chapterTitle", type: "string" },
    { name: "text", type: "string" },
  ],
};

const splitText = (text) => {
  const trimmed = (text || "").trim();
  if (!trimmed) return [];
  if (trimmed.length <= CHUNK_SIZE) return [trimmed];

  const parts = [];
  for (let i = 0; i < trimmed.length; i += CHUNK_SIZE) {
    parts.push(trimmed.slice(i, i + CHUNK_SIZE));
  }
  return parts;
};

export const createChunksCollection = async () => {
  const collections = await typesense.collections().retrieve();
  const exists = collections.some((c) => c.name === COLLECTION);
  if (exists) return;
  await typesense.collections().create(chunksSchema);
};

export const indexChapterChunks = async () => {
  const chapters = await Chapter.find().lean();
  const documents = [];

  for (const chapter of chapters) {
    const pieces = splitText(chapter.content);
    pieces.forEach((text, i) => {
      documents.push({
        id: `${chapter.bookId}_${chapter.order}_${i}`,
        bookId: chapter.bookId.toString(),
        order: chapter.order,
        chapterNo: chapter.chapterNo,
        chapterTitle: chapter.title,
        text,
      });
    });
  }

  if (documents.length === 0) {
    console.log("No chapter chunks to index");
    return 0;
  }

  await typesense
    .collections(COLLECTION)
    .documents()
    .import(documents, { action: "upsert" });

  return documents.length;
};

export const syncChapterChunksToTypesense = async () => {
  const collections = await typesense.collections().retrieve();
  const exists = collections.some((c) => c.name === COLLECTION);
  if (exists) {
    await typesense.collections(COLLECTION).delete();
  }
  await typesense.collections().create(chunksSchema);
  const count = await indexChapterChunks();
  console.log(`Typesense synced ${count} book chunks`);
};

const STOP = new Set([
  "what", "who", "whom", "whose", "this", "that", "does", "mean", "about",
  "from", "with", "have", "been", "they", "them", "were", "when", "where",
  "which", "would", "could", "should", "chapter", "book", "explain",
]);

const extraSearchTerms = (question) => {
  const terms = [];
  for (const raw of question.match(/[A-Za-z][A-Za-z']{2,}/g) || []) {
    const word = raw.replace(/'s$/i, "");
    if (STOP.has(word.toLowerCase())) continue;
    const isName =
      word[0] === word[0].toUpperCase() &&
      word.slice(1) === word.slice(1).toLowerCase();
    if (!isName) continue;
    if (!terms.some((t) => t.toLowerCase() === word.toLowerCase())) {
      terms.push(word);
    }
  }
  return terms.slice(0, 3);
};

export const searchAllowedChunks = async ({ bookId, question, maxOrder }) => {
  const filterBy =
    maxOrder == null
      ? `bookId:=${bookId}`
      : `bookId:=${bookId} && order:<=${maxOrder}`;

  const queries = [question, ...extraSearchTerms(question)];
  const seen = new Set();
  const chunks = [];

  for (const q of queries) {
    const query = q.trim().slice(0, 80);
    if (!query) continue;
    try {
      const results = await typesense.collections(COLLECTION).documents().search({
        q: query,
        query_by: "text",
        filter_by: filterBy,
        per_page: 4,
      });

      for (const hit of results.hits || []) {
        const id = hit.document?.id;
        if (!id || seen.has(id)) continue;
        seen.add(id);
        chunks.push(hit.document);
      }
    } catch (error) {
      console.error("Typesense chunk search failed:", error.message);
    }
  }

  return chunks.slice(0, 4);
};
