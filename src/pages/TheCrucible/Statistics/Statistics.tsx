import h from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Button, Counter } from 'react95';
import styled from 'styled-components';

import { Stat, Statistics } from '../../../types/characterTypes';
import StatInput from './StatInput';
import { generateStat, RECOMMENDED_ARRAYS, rollDice } from '../../../utils/CharacterGenerator';
import DerivedAttributes from './DerivedAttributes';
import { useStats } from '../../../providers/StatisticsContext';
import ConfigurationBar from './ConfigurationBar';
import { ConfigOptions } from './types';

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

export function rollStats(stats: Statistics): Statistics {
    const updatedStats = { ...stats };

    for (const stat in updatedStats) {
        if (updatedStats.hasOwnProperty(stat)) {
            updatedStats[stat as keyof Statistics] = generateStat(stat as keyof Statistics, rollDice(6, 4, 1));
        }
    }

    return updatedStats;
}

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

    const handleRoll = () => {
        const results = rollStats(stats);
        setStats(results);
    };

    // ajs, use config to pick a type of statInput
    // split the numeric stat input into a separate component
    // split dice roller into a separate component
    // point buy and manual input can be the same component
    // recommended array will use a select to pick values from an array, radio to choose the pre-set array
    return (
        <>
            <form>
                <ConfigurationBar config={config} setConfig={setConfig} />
                <StatsAndDAContainer>
                    <StatInputContainer>
                        <StatInput label="Strength" value={stats.strength.score} onChange={onChange('strength', stats, setStats)} />
                        <StatInput label="Constitution" value={stats.constitution.score} onChange={onChange('constitution', stats, setStats)} />
                        <StatInput label="Dexterity" value={stats.dexterity.score} onChange={onChange('dexterity', stats, setStats)} />
                        <StatInput label="Intelligence" value={stats.intelligence.score} onChange={onChange('intelligence', stats, setStats)} />
                        <StatInput label="Power" value={stats.power.score} onChange={onChange('power', stats, setStats)} />
                        <StatInput label="Charisma" value={stats.charisma.score} onChange={onChange('charisma', stats, setStats)} />
                    </StatInputContainer>
                    <DAContainer>
                        <DerivedAttributes />
                    </DAContainer>
                </StatsAndDAContainer>
                {config === ConfigOptions.Dice && <Button fullWidth onClick={handleRoll}>
                    Roll 4d6 drop lowest
                </Button>}
                {config === ConfigOptions.PointBuy && <div><label>Points Remaining</label><Counter minLength={2} value={points} /></div>}
                <Button fullWidth onClick={() => resetStats()}>
                    Reset Stats
                </Button>
            </form>
        </>
    )
};

export default Statisics;