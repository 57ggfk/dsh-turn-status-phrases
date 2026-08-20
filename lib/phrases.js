export { BUILTIN_LIBRARIES, BUILTIN_LIBRARY_LIST, DEFAULT_LIBRARY_ID } from "./builtin-libraries/index.js";

import { BUILTIN_LIBRARIES } from "./builtin-libraries/index.js";

export function normalizeLibraries(value) {
  if (!value || typeof value !== "object") return { ...BUILTIN_LIBRARIES };
  const result = {};
  for (const [id, library] of Object.entries(value)) {
    if (!library || typeof library.name !== "string" || !Array.isArray(library.phrases)) continue;
    const phrases = [...new Set(library.phrases.filter((phrase) => typeof phrase === "string" && phrase.trim()))];
    if (phrases.length) result[id] = { name: library.name.trim(), phrases };
  }
  return Object.keys(result).length ? result : { ...BUILTIN_LIBRARIES };
}

export function nextPhrase(library, previous) {
  const phrases = library?.phrases ?? [];
  if (!phrases.length) return "Deep diving";
  if (phrases.length === 1) return phrases[0];
  const candidates = phrases.filter((phrase) => phrase !== previous);
  return candidates[Math.floor(Math.random() * candidates.length)];
}
