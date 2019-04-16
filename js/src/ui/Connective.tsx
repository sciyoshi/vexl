import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp } from "../nodes";
import { Predicate } from "./Predicate";

export const Connective: React.FunctionComponent<{
	items: Node[];
	connectives: string[];
	schema: GraphQLObjectType;
}> = ({ items, connectives, schema }) => (
	<div>
		{items.map((item, i) => (
			<>
				{i > 0 ? <button>{connectives[i - 1]}</button> : null}
				<Predicate
					schema={schema}
					variable={null}
					predicate="ne"
				/>
			</>
		))}
	</div>
);
