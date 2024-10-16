import { useStats } from '../../../../../providers/StatisticsContext';
import { PiDiceOne, PiDiceTwo, PiDiceThree, PiDiceFour, PiDiceFive, PiDiceSix } from 'react-icons/pi';
import { Button } from "react95";

import { rollDice, generateStat } from '../../../../../utils/CharacterGenerator';
import { Statistics } from '../../../../../types/characterTypes';


export function rollStats(stats: Statistics): Statistics {
    const updatedStats = { ...stats };

    for (const stat in updatedStats) {
        if (updatedStats.hasOwnProperty(stat)) {
            updatedStats[stat as keyof Statistics] = generateStat(stat as keyof Statistics, rollDice(6, 4, 1));
        }
    }

    return updatedStats;
}

function DiceStats() {
    const { stats, setStats } = useStats();

    const renderStats = () => {
        return Object.keys(stats).map((stat) => {
            return (
                <div key={stat}>
                    <span>{stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
                    <span>{stats[stat as keyof Statistics].score}</span>
                </div>
            )
        })
    };
    
    const handleRoll = () => {
        const results = rollStats(stats);
        setStats(results);
    }

    return (
        <div>
            {renderStats()}
            <Button onClick={handleRoll}>Roll 4d6, drop lowest Result</Button>
        </div>
    )
}

export default DiceStats;