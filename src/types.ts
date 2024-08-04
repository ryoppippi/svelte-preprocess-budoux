/**
 * Options for the budoux preprocessor
 * @param language - The default language to translate to (default: `ja`)
 * @param attribute - The attribute to look for to translate (default: `data-budoux`)
 */
export type Options = {
	language?: 'ja' | 'cs' | 'ct' | 'th';
	attribute?: string;
};

export const DEFAULT_OPTIONS = {
	language: 'ja',
	attribute: `data-budoux`,
} as const satisfies Options;
