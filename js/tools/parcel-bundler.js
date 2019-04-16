const Bundler = require("parcel-bundler");
const path = require("path");

const entryFiles = path.join(__dirname, "..", "sample", "index.html");

const options = {
	cache: false
};

(async function() {
	const bundler = new Bundler(entryFiles, options);

	bundler.addAssetType("jison", require.resolve("./jison-asset"));

	const bundle = await bundler.serve();
})();
