import { useStats } from "../../../providers/StatisticsContext";

import { rollDice, generateStat } from "../../../utils/CharacterGenerator";
import { Statistics } from "../../../types/characterTypes";
import { PiDiceOne, PiDiceTwo, PiDiceThree, PiDiceFour, PiDiceFive, PiDiceSix } from "react-icons/pi";

export function rollStats(stats: Statistics): Statistics {
    const updatedStats = { ...stats };

    for (const stat in updatedStats) {
        if (updatedStats.hasOwnProperty(stat)) {
            updatedStats[stat as keyof Statistics] = generateStat(stat as keyof Statistics, rollDice(6, 4, 1));
        }
    }

    return updatedStats;
}

export function DiceStats() {
    const { stats, setStats } = useStats();

    return (
        <div>
            
        </div>
    )
}