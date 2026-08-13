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

export const searchAllowedChunks = async ({ bookId, question, maxOrder }) => {
  const filterBy =
    maxOrder == null
      ? `bookId:=${bookId}`
      : `bookId:=${bookId} && order:<=${maxOrder}`;

  const results = await typesense.collections(COLLECTION).documents().search({
    q: question,
    query_by: "text",
    filter_by: filterBy,
    per_page: 8,
  });

  return (results.hits || []).map((hit) => hit.document);
};
