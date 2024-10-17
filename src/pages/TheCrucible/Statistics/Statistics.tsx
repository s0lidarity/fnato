import h from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Button, Counter } from 'react95';
import styled from 'styled-components';

import { Stat, Statistics } from '../../../types/characterTypes';
import StatInput from './components/StatInput/StatInput';
import { generateStat, RECOMMENDED_ARRAYS, rollDice } from '../../../utils/CharacterGenerator';
import DerivedAttributes from './components/DerivedAttributes/DerivedAttributes';
import { useStats } from '../../../providers/StatisticsContext';
import ConfigurationBar from './components/ConfigurationBar/ConfigurationBar';
import { ConfigOptions } from './types';
import DiceStats from './components/StatsDisplays/DiceStats';
import ManualInputStats from './components/StatsDisplays/ManualInputStats';

const StatsAndDAContainer = styled.div`
    display: flex;
    align-itmems: stretch;
`;

const StatInputContainer = styled.div`
    flex: 1;
    padding: 1rem;
`;

const DAContainer = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    height: 80%;
    justify-content: center;
`;

const DEFAULT_POINTS = 72;

// need to refactor this onChange, need to block raising values if points <=0
const onChange = (statKey: keyof Statistics, stats: Statistics, setStats: (stats: Statistics) => void) => (value: number) => {
    const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
    setStats({ ...stats, [statKey]: updatedStat });
};

export function Statisics() {
    const { resetStats, setStats, stats } = useStats();
    const [config, setConfig] = useState(ConfigOptions.ManualInput);
    const [points, setPoints] = useState(DEFAULT_POINTS-(6*10));

    const calculateRemainingPoints = (stats: Statistics) => {
        let total = 0;
        for (const stat in stats) {
            if (stats.hasOwnProperty(stat)) {
                total += stats[stat as keyof Statistics].score;
            }
        }
        return (DEFAULT_POINTS - total);
    };

    // the Counter from React95 bugs out if the value goes below 0, this prevents that from happening
    useEffect(() => {
        if (config === ConfigOptions.PointBuy) {
            resetStats();
        }
    }, [config]);

    useEffect(() => {
        setPoints(calculateRemainingPoints(stats));
    }, [stats]);

    // ajs, use config to pick a type of statInput
    // split the numeric stat input into a separate component
    // split dice roller into a separate component
    // point buy and manual input can be the same component
    // recommended array will use a select to pick values from an array, radio to choose the pre-set array
    // need to be able to swap the stat components based on config
    return (
        <>
            <form>
                <ConfigurationBar config={config} setConfig={setConfig} />
                <StatsAndDAContainer>
                    <StatInputContainer>
                        {config === ConfigOptions.ManualInput && <ManualInputStats />}
                        {config === ConfigOptions.Dice && <DiceStats />}
                    </StatInputContainer>
                    <DAContainer>
                        <DerivedAttributes />
                    </DAContainer>
                </StatsAndDAContainer>
                {config === ConfigOptions.PointBuy && <div><label>Points Remaining</label><Counter minLength={2} value={points} /></div>}
                <Button fullWidth onClick={() => resetStats()}>
                    Reset Stats
                </Button>
            </form>
        </>
    )
};

export default Statisics;