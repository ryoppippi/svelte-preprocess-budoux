import defu from "defu";
import * as budoux from "budoux";
import { DEFAULT_OPTIONS, Options } from "./types";

export type HTMLProcessingParser = budoux.HTMLProcessingParser;

export function resolveOptions(options: Options) {
  return defu(options, DEFAULT_OPTIONS);
}

export function getParser(
  language: Exclude<Options["language"], null | undefined>,
) {
  switch (language) {
    case "ja":
      return budoux.loadDefaultJapaneseParser();
    case "cs":
      return budoux.loadDefaultSimplifiedChineseParser();
    case "ct":
      return budoux.loadDefaultTraditionalChineseParser();
    case "th":
      return budoux.loadDefaultThaiParser();
    default:
      language satisfies never;
      throw new Error(`Language ${language} is not supported`);
  }
}
