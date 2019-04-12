import React from "react";
import { GraphQLObjectType } from "graphql"
import Select from "react-select";
import { ValueType } from "react-select/lib/types";

interface VariableOption {
	value: string;
}

interface PredicateOption {
	value: string;
	label: string;
}

const predicates = {
	eq: "equals",
	ne: "does not equal",
	ct: "contains",
	notct: "does not contain",
	isnotempty: "exists",
	isempty: "is empty"
};

interface PredicateProps {
	variable: string
	schema: GraphQLObjectType
	predicate: "eq" | "ne" | "ct" | "notct";

	onVariableChange: (variable: string) => null;
	onPredicateChange: (variable: string) => null;
}

export class Predicate extends React.Component<PredicateProps> {
	static defaultProps = {
		onVariableChange: (variable: string) => null,
		onPredicateChange: (variable: string) => null
	};

	onVariableChange = (value: ValueType<VariableOption>) {
		console.log("predicate changed", value);
	}

	onPredicateChange = (value: ValueType<PredicateOption>) => {
		console.log("predicate changed", value);
	};

	getVariableOptions = (): VariableOption[] => {
		console.log(this.props.schema.getFields());

		return Object.entries(this.props.schema.getFields()).map(([name, type]) => ({ value: name, label: name }));
	}

	render() {
		return (
			<div className="predicate flex flex-row flex-wrap">
				<Select
					styles={{
						container: provided => ({
							...provided,
							flexBasis: "20rem",
							marginRight: "0.5rem"
						})
					}}
					value={{ value: this.props.variable, label: "First Name" }}
					options={this.getVariableOptions()}
				/>
				<Select
					styles={{
						container: provided => ({
							...provided,
							width: "auto",
							marginRight: "0.5rem",
							minWidth: "10rem"
						})
					}}
					onChange={this.onPredicateChange}
					value={{
						value: this.props.predicate,
						label: predicates[this.props.predicate]
					}}
					options={Object.entries(predicates).map(([key, val]) => ({
						value: key,
						label: val
					}))}
				/>
			</div>
		);
	}
}
