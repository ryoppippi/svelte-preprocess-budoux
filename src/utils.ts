import defu from "defu";
import * as budoux from "budoux";
import { DEFAULT_OPTIONS, Options } from "./types";

export type HTMLProcessingParser = budoux.HTMLProcessingParser;
export type Language = Exclude<Options["language"], null | undefined>;

export function resolveOptions(options: Options) {
  return defu(options, DEFAULT_OPTIONS);
}

/** Cache for the parser */
let parserCache: Record<string, HTMLProcessingParser> = {};

export function getParser(
  language: Language,
): HTMLProcessingParser {
  switch (language) {
    case "ja":
      return parserCache["ja"] ??= budoux.loadDefaultJapaneseParser();
    case "cs":
      return parserCache["cs"] ??= budoux.loadDefaultSimplifiedChineseParser();
    case "ct":
      return parserCache["ct"] ??= budoux.loadDefaultTraditionalChineseParser();
    case "th":
      return parserCache["th"] ??= budoux.loadDefaultThaiParser();
    default:
      language satisfies never;
      throw new Error(`Language ${language} is not supported`);
  }
}
