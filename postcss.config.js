module.exports = {
	plugins: {
		autoprefixer: {}
	},
	overrides: [
		{
			files: ["*.html", "**/*.html"],
			customSyntax: "postcss-html"
		}
	]
};
