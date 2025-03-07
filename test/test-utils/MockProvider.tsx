import { ComponentChildren } from 'preact';
import { ThemeProvider } from 'styled-components';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react';

// Mock theme directly in the file
const mockTheme = {
    name: 'tokyoDark',
    canvas: '#222222',
    material: '#333333',
    primaryText: '#ffffff',
    hoverBackground: '#444444',
    focusSecondary: '#555555',
    progress: '#ffffff',
    border: '1px solid #666666',
    shadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    // Add other properties as needed
};

interface MockProviderProps {
    children: ComponentChildren;
}

function MockProvider ({ children }: MockProviderProps) {
    return (
        <div>
            <ThemeProvider theme={mockTheme}>
                <I18nProvider i18n={i18n}>
                    {children}
                </I18nProvider>
            </ThemeProvider>
        </div>
    );
};

export default MockProvider;
