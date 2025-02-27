/// <reference types="vitest" />
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(
		{
			babel: {
				plugins: ['macros', '@lingui/babel-plugin-lingui-macro'],
			},
		}
	)],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test/setup.ts',
		deps: {
			optimizer: {
				web: {
					enabled: true,
					include: ['styled-components', 'react95'],
				},
			},
		},
	},
	resolve: {
		alias: {
			'styled-components': path.resolve(__dirname, 'src/__mocks__/styled-components.ts'),
			'react95': path.resolve(__dirname, 'src/__mocks__/react95.js')
		}
	}
});