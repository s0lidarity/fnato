import { useState } from 'preact/hooks';
import { PiDiceOne, PiDiceTwo, PiDiceThree, PiDiceFour, PiDiceFive, PiDiceSix } from 'react-icons/pi';
import { Button } from "react95";

import { useStats } from '../../../../../providers/StatisticsContext';
import { rollDice, generateStat } from '../../../../../utils/CharacterGenerator';
import { Statistics } from '../../../../../types/characterTypes';
import { RollResult } from '../../../../../types/diceTypes';
import { rollStats } from '../../Statistics';

function DiceStats() {
    const { resetStats, stats, setStats } = useStats();
    const [rollSets, setRollSets] = useState<Record<keyof Statistics, number[]>>({
        strength: [],
        constitution: [],
        dexterity: [],
        intelligence: [],
        power: [],
        charisma: []
    });

    function rollStats(stats: Statistics): { updatedStats: Statistics, newRollSets: Record<keyof Statistics, number[]> } {
        const updatedStats = { ...stats };
        const newRollSets: Record<keyof Statistics, number[]> = {
            strength: [],
            constitution: [],
            dexterity: [],
            intelligence: [],
            power: [],
            charisma: []
        };
    
        for (const stat in updatedStats) {
            if (updatedStats.hasOwnProperty(stat)) {
                const {result, rolls} = rollDice(6, 4, 1);
                updatedStats[stat as keyof Statistics] = generateStat(stat as keyof Statistics, result);
                newRollSets[stat as keyof Statistics] = rolls;
            }
        }
    
        return { updatedStats, newRollSets };
    }

    const renderDice = (rolls: number[]) => {
        const diceIconMap = {
            1: PiDiceOne,
            2: PiDiceTwo,
            3: PiDiceThree,
            4: PiDiceFour,
            5: PiDiceFive,
            6: PiDiceSix,
        };

        return rolls.map((roll, index) => {
            const DiceIcon = diceIconMap[roll];
            return <DiceIcon key={index} />;
        });
    }
    
    const renderStats = () => {
        return Object.keys(stats).map((stat) => {
            const typedStat = stat as keyof Statistics;
            return (
                <div key={stat}>
                    <span>{stat.charAt(0).toUpperCase() + stat.slice(1)}</span>
                    <span>{stats[stat as keyof Statistics].score}</span>
                    {rollSets[typedStat] && renderDice(rollSets[typedStat])}
                </div>
            )
        })
    };
    
    const handleRoll = () => {
        const { updatedStats, newRollSets } = rollStats(stats);
        setStats(updatedStats);
        setRollSets(newRollSets);
    }

    const handleReset = () => {
        resetStats();
        setRollSets({
            strength: [],
            constitution: [],
            dexterity: [],
            intelligence: [],
            power: [],
            charisma: []
        });
    }

    return (
        <div>
            {renderStats()}
            <Button onClick={handleRoll}>Roll 4d6, drop lowest Result</Button>
            <Button onClick={handleReset}>Reset Stats</Button>
        </div>
    )
}

export default DiceStats;