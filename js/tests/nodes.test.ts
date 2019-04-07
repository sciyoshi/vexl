import each from "jest-each";
import { parse, Null, Bool } from "../src/index";

describe("expression parser", () => {
	each([
		["null", "null"],
		// Booleans
		["false"],
		["true"],
		// Unary operators
		["not null"],
		["not not null"],
		// Boolean operators
		["1 and 2"],
		["1 and 2 and 3"],
		["1 or 2"],
		["1 or 2 or 3"],
		["not 1 and 2"],
		["not 1 or 2"],
		["1 and not 2"],
		["1 or not 2"],
		["1 and 2 or 3"],
		["1 or 2 and 3"]
		// ["(1 or 2) and 3"]
	]).it("parses expression: %s", expr => {
		expect(parse(expr).toString()).toEqual(expr);
	});
});
