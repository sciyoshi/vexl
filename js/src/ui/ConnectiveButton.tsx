import React from "react";

import { Connective, Condition } from "./utils";

export const ConnectiveButton: React.FunctionComponent<{ type: Connective } | React.HTMLProps<HTMLButtonElement>> = ({ type, ...props }) => {
	return (
		<div className={type == Connective.AND ? "border-l-4 pl-2 border-gray-300" : ""}>
			<button {...props} className="rounded border border-teal-400 uppercase font-bold px-3 py-1 my-3 text-sm ">{type}</button>
		</div>
	);
};
