import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import eslintPlugin from "vite-plugin-eslint";
import { wrapperEnv } from "./src/utils/getEnv";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(mode => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		plugins: [
			react(),

			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOBAL_APP_TITLE
					}
				}
			}),

			eslintPlugin(),

			viteEnv.VITE_REPORT && visualizer(),

			viteEnv.VITE_BUILD_ZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				})
		],
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			proxy: {
				// 字符串简写写法
				"/foo": "http://localhost:4567",
				// 选项写法
				"/api": {
					target: "http://jsonplaceholder.typicode.com",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				},
				// 正则表达式写法
				"^/fallback/.*": {
					target: "http://jsonplaceholder.typicode.com",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/fallback/, "")
				}
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			}
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src")
			}
		}
	};
});
