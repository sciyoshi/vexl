const { Jison } = require("jison");
const { createFilter } = require("rollup-pluginutils");
const typescript = require("rollup-plugin-typescript2");

const pkg = require("./package.json");

const jison = (options = {}) => ({
	name: "jison",
	transform(grammar, id) {
		const {
			include = ["*.jison", "**/*.jison"],
			exclude,
			type = "lalr"
		} = options;

		const filter = createFilter(include, exclude);

		if (!filter(id)) {
			return null;
		}

		const parser = new Jison.Generator(grammar, {
			moduleType: "js",
			type
		});

		const source = parser.generate();

		const exporter = `
const parse = parser.parse.bind(parser);
export { parse };
export default parser;
		`;

		return {
			code: `${source} ${exporter}`,
			map: { mappings: "" }
		};
	}
});

export default {
	input: "src/index.ts",
	output: [
		{ file: pkg.main, name: "vexl", format: "umd", sourcemap: true },
		{ file: pkg.module, format: "es", sourcemap: true }
	],
	watch: {
		include: "src/**"
	},
	plugins: [jison(), typescript()]
};
