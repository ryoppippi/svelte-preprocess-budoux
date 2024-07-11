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
