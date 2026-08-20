import chineseMythology from "./chinese-mythology.js";
import claudeCode from "./claude-code.js";
import chineseModalWords from "./chinese-modal-words.js";
import classicalChineseInterjections from "./classical-chinese-interjections.js";
import journeyToTheWest from "./journey-to-the-west.js";
import romanceOfTheThreeKingdoms from "./romance-of-the-three-kingdoms.js";
import niulaiMeme from "./niulai-meme.js";
import chinaSlogans from "./china-slogans.js";

export const DEFAULT_LIBRARY_ID = chineseMythology.id;
export const BUILTIN_LIBRARY_LIST = [chineseMythology, claudeCode, chineseModalWords, classicalChineseInterjections, journeyToTheWest, romanceOfTheThreeKingdoms, niulaiMeme, chinaSlogans];

export const BUILTIN_LIBRARIES = Object.fromEntries(
  BUILTIN_LIBRARY_LIST.map(function ({ id, name, phrases }) {
    return [id, { name, phrases }];
  })
);
