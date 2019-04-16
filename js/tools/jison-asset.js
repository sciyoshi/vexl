const { Asset } = require("parcel-bundler");
const compileJison = require("./compile-jison");

class JisonAsset extends Asset {
	constructor(name, options) {
		super(name, options);
		this.type = "js";
	}

	generate() {
		return [
			{
				type: "js",
				value: compileJison(this.contents)
			}
		];
	}
}

module.exports = JisonAsset;
