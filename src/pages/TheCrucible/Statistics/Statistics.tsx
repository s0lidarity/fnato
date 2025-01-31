import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import styled from 'styled-components';

import DerivedAttributes from './components/DerivedAttributes/DerivedAttributes';
import { useStats } from '../../../providers/StatisticsContext';
import DiceStats from './components/StatsDisplays/DiceStats';
import ManualInputStats from './components/StatsDisplays/ManualInputStats';
import RAReminder from './components/RAReminder/RAReminder';
import StatDescriptors from './components/StatDescriptors/StatDescriptors';
import ConfigurationBar from "./components/ConfigurationBar/ConfigurationBar";
import { StatsConfigOptions } from '../../../types/componentTypes';

const StatsContainer = styled.div`
    display: flex;
    align-itmems: stretch;
`;

const StatInputContainer = styled.div`
    flex: 1;
`;

const DAContainer = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const StyledGuidanceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 1rem;
`;

const StyledHeading = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
`;

function Statistics() {
    const { config, resetStats, setConfig } = useStats();

    const renderStatInputs = () => {
        switch(config){
            case StatsConfigOptions.Dice:
                return <DiceStats />;
            case StatsConfigOptions.PointBuy:
            case StatsConfigOptions.ManualInput:
                return <ManualInputStats config={config} />;
            default:
                return null;
        }
    };

    const handleConfigChange = (config: StatsConfigOptions) => {
        setConfig(config);
        resetStats();
    };

    return (
        <>
            <form>
                <ConfigurationBar 
                    config={config} 
                    setConfig={handleConfigChange}
                    />
                <StyledGuidanceContainer>
                    { config !== StatsConfigOptions.Dice && (<RAReminder />) }
                </StyledGuidanceContainer>
                <StatsContainer>
                    <StatInputContainer>
                        <StyledHeading><Trans>Base Statistics</Trans></StyledHeading>
                        {renderStatInputs()}
                    </StatInputContainer>
                    <StatDescriptors />
                </StatsContainer>
                <DAContainer>
                        <DerivedAttributes />
                </DAContainer>
            </form>
        </>
    )
};

export default Statistics;