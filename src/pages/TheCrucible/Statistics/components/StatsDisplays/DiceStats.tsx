import { useState } from 'preact/hooks';
import { PiDiceOne, PiDiceTwo, PiDiceThree, PiDiceFour, PiDiceFive, PiDiceSix } from 'react-icons/pi';
import { Button } from "react95";
import styled from 'styled-components';

import { useStats } from '../../../../../providers/StatisticsContext';
import { rollDice, generateStat } from '../../../../../utils/CharacterGenerator';
import { Statistics, STAT_REMINDERS } from '../../../../../types/characterTypes';
import ReminderTooltip from '../../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import StatInputContainer from '../../styles/StatInputContainer';

const StatLabelValueContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.25rem;
    justify-content: space-between;
    flex: 1;
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
    justify-content: flex-end;
    padding: 0.25rem;
    font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const StyledDiceRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.1rem 0;
    padding-top: 1px;
    width: 100%;
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
                    <StyledDiceRowContainer>
                        <StatLabelValueContainer>
                            <StatLabel>
                                <ReminderTooltip 
                                    itemKey={stat} 
                                    labelText={stat.charAt(0).toUpperCase() + stat.slice(1)} 
                                    reminders={STAT_REMINDERS} />
                            </StatLabel>
                            <StatValue>
                                {stats[stat as keyof Statistics].score}
                            </StatValue>
                        </StatLabelValueContainer>
                        <DiceContainer>
                            {rollSets[typedStat] && renderDice(rollSets[typedStat])}
                        </DiceContainer>
                    </StyledDiceRowContainer>
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