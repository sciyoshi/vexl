import each from "jest-each";
import { parse, EvaluationVisitor } from "../src/index";

describe("evaluation", () => {
	each([
		// Null
		["null", null],
		// Booleans
		["false", false],
		["true", true],
		// Numbers
		["0", 0],
		["1", 1],
		["3.14", 3.14],
		["0.6", 0.6],
		["42.0", 42],
		["999999999", 999999999],
		// Identifiers
		["a", null],
		["word", null],
		["b6_a4_c3", null],
		// Unary operators
		["not null", null],
		["not false", true],
		["not true", false],
		["not not null", null],
		["not not false", false],
		["not not true", true],
		// Boolean operators
		["1 and 2", 2],
		["1 and 2 and 3", 3],
		["1 or 2", 1],
		["1 or 2 or 3", 1],
		["not 1 and 2", false],
		["not 1 or 2", 2],
		["1 and not 2", false],
		["1 or not 2", 1],
		["1 and 2 or 3", 2],
		["1 or 2 and 3", 1],
		["(1 or 2) and 3", 3],
		// Binary operators

	]).it("evaluates expression: %s", (expr, val) => {
		expect(new EvaluationVisitor().visit(parse(expr))).toEqual(val);
	});
});
