import React, { useState } from "react";
import ReactDOM from "react-dom";

import { parse } from "../src/index";
import { LogicBuilder } from "../src/ui/index";

import {
	GraphQLSchema,
	GraphQLObjectType,
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

const App: React.FunctionComponent<{ schema: GraphQLObjectType }> = ({
	schema
}) => {
	const [expr, setExpr] = useState(parse('id in "test" and first_name = "samuel"'));

	console.log(expr);

	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8">
			<LogicBuilder schema={schema} onChange={setExpr} expression={expr} />
		</div>
	);
};

function main(schema: GraphQLSchema) {
	const rootType = schema.getType("Pokemon");

	if (!rootType) {
		return;
	}

	ReactDOM.render(<App schema={rootType as GraphQLObjectType} />, document.getElementById("vexl"));
}

getSchema().then(main);
