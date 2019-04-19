import React from "react";
import { GraphQLObjectType } from "graphql";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";

import { Predicate, Condition } from "./utils";

interface VariableOption {
	value: string;
	label: string;
}

interface PredicateOption {
	value: Predicate;
}

interface LogicConditionProps {
	condition: Condition;
	schema: GraphQLObjectType;

	onChange: (condition: Condition) => void;
	onRemove: () => void;
	onAdd: () => void;
}

export class LogicCondition<T> extends React.Component<LogicConditionProps> {
	onVariableChange = (value: ValueType<VariableOption>) => {
		this.props.onChange({
			...this.props.condition,
			variable: value ? (value as VariableOption).value : null
		});
	};

	onPredicateChange = (value: ValueType<PredicateOption>) => {
		this.props.onChange({
			...this.props.condition,
			predicate: value ? (value as PredicateOption).value : null
		});
	};

	getVariableOptions = (): VariableOption[] => {
		return Object.entries(this.props.schema.getFields()).map(([name, type]) => ({
			value: name,
			label: name
		}));
	};

	getPredicateOptions = (): PredicateOption[] => {
		return Object.entries(Predicate).map(([key, val]) => ({ value: val }));
	};

	hasValue() {
		const { predicate } = this.props.condition;
		return predicate && [Predicate.ISEMPTY, Predicate.ISNOTEMPTY].indexOf(predicate) < 0;
	}

	render() {
		return (
			<div className="predicate flex flex-row flex-wrap border-l-4 pl-2 border-gray-300">
				<Select
					styles={{
						container: provided => ({
							...provided,
							flexBasis: "14rem",
							marginRight: "0.5rem"
						})
					}}
					value={
						this.props.condition.variable
							? {
									value: this.props.condition.variable,
									label: this.props.condition.variable
							  }
							: null
					}
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
					value={this.props.condition.predicate ? { value: this.props.condition.predicate } : null}
					options={this.getPredicateOptions()}
					getOptionLabel={option => option.value}
				/>
				{this.hasValue() ? <input type="text" className="border border-gray-400 px-3 py-1 rounded mr-2" /> : null}
				<button onClick={this.props.onRemove} className="bg-gray-400 rounded-full w-8 h-8 mr-2">
					x
				</button>
				<button onClick={this.props.onAdd} className="bg-gray-400 rounded-full w-8 h-8">
					+
				</button>
			</div>
		);
	}
}
