import React, { useState } from "react";
import ReactDOM from "react-dom";

import { parse } from "../dist/vexl.es5.js";
import { LogicBuilder } from "../src/ui/index";

import {
	GraphQLSchema,
	introspectionQuery,
	buildClientSchema,
	printSchema
} from "graphql";

declare global {
	interface Window {
		schema: GraphQLSchema;
	}
}

function getSchema() {
	return fetch(`https://graphql-pokemon.now.sh/?query=${introspectionQuery}`, {
		method: "post"
	})
		.then(result => result.json())
		.then(result => buildClientSchema(result.data));
}

const App: React.FunctionComponent<{ schema: GraphQLSchema }> = ({
	schema
}) => {
	const [expr, setExpr] = useState(parse('first_name = "samuel"'));

	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8">
			<LogicBuilder schema={schema.getType("Pokemon")} expression={expr} />
		</div>
	);
};

function main(schema: GraphQLSchema) {
	ReactDOM.render(<App schema={schema} />, document.getElementById("vexl"));
}

getSchema().then(main);
