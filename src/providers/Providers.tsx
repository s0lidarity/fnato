import { LocationProvider } from 'preact-iso';
import { createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';
import type { ComponentChildren } from 'preact';

import { SkillsProvider } from './SkillsContext';
import { StatsProvider } from './StatisticsContext';
import { BondsProvider } from './BondsContext';
import { PersonalDetailsProvider } from './PersonalDetailsContext';
import GlobalStyles from '../GlobalStyles';

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
    
    return (
        <LocationProvider>
            <ThemeContext.Provider value={{ theme, setTheme, fontFamily, setFontFamily }}>
                <ThemeProvider theme={theme}>
                    <StatsProvider>
                        <SkillsProvider>
                            <BondsProvider>
                                <PersonalDetailsProvider>
                                    <GlobalStyles fontFamily={fontFamily} />
                                    {children}
                                </PersonalDetailsProvider>
                            </BondsProvider>
                        </SkillsProvider>
                    </StatsProvider>
                </ThemeProvider>
            </ThemeContext.Provider>
        </LocationProvider>
    );
}

// Add custom hook for easier usage
export const useTheme = () => useContext(ThemeContext);

export default Providers;