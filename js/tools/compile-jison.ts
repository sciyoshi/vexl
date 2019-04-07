const { Jison } = require("jison");

const imports = `
import * as nodes from "./nodes";
import { unescapeUnicode } from "./utils";
`;

const exporter = `
const parse = parser.parse.bind(parser);
export { parse };
export default parser;
`;

module.exports = function(src) {
	const parser = new Jison.Generator(src, {
		moduleType: "js",
		type: "lalr"
	});

	const source = parser.generate();

	return `${imports} ${parser.generate()} ${exporter}`;
};
