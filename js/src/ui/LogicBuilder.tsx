import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp, BinOp, Ident, Op } from "../index";
import { LogicGroup } from "./LogicGroup";
import { Connective, Condition } from "./utils";

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

function toCondition(node: Node): Condition {
	if (!(node instanceof BinOp)) {
		return {
			variable: null,
			predicate: null
		};
	}

	return {
		variable: (node.left as Ident).name,
		predicate: null
	};
}

function flattenDNF(node: Node): { els: Condition[]; connectives: Connective[] } {
	if (node instanceof BoolOp && node.op == Op.AND) {
		return {
			els: node.args.map(toCondition),
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
			els: [toCondition(node)],
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
	const dnf = flattenDNF(expression);
	const [advanced, setAdvanced] = React.useState(false);
	const [items, setItems] = React.useState<Condition[]>(dnf.els);
	const [connectives, setConnectives] = React.useState(dnf.connectives);
	const [prevExpression, setPrevExpression] = React.useState<Node | null>(null);

	if (isDisjunctiveNormalForm(expression)) {
		return <LogicGroup schema={schema} connectives={connectives} items={items} onItemsChanged={setItems} onConnectivesChanged={setConnectives} />;
	} else {
		return <div>Advanced mode not yet supported</div>;
	}
};
