import { useState } from 'preact/hooks';
import { PiDiceOne, PiDiceTwo, PiDiceThree, PiDiceFour, PiDiceFive, PiDiceSix } from 'react-icons/pi';
import { Button } from "react95";
import styled from 'styled-components';

import { useStats } from '../../../../../providers/StatisticsContext';
import { rollDice, generateStat } from '../../../../../utils/CharacterGenerator';
import { Statistics } from '../../../../../types/characterTypes';
import { RollResult } from '../../../../../types/diceTypes';
import StatTooltip from '../StatTooltip/StatTooltip';
import StatInputContainer from '../../styles/StatInputContainer';

const StatLabelValueContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25rem;
    justify-content: space-between;
`;

const StatLabel = styled.div`
    width: 4rem;
    display: flex;
    align-items: center;
`;

const StatValue = styled.span`
    margin-left: 0.5rem;
    text-align: right;
    min-width: 4rem;
`;

const DiceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem;
    font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

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
            return <DiceIcon key={index} title={roll} />;
        });
    }
    
    const renderStats = () => {
        return Object.keys(stats).map((stat) => {
            const typedStat = stat as keyof Statistics;

            return (
                <StatInputContainer key={stat}>
                    <StatLabelValueContainer>
                        <StatLabel>
                            <StatTooltip 
                                statKey={stat} 
                                labelText={stat.charAt(0).toUpperCase() + stat.slice(1)} />
                        </StatLabel>
                        <StatValue>
                            {stats[stat as keyof Statistics].score}
                        </StatValue>
                    </StatLabelValueContainer>
                    <DiceContainer>
                        {rollSets[typedStat] && renderDice(rollSets[typedStat])}
                    </DiceContainer>
                </StatInputContainer>
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
            <ButtonContainer>
                <Button onClick={handleReset}>Reset Stats</Button>
                <Button onClick={handleRoll}>Roll 4d6, drop lowest Result</Button>
            </ButtonContainer>
        </div>
    )
}

export default DiceStats;