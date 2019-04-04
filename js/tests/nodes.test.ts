import { parse, Null, Bool } from "../src/index"

describe("expression parser", () => {
	it("parses nulls", () => {
		expect(parse('null')).toBeInstanceOf(Null);
		expect(parse('NULL')).toBeInstanceOf(Null);
	});
});
