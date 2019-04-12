import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp } from "../index";
import { Connective } from "./Connective";
import { Predicate } from "./Predicate";

export const LogicBuilder: React.FunctionComponent<{
	expression: Node;
	schema: GraphQLObjectType
}> = ({ expression, schema }) => {
	if (expression instanceof BoolOp) {
		const [items, setItems] = React.useState([""]);

		return <Connective connectives={[]} items={items} />;
	} else {
		return <Predicate schema={schema} variable="first_name" predicate="ne" />;
	}
};
