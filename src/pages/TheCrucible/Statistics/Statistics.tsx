import h from 'preact';
import { useState } from 'preact/hooks';
import { Button } from 'react95';
import styled from 'styled-components';

import { Stat, Statistics } from '../../../types/characterTypes';
import StatInput from './StatInput';
import { generateStat, rollDice } from '../../../utils/CharacterGenerator';
import DerivedAttributes from './DerivedAttributes';
import { useCharacter } from '../../../providers/CharacterContext';

// AJS this file is too big, split it up
const defaultStat: Stat = {
    score: 10,
    x5: 50,
    distinguishingFeature: ''
};

const defaultStats: Statistics = {
    strength: defaultStat,
    dexterity: defaultStat,
    constitution: defaultStat,
    intelligence: defaultStat,
    power: defaultStat,
    charisma: defaultStat,
};

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

const onChange = (statKey: keyof Statistics, stats: Statistics, setStats: (stats: Statistics) => void) => (value: number) => {
    const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
    setStats({ ...stats, [statKey]: updatedStat });
};

export function Statisics() {
    // AJS switch these to the provider/context
    const { character, setStats} = useCharacter();


    const handleRoll = () => {
        const results = rollStats(character.statistics);
        setStats(results);
    };

    return (
        <>
            <form>
                <StatsAndDAContainer>
                    <StatInputContainer>
                        <StatInput label="Strength" value={character.statistics.strength.score} onChange={onChange('strength', character.statistics, setStats)} />
                        <StatInput label="Constitution" value={character.statistics.constitution.score} onChange={onChange('constitution', character.statistics, setStats)} />
                        <StatInput label="Dexterity" value={character.statistics.dexterity.score} onChange={onChange('dexterity', character.statistics, setStats)} />
                        <StatInput label="Intelligence" value={character.statistics.intelligence.score} onChange={onChange('intelligence', character.statistics, setStats)} />
                        <StatInput label="Power" value={character.statistics.power.score} onChange={onChange('power', character.statistics, setStats)} />
                        <StatInput label="Charisma" value={character.statistics.charisma.score} onChange={onChange('charisma', character.statistics, setStats)} />
                    </StatInputContainer>
                    <DAContainer>
                        <DerivedAttributes />
                    </DAContainer>
                </StatsAndDAContainer>
                <Button fullWidth onClick={handleRoll}>
                    Roll 4d6 drop lowest
                </Button>
                <Button fullWidth onClick={() => setStats(defaultStats)}>
                    Reset Stats
                </Button>
            </form>
            <div>
                <p>STR: {character.statistics.strength.score}</p>
                <p>CON: {character.statistics.constitution.score}</p>
                <p>DEX: {character.statistics.dexterity.score}</p>
                <p>INT: {character.statistics.intelligence.score}</p>
                <p>POW: {character.statistics.power.score}</p>
                <p>CHA: {character.statistics.charisma.score}</p>
            </div>
        </>
    )
};

export default Statisics;