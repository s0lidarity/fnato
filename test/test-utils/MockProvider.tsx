import { h, ComponentChildren } from 'preact';
import { ThemeProvider } from 'styled-components';
import { LocationProvider } from 'preact-iso';
import tokyoDark from 'react95/dist/themes/tokyoDark';

interface MockProviderProps {
    children: ComponentChildren;
}

function MockProvider ({ children }: MockProviderProps) {
    return (
        <div>
            <ThemeProvider theme={tokyoDark}>
                <LocationProvider>
                    {children}
                </LocationProvider>
            </ThemeProvider>
        </div>
    );
};

export default MockProvider;
