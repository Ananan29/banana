const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fold = (value) =>
  value
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, "-");

export const extractQuotedPassage = (question, passage) => {
  const fromBody = passage?.trim();
  if (fromBody && fromBody.length >= 8) return fromBody.replace(/\s+/g, " ").trim();

  const quoted = question.match(/["“”]([\s\S]{8,})["“”]/);
  return quoted?.[1]?.replace(/\s+/g, " ").trim() || "";
};

export const findFlexibleIndex = (content, passage) => {
  if (!content || !passage) return -1;
  const source = fold(content);
  const words = fold(passage).trim().split(/\s+/).filter(Boolean).slice(0, 18);
  if (words.length < 3) {
    return source.toLowerCase().indexOf(fold(passage).toLowerCase().slice(0, 40));
  }
  const pattern = words.map(escapeRegex).join("\\s+");
  const match = source.match(new RegExp(pattern, "i"));
  return match ? match.index : -1;
};

export const clipAroundIndex = (content, index, length, radius = 700) => {
  if (index < 0) return "";
  const start = Math.max(0, index - radius);
  const end = Math.min(content.length, index + length + radius);
  return content.slice(start, end).trim();
};
