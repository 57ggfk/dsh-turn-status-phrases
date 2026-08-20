import test from "node:test";
import assert from "node:assert/strict";
import { BUILTIN_LIBRARIES, BUILTIN_LIBRARY_LIST, DEFAULT_LIBRARY_ID, nextPhrase, normalizeLibraries } from "../lib/phrases.js";

test("registers each built-in library by its module id", () => {
  assert.equal(DEFAULT_LIBRARY_ID, "chinese-mythology");
  assert.deepEqual(Object.keys(BUILTIN_LIBRARIES), BUILTIN_LIBRARY_LIST.map((library) => library.id));
  for (const library of BUILTIN_LIBRARY_LIST) {
    assert.equal(BUILTIN_LIBRARIES[library.id].name, library.name);
    assert.deepEqual(BUILTIN_LIBRARIES[library.id].phrases, library.phrases);
  }
});

test("ships the Chinese mythology library", () => {
  const library = BUILTIN_LIBRARIES[DEFAULT_LIBRARY_ID];
  assert.equal(library.name, "中国神话");
  for (const phrase of ["嫦娥奔月", "精卫填海", "夸父逐日", "后羿射日", "女娲补天"]) assert.ok(library.phrases.includes(phrase));
});

test("does not repeat the previous phrase when alternatives exist", () => {
  const library = { phrases: ["甲", "乙"] };
  for (let i = 0; i < 20; i++) {
    const value = nextPhrase(library, "甲");
    assert.equal(value, "乙");
  }
});

test("normalizes invalid custom libraries and falls back safely", () => {
  const normalized = normalizeLibraries({ bad: null, good: { name: "自定义", phrases: ["  云  ", "云", 3] } });
  assert.deepEqual(normalized.good.phrases, ["  云  ", "云"]);
  assert.equal(nextPhrase({ phrases: [] }, ""), "Deep diving");
});
