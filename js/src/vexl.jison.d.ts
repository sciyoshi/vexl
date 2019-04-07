import * as nodes from "./nodes";

declare const vexl: {
	parse: (val: string) => nodes.Node;
};

export const parse: (val: string) => nodes.Node;
