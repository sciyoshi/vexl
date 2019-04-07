import each from "jest-each";
import {
	parse,
	Op,
	Null,
	Bool,
	Number,
	String,
	Ident,
	UnaryOp,
	BoolOp,
	BinOp,
	Empty
} from "../src/index";

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
		["'escape\\\\'", new String("escape\\")],
		// Identifiers
		["a", new Ident("a")],
		["word", new Ident("word")],
		["b6_a4_c3", new Ident("b6_a4_c3")],
		// Unary operators
		["not null", new UnaryOp(Op.NOT, new Null())],
		["not not null", new UnaryOp(Op.NOT, new UnaryOp(Op.NOT, new Null()))],
		// Boolean operators
		["1 and 2", new BoolOp(Op.AND, [new Number(1), new Number(2)])],
		[
			"1 and 2 and 3",
			new BoolOp(Op.AND, [new Number(1), new Number(2), new Number(3)])
		],
		["1 or 2", new BoolOp(Op.OR, [new Number(1), new Number(2)])],
		[
			"1 or 2 or 3",
			new BoolOp(Op.OR, [new Number(1), new Number(2), new Number(3)])
		],
		[
			"not 1 and 2",
			new BoolOp(Op.AND, [new UnaryOp(Op.NOT, new Number(1)), new Number(2)])
		],
		[
			"not 1 or 2",
			new BoolOp(Op.OR, [new UnaryOp(Op.NOT, new Number(1)), new Number(2)])
		],
		[
			"1 and not 2",
			new BoolOp(Op.AND, [new Number(1), new UnaryOp(Op.NOT, new Number(2))])
		],
		[
			"1 or not 2",
			new BoolOp(Op.OR, [new Number(1), new UnaryOp(Op.NOT, new Number(2))])
		],
		[
			"1 and 2 or 3",
			new BoolOp(Op.OR, [
				new BoolOp(Op.AND, [new Number(1), new Number(2)]),
				new Number(3)
			])
		],
		[
			"1 or 2 and 3",
			new BoolOp(Op.OR, [
				new Number(1),
				new BoolOp(Op.AND, [new Number(2), new Number(3)])
			])
		],
		// Binary operators
		["1 is null", new BinOp(new Number(1), Op.IS, new Null())],
		["1 is empty", new BinOp(new Number(1), Op.IS, new Empty())],
		["1 is not null", new BinOp(new Number(1), Op.ISNOT, new Null())],
		["1 is not empty", new BinOp(new Number(1), Op.ISNOT, new Empty())],
		["1 in 2", new BinOp(new Number(1), Op.IN, new Number(2))],
		["1 not in 2", new BinOp(new Number(1), Op.NOTIN, new Number(2))],
		["1 ~ 2", new BinOp(new Number(1), Op.CT, new Number(2))],
		["1 !~ 2", new BinOp(new Number(1), Op.NOTCT, new Number(2))],
		["1 = 2", new BinOp(new Number(1), Op.EQ, new Number(2))],
		["1 != 2", new BinOp(new Number(1), Op.NE, new Number(2))],
		["1 >= 2", new BinOp(new Number(1), Op.GE, new Number(2))],
		["1 > 2", new BinOp(new Number(1), Op.GT, new Number(2))],
		["1 <= 2", new BinOp(new Number(1), Op.LE, new Number(2))],
		["1 < 2", new BinOp(new Number(1), Op.LT, new Number(2))],
		["1 + 2", new BinOp(new Number(1), Op.ADD, new Number(2))],
		["1 - 2", new BinOp(new Number(1), Op.SUB, new Number(2))],
		["1 * 2", new BinOp(new Number(1), Op.MUL, new Number(2))],
		["1 / 2", new BinOp(new Number(1), Op.DIV, new Number(2))],
		[
			"1 * 2 / 3",
			new BinOp(
				new BinOp(new Number(1), Op.MUL, new Number(2)),
				Op.DIV,
				new Number(3)
			)
		],
		[
			"1 / 2 / 3",
			new BinOp(
				new BinOp(new Number(1), Op.DIV, new Number(2)),
				Op.DIV,
				new Number(3)
			)
		],
		[
			"1 * 2 + 3",
			new BinOp(
				new BinOp(new Number(1), Op.MUL, new Number(2)),
				Op.ADD,
				new Number(3)
			)
		],
		[
			"1 + 2 * 3",
			new BinOp(
				new Number(1),
				Op.ADD,
				new BinOp(new Number(2), Op.MUL, new Number(3))
			)
		]
	]).it("parses expression: %s", (expr, val) => {
		expect(parse(expr)).toStrictEqual(val);
	});
});
