import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/preact'
import '@testing-library/jest-dom/vitest'
import { dynamicActivate } from '../src/providers/Providers'

// Initialize i18n for tests
dynamicActivate('en')

afterEach(() => cleanup())