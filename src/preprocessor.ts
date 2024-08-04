import type { PreprocessorGroup } from 'svelte/compiler';
import type { Node as BabelNode } from '@babel/types';

import { walk } from 'estree-walker';
import { parse } from 'svelte-parse-markup';
import { MagicStringAST } from 'magic-string-ast';
import type { Node, Options } from './types';
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

			const s = new MagicStringAST(content);
			const ast = parse(content, { filename });

			// eslint-disable-next-line ts/no-unsafe-argument
			walk(ast.html as any, {
				enter(_node: unknown) {
					const node = _node as Node;

					/* if the node is not an element, we don't care about it */
					if (node.type !== 'Element') {
						this.skip();
					}
					const dataAttr = node.attributes.find(attr =>
						attr.name === attribute,
					);

					/* if the node does not have the data-budoux attribute, we don't care about it */
					if (dataAttr == null) {
						this.skip();
					}

					const { value } = dataAttr as unknown as {
						value: boolean | ({ data: string }[]);
					};

					const parser = getParser(
						typeof value === 'boolean' ? language : value[0].data as Language,
					);

					const __node = node as unknown as BabelNode;
					/* get all text of children with tags */
					const childrenText = s.sliceNode(__node);

					/* parse the text with budoux */
					const parsed = parser.translateHTMLString(childrenText);

					/* replace the children text with the parsed text */
					s.overwriteNode(__node, parsed);
				},
			});

			return {
				code: s.toString(),
				map: s.generateMap(),
			};
		},
	};
}

export { budouxPreprocess };
