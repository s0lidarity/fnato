import { useState, useEffect } from 'preact/hooks';
import { PiDiceOne, PiDiceTwo, PiDiceThree, PiDiceFour, PiDiceFive, PiDiceSix } from 'react-icons/pi';
import { Button } from "react95";
import styled from 'styled-components';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { motion } from 'framer-motion';

import { useStats } from '../../../../../providers/StatisticsContext';
import { generateStat } from '../../../../../utils/CharacterGenerator';
import { Statistics } from '../../../../../types/characterTypes';
import ReminderTooltip from '../../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import StatInputContainer from '../../styles/StatInputContainer';

const StatLabelValueContainer = styled.div.attrs<any>({
    'data-component': 'Statistics/DiceStats/StatLabelValueContainer',
    'data-testid': 'dice-stats-stat-label-value-container',
})`
    display: flex;
    align-items: center;
    padding: 0.25rem;
    justify-content: space-between;
    flex: 1;
`;

const StatLabel = styled.div.attrs<any>({
    'data-component': 'Statistics/DiceStats/StatLabel',
    'data-testid': 'dice-stats-stat-label',
})`
    width: 4rem;
    display: flex;
    align-items: center;
`;

const StatValue = styled.span.attrs<any>({
    'data-component': 'Statistics/DiceStats/StatValue',
    'data-testid': 'dice-stats-stat-value',
})`
    margin-left: 0.5rem;
    text-align: right;
    min-width: 4rem;
`;

const DiceContainer = styled.div.attrs<any>({
    'data-component': 'Statistics/DiceStats/DiceContainer',
    'data-testid': 'dice-stats-dice-container',
})`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.25rem;
    font-size: 1.5rem;
`;

const ButtonContainer = styled.div.attrs<any>({
    'data-component': 'Statistics/DiceStats/ButtonContainer',
    'data-testid': 'dice-stats-button-container',
})`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const StyledDiceRowContainer = styled.div.attrs<any>({
    'data-component': 'Statistics/DiceStats/StyledDiceRowContainer',
    'data-testid': 'dice-stats-styled-dice-row-container',
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.1rem 0;
    padding-top: 1px;
    width: 100%;
`;

const DiceWrapper = styled.div<{ isDropped?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ isDropped }) => (isDropped ? 0.5 : 1)};
`;

const MotionWrapper = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const diceIconMap = {
    1: PiDiceOne,
    2: PiDiceTwo,
    3: PiDiceThree,
    4: PiDiceFour,
    5: PiDiceFive,
    6: PiDiceSix,
};

const AnimatedDice = ({ isRolling, finalRoll, isDropped }: { isRolling: boolean, finalRoll: number, isDropped: boolean }) => {
    const [displayedRoll, setDisplayedRoll] = useState(finalRoll);

    useEffect(() => {
        if (isRolling) {
            const interval = setInterval(() => {
                setDisplayedRoll(Math.floor(Math.random() * 6) + 1);
            }, 75);

            return () => clearInterval(interval);
        } else {
            setDisplayedRoll(finalRoll);
        }
    }, [isRolling, finalRoll]);

    const DiceIcon = diceIconMap[displayedRoll as keyof typeof diceIconMap] || PiDiceOne;

    return (
        <DiceWrapper isDropped={!isRolling && isDropped}>
            <MotionWrapper
                animate={isRolling ? {
                    rotate: 360,
                    transition: { duration: 0.4, ease: "linear", repeat: Infinity }
                } : { rotate: 0 }}
            >
                <DiceIcon title={String(displayedRoll)} />
            </MotionWrapper>
        </DiceWrapper>
    );
};

function DiceStats() {
    const { resetStats, stats, setStats } = useStats();
    const [isRolling, setIsRolling] = useState(false);
    const [rollSets, setRollSets] = useState<Record<keyof Statistics, number[]>>({
        // Pre-fill with dummy data to show dice on initial load
        ...Object.keys(stats).reduce((acc, stat) => ({ ...acc, [stat]: [1, 1, 1, 1] }), {} as Record<keyof Statistics, number[]>)
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
                const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
                const minVal = Math.min(...rolls);
                const result = rolls.reduce((acc, curr) => acc + curr, 0) - minVal;

                updatedStats[stat as keyof Statistics] = generateStat(stat as keyof Statistics, result);
                newRollSets[stat as keyof Statistics] = rolls;
            }
        }
    
        return { updatedStats, newRollSets };
    }

    useEffect(() => {
        handleRoll();
    }, []);

    const renderDice = (rolls: number[]) => {
        const minVal = Math.min(...rolls);
        const minIndex = rolls.indexOf(minVal);

        return rolls.map((roll, index) => {
            return <AnimatedDice key={index} isRolling={isRolling} finalRoll={roll} isDropped={index === minIndex} />;
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
                                    labelText={t`${stats[stat as keyof Statistics].label}`}
                                    reminderText={t`${stats[stat as keyof Statistics].reminderText}`} />
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
        if (isRolling) return;
        setIsRolling(true);
        setTimeout(() => {
            const { updatedStats, newRollSets } = rollStats(stats);
            setStats(updatedStats);
            setRollSets(newRollSets);
            setIsRolling(false);
        }, 600);
    }

    const handleReset = () => {
        resetStats();
        // Set placeholder dice for the next roll
        setRollSets(Object.keys(stats).reduce((acc, stat) => ({ ...acc, [stat]: [1, 1, 1, 1] }), {} as Record<keyof Statistics, number[]>));
    }

    return (
        <div>
            {renderStats()}
            <ButtonContainer>
                <Button onClick={handleReset}><Trans>Reset Stats</Trans></Button>
                <Button onClick={handleRoll}><Trans>Roll 4d6, drop lowest Result</Trans></Button>
            </ButtonContainer>
        </div>
    )
}

export default DiceStats;