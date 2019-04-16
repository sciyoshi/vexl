import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp } from "../nodes";
import { Predicate } from "./Predicate";
import { Connective } from "./utils";

export const LogicGroup: React.FunctionComponent<{
	items: Node[];
	connectives: Connective[];
	schema: GraphQLObjectType;
}> = ({ items, connectives, schema }) => (
	<div>
		{items.map((item, i) => (
			<>
				{i > 0 ? <button>{connectives[i - 1]}</button> : null}
				<Predicate schema={schema} variable={null} predicate="ne" />
			</>
		))}
	</div>
);
