import React from "react";

import { Predicate } from "./Predicate";

export class Connective extends React.Component<{
	type: "and" | "or";
}> {
	render() {
		return <Predicate variable="first_name" predicate="ne" />;
	}
}
