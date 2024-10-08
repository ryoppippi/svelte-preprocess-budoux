import type { PreprocessorGroup } from 'svelte/compiler';
import type { TemplateNode } from 'svelte-eslint-parser/lib/parser/svelte-ast-types';

import { walk } from 'zimmerframe';
import { parse } from 'svelte-parse-markup';
import MagicString from 'magic-string';
import type { Options } from './types';
import type { Language } from './utils';
import { getParser, resolveOptions } from './utils';

function budouxPreprocess(options: Options = {}): PreprocessorGroup {
	const { language, attribute } = resolveOptions(options);

	return {
		markup(o) {
			const { content, filename } = o;

			if (!content.includes(attribute)) {
				return;
			}

			const s = new MagicString(content);
			const ast = parse(content, { filename });

			const state = [] as { start: number; end: number; parsed: string }[];

			walk(ast.html as TemplateNode, state, {
				Element(node, { state, next }) {
					const dataAttr = node?.attributes
						?.filter(attr => attr.type === 'Attribute')
						.find(attr => attr.name === attribute);

					/* if the node does not have the data-budoux attribute, we don't care about it */
					if (dataAttr == null) {
						return next(state);
					}

					const parserLanguage: Language = (() => {
						const { value } = dataAttr;

						if (value === true) {
							return language;
						}

						const first = value.at(0);

						if (first == null) {
							throw new Error('Invalid language');
						}

						if (first.type === 'Text') {
							return first.data as Language;
						}

						throw new Error('Invalid language');
					})();

					const parser = getParser(parserLanguage);

					const { start, end } = node;

					/* get all text of children with tags */
					const childrenText = s.slice(start, end);

					/* parse the text with budoux */
					const parsed = parser.translateHTMLString(childrenText);

					state.push({ start, end, parsed });
				},
			});

			/* replace the children text with the parsed text */
			state.forEach(({ start, end, parsed }) => {
				s.overwrite(start, end, parsed);
			});

			if (s.hasChanged()) {
				return {
					code: s.toString(),
					map: s.generateMap(),
				};
			}

			return { code: content };
		},
	};
}

export { budouxPreprocess };
