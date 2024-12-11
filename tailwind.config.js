/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"divide-line-color": "#E0E4EC"
			}
		}
	},
	plugins: [
		function ({ addBase }) {
			addBase({
				".el-button": {
					"background-color": "var(--el-button-bg-color,val(--el-color-white))"
				}
			});
		}
	],
	corePlugins: {
		preflight: false
	}
};
