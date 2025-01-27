import { defineConfig } from '@lingui/cli';

export default defineConfig({
    sourceLocale: 'en',
    locales: ['en', 'fr', 'de'],
    catalogs: [
        {
        path: 'src/locales/{locale}/messages',
        include: ['src'],
        },
    ],
});