const { Jison } = require("jison");
const path = require("path");
const tsJest = require('ts-jest');

// const {
// 			include = ["*.jison", "**/*.jison"],
// 			exclude,
// 			type = "lalr"
// 		} = options;

// 		const filter = createFilter(include, exclude);

// 		if (!filter(id)) {
// 			return null;
// 		}

// 		const parser = new Jison.Generator(grammar, {
// 			moduleType: "js",
// 			type
// 		});

// 		const source = parser.generate();

// 		const exporter = `
// const parse = parser.parse.bind(parser);
// export { parse };
// export default parser;
// 		`;

// 		return {
// 			code: `${source} ${exporter}`,
// 			map: { mappings: "" }
// 		};

const transform = tsJest.createTransformer();

class JisonTransformer {
	process(src, filename, config, options) {
		console.log("processing", filename);
		const parser = new Jison.Generator(src, {
			moduleType: "js",
			type: "lalr"
		});
		const source = parser.generate();
		const exporter = `
const parse = parser.parse.bind(parser);
export { parse };
export default parser;
		`;

		return transform.process(`${source} ${exporter}`, filename, config, options);
	}
}

module.exports = new JisonTransformer();
