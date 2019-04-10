import React from "react";

import { Node } from "../index";
import { Connective } from "./Connective";

export const LogicBuilder: React.FunctionComponent<{
	expression: Node;
}> = ({ expression }) => <Connective type="and" />;
