import Chapter from "../models/chapter.js";
import { searchAllowedChunks } from "./typesenseChunks.js";
import {
  clipAroundIndex,
  extractQuotedPassage,
  findFlexibleIndex,
} from "../utils/textMatch.js";

const MAX_EXCERPT = 1800;
const MAX_CHUNKS = 4;

const trimChunk = (text) => {
  if (!text) return "";
  return text.length <= MAX_EXCERPT ? text : `${text.slice(0, MAX_EXCERPT).trim()}…`;
};

const toChunk = (chapter, text) => ({
  order: chapter.order,
  chapterTitle: chapter.title,
  text: trimChunk(text),
});

const findInChapter = (chapter, passage) => {
  const index = findFlexibleIndex(chapter.content, passage);
  if (index < 0) return null;
  return toChunk(
    chapter,
    clipAroundIndex(chapter.content, index, passage.length, 650)
  );
};

export const buildQaContext = async ({
  bookId,
  question,
  passage,
  order,
  maxOrder,
}) => {
  const selected = extractQuotedPassage(question, passage);
  const explainingPassage = Boolean(selected) || /^what does this mean/i.test(question);
  const chunks = [];
  const seen = new Set();

  const add = (chunk) => {
    if (!chunk?.text) return;
    const key = `${chunk.order}:${chunk.text.slice(0, 48)}`;
    if (seen.has(key)) return;
    seen.add(key);
    chunks.push(chunk);
  };

  const current = order
    ? await Chapter.findOne({ bookId, order })
        .select("order title content")
        .lean()
    : null;

  if (selected) {
    if (current) {
      const hit = findInChapter(current, selected);
      if (hit) add(hit);
    }

    if (chunks.length === 0) {
      const allowed = await Chapter.find({
        bookId,
        ...(maxOrder != null ? { order: { $lte: maxOrder } } : {}),
      })
        .select("order title content")
        .sort({ order: 1 })
        .lean();

      for (const chapter of allowed) {
        const hit = findInChapter(chapter, selected);
        if (hit) {
          add(hit);
          break;
        }
      }
    }

    return { selected, explainingPassage, chunks, passageFound: chunks.length > 0 };
  }

  const searched = await searchAllowedChunks({
    bookId: bookId.toString(),
    question,
    maxOrder,
  });
  searched.slice(0, MAX_CHUNKS).forEach((chunk) =>
    add({
      order: chunk.order,
      chapterTitle: chunk.chapterTitle,
      text: trimChunk(chunk.text),
    })
  );

  if (chunks.length === 0 && current?.content) {
    add(toChunk(current, current.content.slice(0, MAX_EXCERPT)));
  }

  return { selected, explainingPassage, chunks, passageFound: true };
};
