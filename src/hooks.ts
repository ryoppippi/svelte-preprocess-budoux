import type { Handle } from "@sveltejs/kit";
import { parse } from "node-html-parser";
import { Options } from "./types";
import { getParser, resolveOptions } from "./utils";
import { MagicStringAST } from "magic-string-ast";

export function budouxHandle(options: Options = {}): Handle {
  const { language, attribute } = resolveOptions(options);

  const parser = getParser(language);

  return async ({ event, resolve }) => {
    return await resolve(event, {
      transformPageChunk: (async ({ html }) => {
        const s = new MagicStringAST(html);
        const parsedHTML = parse(html);
        const elements = parsedHTML.querySelectorAll(`[${attribute}]`);
        for (const element of elements) {
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
