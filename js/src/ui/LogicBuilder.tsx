import React from "react";

import { Node } from "../index";
import { Connective } from "./Connective";

export const LogicBuilder: React.FunctionComponent<{
	expression: Node;
}> = ({ expression }) => {
	const [items, setItems] = React.useState([]);

	return <Connective connectives={[]} items={items} />;
};
