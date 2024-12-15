import { LocationProvider } from 'preact-iso';
import { ThemeProvider } from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';

import { SkillsProvider } from './SkillsContext';
import { StatsProvider } from './StatisticsContext';
import { BondsProvider } from './BondsContext';
import { PersonalDetailsProvider } from './PersonalDetailsContext';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LocationProvider>
            <ThemeProvider theme={tokyoDark}>
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
        </LocationProvider>
    );
}

export default Providers;