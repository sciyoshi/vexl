import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp, Op } from "../index";
import { Connective } from "./Connective";
import { Predicate } from "./Predicate";

function isDisjunctiveNormalForm(node: Node) {
	return (
		node instanceof BoolOp &&
		(node.op == Op.AND || (node.op == Op.OR && node.args.every(arg => arg instanceof BoolOp && arg.op == Op.AND)))
	);
}

export const LogicBuilder: React.FunctionComponent<{
	expression: Node;
	schema: GraphQLObjectType;
}> = ({ expression, schema }) => {
	const [variable, setVariable] = React.useState(null);
	if (isDisjunctiveNormalForm(expression)) {
		return <Connective schema={schema} connectives={[]} items={[]} />;
	} else {
		return <Predicate schema={schema} variable={variable} predicate="ne" onVariableChange={setVariable} />;
	}
};
