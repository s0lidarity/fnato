import { createContext } from 'preact';
import { useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import GlobalStyles from '../GlobalStyles';

interface ThemeContextType {
    fontFamily: 'ms_sans_serif' | 'system' | 'arial';
    setFontFamily: (font: 'ms_sans_serif' | 'system' | 'arial') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    fontFamily: 'ms_sans_serif',
    setFontFamily: () => {},
});

export const ThemeProvider = ({ children }: { children: ComponentChildren }) => {
    const [fontFamily, setFontFamily] = useState<'ms_sans_serif' | 'system' | 'arial'>('ms_sans_serif');

    return (
        <ThemeContext.Provider value={{
            fontFamily,
            setFontFamily,
        }}>
        <GlobalStyles fontFamily={fontFamily} />
            {children}
        </ThemeContext.Provider>
    );
};
