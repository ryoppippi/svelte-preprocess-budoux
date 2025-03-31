import type { Handle } from '@sveltejs/kit';
import { parse } from 'node-html-parser';
import MagicString from 'magic-string';
import type { Options } from './types';
import type { Language } from './utils';
import { getParser, resolveOptions } from './utils';

export function budouxHandle(options: Options = {}): Handle {
	const { language, attribute } = resolveOptions(options);

	return async ({ event, resolve }) => {
		return resolve(event, {
			transformPageChunk: async ({ html }) => {
				const s = new MagicString(html);
				const parsedHTML = parse(html);
				const elements = parsedHTML.querySelectorAll(`[${attribute}]`);
				for (const element of elements) {
					const attr = element.attributes[attribute];
					const parser = getParser(attr === '' ? language : attr as Language);

					const { range, innerHTML } = element;
					const [start, end] = range;
					const parsed = parser.translateHTMLString(innerHTML);
					s.overwrite(start, end, parsed);
				}
				return s.toString();
			},
		});
	};
}
