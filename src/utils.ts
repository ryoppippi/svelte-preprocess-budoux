import defu from 'defu';
import * as budoux from 'budoux';
import type { Options } from './types';
import { DEFAULT_OPTIONS } from './types';

export type HTMLProcessingParser = budoux.HTMLProcessingParser;
export type Language = Exclude<Options['language'], null | undefined>;

export function resolveOptions(options: Options) {
	return defu(options, DEFAULT_OPTIONS);
}

/** Cache for the parser */
const parserCache: Record<string, HTMLProcessingParser> = {};

export function getParser(
	language: Language,
): HTMLProcessingParser {
	switch (language) {
		case 'ja':
			return parserCache.ja ??= budoux.loadDefaultJapaneseParser();
		case 'cs':
			return parserCache.cs ??= budoux.loadDefaultSimplifiedChineseParser();
		case 'ct':
			return parserCache.ct ??= budoux.loadDefaultTraditionalChineseParser();
		case 'th':
			return parserCache.th ??= budoux.loadDefaultThaiParser();
		default:
      language satisfies never;
			// eslint-disable-next-line ts/restrict-template-expressions
			throw new Error(`Language ${language} is not supported`);
	}
}
