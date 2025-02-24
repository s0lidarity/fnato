import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/preact'
import '@testing-library/jest-dom/vitest'
import { i18n } from '@lingui/core';

// Initialize i18n for tests
i18n.load('en', {});
i18n.activate('en');

afterEach(() => cleanup())