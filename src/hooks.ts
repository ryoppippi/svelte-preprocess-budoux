import type { Handle } from "@sveltejs/kit";
import { parse } from "node-html-parser";
import { Options } from "./types";
import { getParser, Language, resolveOptions } from "./utils";
import { MagicStringAST } from "magic-string-ast";

export function budouxHandle(options: Options = {}): Handle {
  const { language, attribute } = resolveOptions(options);

  return async ({ event, resolve }) => {
    return await resolve(event, {
      transformPageChunk: (async ({ html }) => {
        const s = new MagicStringAST(html);
        const parsedHTML = parse(html);
        const elements = parsedHTML.querySelectorAll(`[${attribute}]`);
        for (const element of elements) {
          const attr = element.attributes[attribute]
          const parser = getParser(attr === '' ? language : attr as Language);

          const { range, innerHTML } = element;
          const [start, end] = range;
          const parsed = parser.translateHTMLString(innerHTML);
          s.overwrite(start, end, parsed);
        }
        return s.toString();
      }),
    });
  };
}
