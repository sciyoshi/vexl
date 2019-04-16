import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp, BinOp, Op } from "../index";
import { LogicGroup } from "./LogicGroup";
import { Predicate } from "./Predicate";
import { Connective } from "./utils";

function isPredicate(node: Node) {
	// FIXME: check left and right
	return node instanceof BinOp;
}

function isDisjunctiveNormalForm(node: Node): boolean {
	return (
		isPredicate(node) ||
		(node instanceof BoolOp &&
			((node.op == Op.AND && node.args.every(isPredicate)) ||
				(node.op == Op.OR && node.args.every(isDisjunctiveNormalForm))))
	);
}

function flattenDNF(node: Node): { els: Node[]; connectives: Connective[] } {
	if (node instanceof BoolOp && node.op == Op.AND) {
		return {
			els: node.args,
			connectives: new Array<Connective>(node.args.length - 1).fill(Connective.AND)
		};
	} else if (node instanceof BoolOp && node.op == Op.OR) {
		const result = node.args.map(flattenDNF).reduce(
			(prev, cur) => ({
				els: [...prev.els, ...cur.els],
				connectives: [...prev.connectives, Connective.OR, ...cur.connectives]
			}),
			{ els: [], connectives: [] }
		);

		result.connectives.shift();

		return result;
	} else {
		return {
			els: [node],
			connectives: []
		};
	}
}

export interface LogicBuilderProps {
	expression: Node;
	onChange: (expression: Node) => void;

	schema: GraphQLObjectType;
}

export const LogicBuilder: React.FunctionComponent<LogicBuilderProps> = ({ expression, schema, onChange }) => {
	const [variable, setVariable] = React.useState<string | null>(null);

	if (isDisjunctiveNormalForm(expression)) {
		const { els, connectives } = flattenDNF(expression);

		return <LogicGroup schema={schema} connectives={connectives} items={els} />;
	} else {
		return <div>Advanced mode not yet supported</div>;
	}
};
