import type { Handle } from "@sveltejs/kit";
import { parse } from "node-html-parser";
import { Options } from "./types";
import { getParser, resolveOptions } from "./utils";

export function budouxHandle(options: Options = {}): Handle {
  const { language, attribute } = resolveOptions(options);

  const parser = getParser(language);

  return async ({ event, resolve }) => {
    return await resolve(event, {
      transformPageChunk: (async ({ html }) => {
        const parsedHTML = parse(html);
        const elements = parsedHTML.querySelectorAll(`[${attribute}]`);
        for (const element of elements) {
          const childrenText = element.text;
          const parsed = parser.translateHTMLString(childrenText);
          element.set_content(parsed);
        }
        return parsedHTML.toString();
      }),
    });
  };
}
