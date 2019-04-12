import React from "react";

import { Node, Bool } from "../nodes";
import { Predicate } from "./Predicate";

export class Connective extends React.Component<{
	items: Node[];
	connectives: string[];
}> {
	render() {
		if (!item instanceof Bool) {
			return;
		}
		return this.props.items.map((item as Bool) => (
			<Predicate variable={item.op} predicate="ne" />;
		));
	}
}
