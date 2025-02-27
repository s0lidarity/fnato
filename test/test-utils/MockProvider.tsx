import { ComponentChildren } from 'preact';
import { ThemeProvider } from 'styled-components';
import { LocationProvider } from 'preact-iso';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react';

// Mock theme directly in the file
const mockTheme = {
    name: 'tokyoDark',
    canvas: '#222222',
    material: '#333333',
    primaryText: '#ffffff',
  // Add other properties as needed
};

interface MockProviderProps {
    children: ComponentChildren;
}

function MockProvider ({ children }: MockProviderProps) {
    return (
        <div>
            <ThemeProvider theme={mockTheme}>
                <LocationProvider>
                    <I18nProvider i18n={i18n}>
                        {children}
                    </I18nProvider>
                </LocationProvider>
            </ThemeProvider>
        </div>
    );
};

export default MockProvider;
