import { Number, String, Bool } from "../nodes";

import { Type, Predicate } from "./utils";

export class Schema {
	getVariableType(variable: string): Type {
		return Type.NUMBER;
	}

	getPredicates<T extends Number | String | Bool>(variable: Type, type: Type): Predicate[] {
		if (type == Type.BOOL) {
			return [Predicate.EQ, Predicate.NE, Predicate.ISEMPTY, Predicate.ISNOTEMPTY];
		}

		return [Predicate.CT];
	}
}
