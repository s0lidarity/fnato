import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { readFileSync } from 'fs';
import { lingui } from '@lingui/vite-plugin';
import { UserConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true, // Source map generation must be turned on
	},
	plugins: [
		preact({
			babel: {
				plugins: ['@lingui/babel-plugin-lingui-macro'],
			},
		}),
		lingui(),
		sentryVitePlugin({
			authToken: process.env.SENTRY_AUTH_TOKEN,
			org: "sobiesapps",
			project: "javascript-react",
		}),
	],
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test.setup.ts',
	},
}) as UserConfig;