import { defineConfig } from '@lingui/cli';

export default defineConfig({
    sourceLocale: 'en',
    locales: ['en', 'hi'],
    catalogs: [
        {
        path: 'src/locales/{locale}/messages',
        include: ['src'],
        },
    ],
});