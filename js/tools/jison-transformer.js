const path = require("path");
const tsJest = require("ts-jest");
const babelJest = require("babel-jest");
const compileJison = require("./compile-jison");

const transform = babelJest.createTransformer();

class JisonTransformer {
	process(src, filename, config, options) {
		return transform.process(compileJison(src), filename, config, options);
	}
}

module.exports = new JisonTransformer();
