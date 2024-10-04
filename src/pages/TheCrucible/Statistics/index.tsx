import h from 'preact';
import { useState } from 'preact/hooks';
import { NumberInput } from 'react95';

import { Stat, Statistics } from '../../../types/characterTypes';
import StatInput from './StatInput';

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

const onChange = (statKey: keyof Statistics, stats: Statistics, setStats: (stats: Statistics) => void) => (value: number) => {
    const updatedStat = { ...stats[statKey], score: value, x5: value * 5 };
    setStats({ ...stats, [statKey]: updatedStat });
};

export function Statisics() {
    // AJS switch these to the provider/context
    const [stats, setStats] = useState<Statistics>(defaultStats);

    return (
        <>
            <form>
                <StatInput label="Strength" value={stats.strength.score} onChange={onChange('strength', stats, setStats)} />
                <StatInput label="Constitution" value={stats.constitution.score} onChange={onChange('constitution', stats, setStats)} />
                <StatInput label="Dexterity" value={stats.dexterity.score} onChange={onChange('dexterity', stats, setStats)} />
                <StatInput label="Intelligence" value={stats.intelligence.score} onChange={onChange('intelligence', stats, setStats)} />
                <StatInput label="Power" value={stats.power.score} onChange={onChange('power', stats, setStats)} />
                <StatInput label="Charisma" value={stats.charisma.score} onChange={onChange('charisma', stats, setStats)} />
            </form>
            <div>
                <p>STR: {stats.strength.score}</p>
                <p>CON: {stats.constitution.score}</p>
                <p>DEX: {stats.dexterity.score}</p>
                <p>INT: {stats.intelligence.score}</p>
                <p>POW: {stats.power.score}</p>
                <p>CHA: {stats.charisma.score}</p>
            </div>
        </>
    )
};

export default Statisics;