import { defineConfig } from '@lingui/cli';

export default defineConfig({
    sourceLocale: 'en',
    locales: ['en', 'fr', 'de', 'yue', 'cmn-Hans'],
    catalogs: [
        {
        path: 'src/locales/{locale}/messages',
        include: ['src'],
        },
    ],
});