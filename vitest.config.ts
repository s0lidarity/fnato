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
		testTimeout: 10000, // 10 second timeout for tests
		hookTimeout: 10000,
		teardownTimeout: 10000,
		pool: 'forks',
		poolOptions: {
			forks: {
				singleFork: true,
			},
		},
		isolate: false,
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
		],
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