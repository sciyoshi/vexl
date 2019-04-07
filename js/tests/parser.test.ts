import each from "jest-each";
import { parse, Null, Bool, Number, String } from "../src/index";

describe("expression parser", () => {
	each([
		// Null
		["null", new Null()],
		// Booleans
		["false", new Bool(false)],
		["true", new Bool(true)],
		// Numbers
		["0", new Number(0)],
		["1", new Number(1)],
		["3.14", new Number(3.14)],
		[".6", new Number(0.6)],
		["42.", new Number(42.0)],
		["999999999", new Number(999999999)],
		// Strings
		['""', new String("")],
		["''", new String("")],
		['"simple"', new String("simple")],
		["'simple'", new String("simple")],
		["'@\"+_$>)&'", new String('@"+_$>)&')],
		['"@\'+_$>)&"', new String("@'+_$>)&")],
		["'escape\\''", new String("escape'")],
		['"escape\\""', new String('escape"')],
		["'escape\\\\'", new String("escape\\")]
	]).it("parses expression: %s", (expr, val) => {
		expect(parse(expr)).toStrictEqual(val);
	});
});
