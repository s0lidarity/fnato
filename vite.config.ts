import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { readFileSync } from 'fs';
import { lingui } from '@lingui/vite-plugin';
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact({
		babel: {
			plugins: ['@lingui/babel-plugin-lingui-macro'],
		},
		}),
		lingui(),
	],
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test.setup.ts',
	},
});
