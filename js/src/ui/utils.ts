import { Node, Number, String, Bool } from "../nodes";

export const enum Connective {
	AND = "and",
	OR = "or"
}

export enum Type {
	NUMBER,
	STRING,
	BOOL
}

export type Variable = {
	node: Node;
	type: Type;
};

export type Value = Number | String | Bool;

export enum Predicate {
	EQ = "equals",
	NE = "does not equal",
	CT = "contains",
	NOTCT = "does not contain",
	ISNOTEMPTY = "exists",
	ISEMPTY = "is empty"
}

export interface Condition {
	variable?: Variable;
	predicate?: Predicate;
	value?: Number | String | Bool;
}
