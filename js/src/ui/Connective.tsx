import React from "react";

import { Node, BoolOp } from "../nodes";
import { Predicate } from "./Predicate";

export class Connective extends React.Component<{
	items: Node[];
	connectives: string[];
}> {
	render() {
		return this.props.items.map((item) => (
			<Predicate variable={(item as BoolOp).op} predicate="ne" />
		));
	}
}
