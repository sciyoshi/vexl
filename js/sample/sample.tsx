import React from "react";
import ReactDOM from "react-dom";

import { Connective } from "../src/ui/index";

function main() {
	ReactDOM.render(
		<div>
			<Connective type="and" />
		</div>,
		document.getElementById("vexl")
	);
}

main();
