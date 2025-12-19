import { LocationProvider } from 'preact-iso';
import { createContext } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';
import { ThemeProvider } from 'styled-components';

// AJS TODO: fix this hack of setting a local TokyoDark theme from react95
const tokyoDark = {
    name: 'tokyoDark',
    anchor: '#1034a6',
    anchorVisited: '#440381',
    borderDark: '#1f2223',
    borderDarkest: '#070809',
    borderLight: '#5e696a',
    borderLightest: '#93a0a1',
    canvas: '#2f3435',
    canvasText: '#F4F4ED',
    canvasTextDisabled: '#1f2223',
    canvasTextDisabledShadow: '#93a0a1',
    canvasTextInvert: '#ffffff',
    checkmark: '#F4F4ED',
    checkmarkDisabled: '#1f2223',
    desktopBackground: '#181a1b',
    flatDark: '#9e9e9e',
    flatLight: '#d8d8d8',
    focusSecondary: '#20FC8F',
    headerBackground: '#1f2223',
    headerNotActiveBackground: '#5e696a',
    headerNotActiveText: '#F4F4ED',
    headerText: '#F4F4ED',
    hoverBackground: '#1f2223',
    material: '#3a3f41',
    materialDark: '#1f2223',
    materialText: '#F4F4ED',
    materialTextDisabled: '#5e696a',
    materialTextDisabledShadow: '#93a0a1',
    materialTextInvert: '#2f3435',
    progress: '#20FC8F',
    tooltip: '#F4F4ED'
};
import type { ComponentChildren } from 'preact';
import { I18nProvider } from '@lingui/react';
import { i18n } from "@lingui/core";import { SkillsProvider } from './SkillsContext';
import { StatsProvider } from './StatisticsContext';
import { BondsProvider } from './BondsContext';
import { PersonalDetailsProvider } from './PersonalDetailsContext';
import { DamagedVeteranProvider } from './DamagedVeteranContext';
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
    fontFamily: 'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval' | 'OpenDyslexic';
    setFontFamily: (font: 'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval' | 'OpenDyslexic') => void;
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
    const [fontFamily, setFontFamily] = useState<'ms_sans_serif' | 'system' | 'arial' | 'defonte' | 'upheaval' | 'OpenDyslexic'>('ms_sans_serif');
    
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
                                            <DamagedVeteranProvider>
                                                {children}
                                            </DamagedVeteranProvider>
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