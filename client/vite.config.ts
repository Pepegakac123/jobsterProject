/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import type { UserConfig } from "vite";

interface ConfigType extends UserConfig {
	test?: {
		globals?: boolean;
		environment?: string;
		setupFiles?: string | string[];
		css?: boolean;
		coverage?: {
			provider: string;
			reporter: string[];
		};
	};
}

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api/v1": {
				// Zmień z /api na /api/v1
				target: "http://localhost:8000",
				changeOrigin: true,
			},
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
		css: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
} as ConfigType);
