import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import eslintPlugin from "vite-plugin-eslint";
import { wrapperEnv } from "./src/utils/getEnv";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		base: "/",
		plugins: [
			react(),
			babel({
				babelConfig: {
					compact: true,
					babelrc: false,
					configFile: false,
					plugins: [["@babel/plugin-proposal-decorators", { loose: true, version: "2022-03" }]]
				}
			}),

			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOBAL_APP_TITLE
					}
				}
			}),

			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),

			// * 是否生成包预览
			// @ts-expect-error
			viteEnv.VITE_REPORT && visualizer(),

			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				})
		],
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			proxy: {
				// 选项写法
				"/api": {
					target: "http://mock.erhang.fun/mock/649982d61d5a0a36692f05dc",
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, "")
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
		},
		build: {
			outDir: "dist",
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			// minify: "esbuild",
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: viteEnv.VITE_DROP_CONSOLE,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
