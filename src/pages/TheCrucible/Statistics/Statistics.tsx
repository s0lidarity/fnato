
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';

import { Statistics as StatisticsType } from '../../../types/characterTypes';
import DerivedAttributes from './components/DerivedAttributes/DerivedAttributes';
import { useStats } from '../../../providers/StatisticsContext';
import ConfigurationBar from './components/ConfigurationBar/ConfigurationBar';
import { ConfigOptions } from './types';
import DiceStats from './components/StatsDisplays/DiceStats';
import ManualInputStats from './components/StatsDisplays/ManualInputStats';
import RAReminder from './components/RAReminder/RAReminder';
import StatDescriptors from './components/StatDescriptors/StatDescriptors';

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
    justify-content: flex-start;
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

// need to refactor this onChange, need to block raising values if points <=0
const onChange = (statKey: keyof StatisticsType, stats: StatisticsType, setStats: (stats: StatisticsType) => void) => (value: number) => {
    const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
    setStats({ ...stats, [statKey]: updatedStat });
};

function Statistics() {
    const { resetStats, setStats, stats } = useStats();
    const [config, setConfig] = useState(ConfigOptions.ManualInput);
    
    const renderStatInputs = () => {
        switch(config){
            case ConfigOptions.Dice:
                return <DiceStats />;
            case ConfigOptions.PointBuy:
            case ConfigOptions.ManualInput:
                return <ManualInputStats config={config} />;
            default:
                return null;
        }
    };

    // the Counter from React95 bugs out if the value goes below 0, this prevents that from happening
    useEffect(() => {
        resetStats();
    }, [config]);

    return (
        <>
            <form>
                <ConfigurationBar config={config} setConfig={setConfig} />
                <StyledGuidanceContainer>
                    { config !== ConfigOptions.Dice && (<RAReminder />) }
                </StyledGuidanceContainer>
                <StatsContainer>
                    <StatInputContainer>
                        <StyledHeading>Base Statistics</StyledHeading>
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