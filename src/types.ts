import type { BaseNode } from "estree";

export interface Node extends BaseNode {
  name: string;
  start: number;
  end: number;
  attributes: Array<{ name: string; type: string }>;
  children?: Array<Node>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: unknown;
}

/**
 * Options for the budoux preprocessor
 * @param language - The language to translate to (default: `ja`)
 * @param attribute - The attribute to look for to translate (default: `data-budoux`)
 */
export interface Options {
  language?: "ja" | "cs" | "ct" | "th";
  attribute?: string;
}

export const DEFAULT_OPTIONS = {
  language: "ja",
  attribute: `data-budoux`,
} as const satisfies Options;
