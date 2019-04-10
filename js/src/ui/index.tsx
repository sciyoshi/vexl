import React from "react";

export class Connective extends React.Component<{
	type: "and" | "or";
}> {
	render() {
		return <div>{this.props.type}</div>;
	}
}
