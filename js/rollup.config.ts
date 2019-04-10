const Jison = require("jison");
const { createFilter } = require("rollup-pluginutils");
const typescript = require("rollup-plugin-typescript2");
const compileJison = require("./tools/compile-jison.ts");

const jison = () => ({
	name: "jison",
	transform(grammar, id) {
		const filter = createFilter(["*.jison", "**/*.jison"]);

		if (!filter(id)) {
			return null;
		}

		return {
			code: compileJison(grammar),
			map: { mappings: "" }
		};
	}
});

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: "dist/vexl.umd.js",
				name: "vexl",
				format: "umd",
				sourcemap: true
			},
			{ file: "dist/vexl.es5.js", format: "es", sourcemap: true }
		],
		watch: {
			include: "src/**"
		},
		plugins: [jison(), typescript()]
	},
	{
		input: "src/ui/index.tsx",
		output: [
			{
				file: "dist/vexl.ui.umd.js",
				name: "vexl.ui",
				format: "umd",
				sourcemap: true
			},
			{ file: "dist/vexl.ui.es5.js", format: "es", sourcemap: true }
		],
		watch: {
			include: "src/**"
		},
		plugins: [jison(), typescript()]
	}
];
