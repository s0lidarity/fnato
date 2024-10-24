
import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';

import { Statistics as StatisticsType } from '../../../types/characterTypes';
import DerivedAttributes from './components/DerivedAttributes/DerivedAttributes';
import { useStats } from '../../../providers/StatisticsContext';
import { ConfigOptions } from './types';
import DiceStats from './components/StatsDisplays/DiceStats';
import ManualInputStats from './components/StatsDisplays/ManualInputStats';
import RAReminder from './components/RAReminder/RAReminder';
import StatDescriptors from './components/StatDescriptors/StatDescriptors';
import ConfigurationBar from '../../../components/ConfigurationBar/ConfigurationBar';
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


function Statistics() {
    const { resetStats, setStats, stats } = useStats();
    const [config, setConfig] = useState(StatsConfigOptions.ManualInput);
    
    const configOptions = [
        { label: 'Manual Input', value: 'ManualInput' },
        { label: 'Point Buy', value: 'PointBuy' },
        { label: 'Dice', value: 'Dice' },
    ];

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

    // the Counter from React95 bugs out if the value goes below 0, this prevents that from happening
    useEffect(() => {
        resetStats();
    }, [config]);

    return (
        <>
            <form>
                <ConfigurationBar 
                    config={config} 
                    setConfig={(config: StatsConfigOptions) => setConfig(config)}
                    options={configOptions}
                    />
                <StyledGuidanceContainer>
                    { config !== StatsConfigOptions.Dice && (<RAReminder />) }
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