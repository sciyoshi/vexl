import { Number, String, Bool } from "../nodes";

export const enum Connective {
	AND = "and",
	OR = "or"
}

export enum Predicate {
	EQ = "equals",
	NE = "does not equal",
	CT = "contains",
	NOTCT = "does not contain",
	ISNOTEMPTY = "exists",
	ISEMPTY = "is empty"
}

export interface Condition {
	variable: string | null;
	predicate: Predicate | null;
	value?: Number | String | Bool;
}
