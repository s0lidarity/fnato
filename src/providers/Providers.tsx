import { LocationProvider } from 'preact-iso';
import { createContext } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';
import type { ComponentChildren } from 'preact';
import { I18nProvider } from '@lingui/react';
import { i18n } from "@lingui/core";

import { SkillsProvider } from './SkillsContext';
import { StatsProvider } from './StatisticsContext';
import { BondsProvider } from './BondsContext';
import { PersonalDetailsProvider } from './PersonalDetailsContext';
import GlobalStyles from '../GlobalStyles';
import StyledComponentsProvider from './StyledComponentsProvider';


export async function dynamicActivate(locale: string) {
    try {
        // Import both messages and locale data with correct path
        const [{ messages }] = await Promise.all([
            import(`../locales/${locale}/messages.po`),
        ]);
        
        // Load the messages
        i18n.load(locale, messages);
        
        // Activate the locale
        i18n.activate(locale);
        
    } catch (error) {
        console.error(`Failed to load locale '${locale}':`, error);
        if (locale !== 'en') {
            await dynamicActivate('en');
        }
    }
}

type Theme = typeof tokyoDark;

// AJS let's add more fonts? starting point
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    fontFamily: 'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval';
    setFontFamily: (font: 'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval') => void;
}

// Update the context with proper typing
export const ThemeContext = createContext<ThemeContextType>({
    theme: tokyoDark,
    setTheme: () => {},
    fontFamily: 'ms_sans_serif',
    setFontFamily: () => {},
});

function Providers({ children }: { children: ComponentChildren }) {
    const [theme, setTheme] = useState(tokyoDark);
    const [fontFamily, setFontFamily] = useState<'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval'>('ms_sans_serif');
    
    // Add effect to initialize i18n
    useEffect(() => {
        // Get user's preferred language, fallback to 'en'
        const userLocale = navigator.language.split('-')[0] || 'en';
        dynamicActivate(userLocale);
    }, []);
    
    return (
        <LocationProvider>
            <I18nProvider i18n={i18n}>
                <ThemeContext.Provider value={{ theme, setTheme, fontFamily, setFontFamily }}>
                    <StyledComponentsProvider>
                        <ThemeProvider theme={theme}>
                            <GlobalStyles fontFamily={fontFamily} />
                            <StatsProvider>
                                <SkillsProvider>
                                    <BondsProvider>
                                        <PersonalDetailsProvider>
                                            {children}
                                        </PersonalDetailsProvider>
                                    </BondsProvider>
                                </SkillsProvider>
                            </StatsProvider>
                        </ThemeProvider>
                    </StyledComponentsProvider>
                </ThemeContext.Provider>
            </I18nProvider>
        </LocationProvider>
    );
}

// Add custom hook for easier usage
export const useTheme = () => useContext(ThemeContext);

export default Providers;