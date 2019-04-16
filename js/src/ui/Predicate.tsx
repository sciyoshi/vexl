import React from "react";
import { GraphQLObjectType } from "graphql";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";

interface VariableOption {
	value: string;
	label: string;
}

interface PredicateOption {
	value: string;
	label: string;
}

type Pred = {
	variable: string;
};

const predicates = {
	eq: "equals",
	ne: "does not equal",
	ct: "contains",
	notct: "does not contain",
	isnotempty: "exists",
	isempty: "is empty"
};

interface PredicateProps {
	variable: string | null;
	schema: GraphQLObjectType;
	predicate: "eq" | "ne" | "ct" | "notct";

	onVariableChange: (variable: string) => void;
	onPredicateChange: (variable: string) => void;
}

export class Predicate<T> extends React.Component<PredicateProps> {
	static defaultProps = {
		onVariableChange: (variable: string) => null,
		onPredicateChange: (variable: string) => null
	};

	onVariableChange = (value: ValueType<VariableOption>) => {
		console.log("predicate changed", value);
		this.props.onVariableChange("a");
	};

	onPredicateChange = (value: ValueType<PredicateOption>) => {
		console.log("predicate changed", value);
	};

	getVariableOptions = (): VariableOption[] => {
		console.log(this.props.schema.getFields());

		return Object.entries(this.props.schema.getFields()).map(([name, type]) => ({ value: name, label: name }));
	};

	getPredicateOptions = (): PredicateOption[] => {
		return Object.entries(predicates).map(([key, val]) => ({
			value: key,
			label: val
		}));
	};

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
					value={this.props.variable ? { value: this.props.variable, label: "First Name" } : null}
					options={this.getVariableOptions()}
					onChange={this.onVariableChange}
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
					options={this.getPredicateOptions()}
				/>
			</div>
		);
	}
}
