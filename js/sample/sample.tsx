import React from "react";
import ReactDOM from "react-dom";

import { parse } from "../dist/vexl.es5.js";
import { LogicBuilder } from "../src/ui/index";

import { introspectionQuery, buildClientSchema, printSchema } from "graphql";

declare global {
	interface Window {
		schema: any;
	}
}

function getQuery() {
	fetch(`https://graphql-pokemon.now.sh/?query=${introspectionQuery}`, {
		method: "post"
	})
		.then(result => result.json())
		.then(result => {
			window.schema = buildClientSchema(result.data);
			console.log(printSchema(buildClientSchema(result.data)));
		});
}

function main() {
	let expression = parse("first_name = 3 and last_name is not empty");

	console.log(expression);

	ReactDOM.render(
		<div className="max-w-4xl mx-auto p-4 md:p-8">
			<LogicBuilder expression={expression} />
		</div>,
		document.getElementById("vexl")
	);
}

// getQuery();

main();
