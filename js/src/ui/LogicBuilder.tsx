import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp, Op } from "../index";
import { Connective } from "./Connective";
import { Predicate } from "./Predicate";

function isPredicate(node: Node) {}

function isDisjunctiveNormalForm(node: Node) {
	return (
		node instanceof BoolOp &&
		(node.op == Op.AND || (node.op == Op.OR && node.args.every(arg => arg instanceof BoolOp && arg.op == Op.AND)))
	);
}

export interface LogicBuilderProps {
	expression: Node;
	onChange: (expression: Node) => void;

	schema: GraphQLObjectType;
}

export const LogicBuilder: React.FunctionComponent<LogicBuilderProps> = ({ expression, schema, onChange }) => {
	const [variable, setVariable] = React.useState<string | null>(null);

	console.log("here", expression, isDisjunctiveNormalForm(expression));

	console.log("here", expression instanceof BoolOp);

	if (isDisjunctiveNormalForm(expression)) {
		return <Connective schema={schema} connectives={["and"]} items={[expression]} />;
	} else {
		return <div>Advanced mode not yet supported</div>;
	}
};
