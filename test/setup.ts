import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/preact'
import '@testing-library/jest-dom/vitest'

// Mock the theme
vi.mock('react95/dist/themes/tokyoDark', () => {
    return {
        default: {
        name: 'tokyoDark',
        canvas: '#222222',
        material: '#333333',
        primaryText: '#ffffff',
        // Add other theme properties as needed
        }
    };
});

// Mock i18n functionality
vi.mock('@lingui/core', () => ({
    i18n: {
        load: vi.fn(),
        activate: vi.fn(),
    }
}));

// Mock the dynamic activate function
vi.mock('../src/providers/Providers', async () => {
    return {
        dynamicActivate: async (locale: string) => {
            console.log(`Mock activating locale: ${locale}`);
            return Promise.resolve();
        }
    };
});

// Now import and call the mocked function
import { dynamicActivate } from '../src/providers/Providers'
dynamicActivate('en');

afterEach(() => cleanup());