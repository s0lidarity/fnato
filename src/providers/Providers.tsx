import { LocationProvider } from 'preact-iso';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';

import { SkillsProvider } from './SkillsContext';
import { StatsProvider } from './StatisticsContext';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LocationProvider>
            <ThemeProvider theme={tokyoDark}>
                <StatsProvider>
                    <SkillsProvider>
                        {children}
                    </SkillsProvider>
                </StatsProvider>
            </ThemeProvider>
        </LocationProvider>
    );
}

export default Providers;