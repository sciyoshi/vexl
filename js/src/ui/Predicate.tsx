import React from "react";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";

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

export class Predicate extends React.Component<{
	variable: string;
	predicate: "eq" | "ne" | "ct" | "notct";
}> {
	onPredicateChange = (value: ValueType<PredicateOption>) => {
		console.log("predicate changed", value);
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
					value={{ value: this.props.variable, label: "First Name" }}
					options={[
						{ value: "first_name", label: "First Name" },
						{ value: "last_name", label: "Last Name" },
						{ value: "long_prop", label: "Some Very Long Property Here" }
					]}
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
