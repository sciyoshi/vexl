import React from "react";
import { GraphQLObjectType } from "graphql";

import { Node, BoolOp } from "../nodes";
import { Predicate } from "./Predicate";

export class Connective extends React.Component<{
	items: Node[];
	connectives: string[];
	schema: GraphQLObjectType;
}> {
	render() {
		return this.props.items.map(item => (
			<Predicate
				schema={this.props.schema}
				variable={(item as BoolOp).op}
				predicate="ne"
				onVariableChange={setVariable}
			/>
		));
	}
}
