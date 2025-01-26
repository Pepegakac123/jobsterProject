/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
// import type { UserConfig } from "vite";

// interface ConfigType extends UserConfig {
// 	test?: {
// 		globals?: boolean;
// 		environment?: string;
// 		setupFiles?: string | string[];
// 		css?: boolean;
// 		coverage?: {
// 			provider: string;
// 			reporter: string[];
// 		};
// 	};
// }

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			proxy: {
				"/api/v1": {
					target: env.VITE_API_URL || "http://localhost:8000",
					changeOrigin: true,
				},
			},
		},
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./src/test/setup.ts",
			coverage: {
				provider: "v8",
				reporter: ["text", "json", "html"],
			},
		},
	};
});
