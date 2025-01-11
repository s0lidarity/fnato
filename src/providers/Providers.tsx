import { LocationProvider } from 'preact-iso';
import { createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';

import { SkillsProvider } from './SkillsContext';
import { StatsProvider } from './StatisticsContext';
import { BondsProvider } from './BondsContext';
import { PersonalDetailsProvider } from './PersonalDetailsContext';

// Define the theme type (you might want to import this from styled-components)
type Theme = typeof tokyoDark;

// Define the context type
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// Update the context with proper typing
export const ThemeContext = createContext<ThemeContextType>({
    theme: tokyoDark,
    setTheme: () => {},
});

function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(tokyoDark);
    
    return (
        <LocationProvider>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <ThemeProvider theme={theme}>
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
            </ThemeContext.Provider>
        </LocationProvider>
    );
}

// Add custom hook for easier usage
export const useTheme = () => useContext(ThemeContext);

export default Providers;