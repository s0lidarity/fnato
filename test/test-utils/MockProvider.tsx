import { ComponentChildren } from 'preact';
import { ThemeProvider } from 'styled-components';
import { LocationProvider } from 'preact-iso';
import { i18n } from '@lingui/core'
import tokyoDark from 'react95/dist/themes/tokyoDark';
import { I18nProvider } from '@lingui/react';

interface MockProviderProps {
    children: ComponentChildren;
}

function MockProvider ({ children }: MockProviderProps) {
    return (
        <div>
            <ThemeProvider theme={tokyoDark}>
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
