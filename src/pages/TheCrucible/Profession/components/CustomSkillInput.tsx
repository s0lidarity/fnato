import { NumberInput, Separator, TextInput } from 'react95';
import { useState, useCallback } from 'preact/hooks';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { Skill } from '../../../../types/characterTypes';
import SubtypeEditor from './SubtypeEditor';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';
import { DEFAULT_MAX_SKILL_VALUE, DEFAULT_BONUS_VALUE, DEFAULT_TOTAL_CAP } from '../../../../constants/gameRules';

const SkillInputContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-input-container',
    'data-component': 'CustomSkillInput/SkillInputContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    gap: 0.5rem;
    width: 100%;
    border: 0.2rem solid ${({ theme }) => theme.borderDark};
`;

const InputGroup = styled.div.attrs<any>({
    'data-testid': 'input-group',
    'data-component': 'CustomSkillInput/InputGroup'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    flex: 2;
`;

const ValueGroup = styled.div.attrs<any>({
    'data-testid': 'value-group',
    'data-component': 'CustomSkillInput/ValueGroup'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    min-width: 12rem;
`;

const BaseGroup = styled.div.attrs<any>({
    'data-testid': 'base-group',
    'data-component': 'CustomSkillInput/BaseGroup'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 12rem;
`;

const StyledSkillName = styled.div.attrs<any>({
    'data-testid': 'skill-name',
    'data-component': 'CustomSkillInput/StyledSkillName'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 18rem;
`;

const StyledBaseValue = styled.div.attrs<any>({
    'data-testid': 'base-value',
    'data-component': 'CustomSkillInput/StyledBaseValue'
})`
    margin: 0.5rem;
    font-weight: bold;
    padding: 0.2rem;
    min-width: 1.5rem;
    text-align: right;
    background-color: ${({ theme }) => theme.flatLight};
    color: ${({ theme }) => theme.materialTextDisabled};
`;

const StyledValueInput = styled(TextInput).attrs<any>({
    'data-testid': 'value-input',
    'data-component': 'CustomSkillInput/StyledValueInput'
})<{ $isFlashing?: boolean }>`
    width: 3rem;
    text-align: right;
    animation: ${({ $isFlashing }) => $isFlashing ? 'flash 0.5s' : 'none'};

    @keyframes flash {
        0%, 100% {
            background-color: inherit;
            color: inherit;
        }
        50% {
            background-color: ${({ theme }) => theme.material.focusSecondary};
            color: ${({ theme }) => theme.materialTextDisabled};
        }
    }
`;

const StyledBonusInput = styled(NumberInput).attrs<any>({
    'data-testid': 'bonus-input',
    'data-component': 'CustomSkillInput/StyledBonusInput'
})`
    width: 1rem;
`;

const StyledLabel = styled.label.attrs<any>({
    'data-testid': 'label',
    'data-component': 'CustomSkillInput/StyledLabel'
})`
    white-space: nowrap;
    font-size: 0.9rem;
    align-self: center;
`;

interface CustomSkillInputProps {
    skill: Skill;
    maxValue?: number;
}

function CustomSkillInput({ skill, maxValue = DEFAULT_MAX_SKILL_VALUE }: CustomSkillInputProps) {
    const { 
        adjustBonus,
        calculateSkillValue,
        skillPointsRemaining,
        setSkillById,
        setSkillPointsRemaining
    } = useSkills();
    const [localPoints, setLocalPoints] = useState(skill.pointsAllocated || 0);
    const [isFlashing, setIsFlashing] = useState(false);

    const baseValue = DEFAULT_SKILLS.find(s => s.name === skill.name)?.value || 0;
    const totalValue = baseValue + skill.pointsAllocated + (skill.bonus * DEFAULT_BONUS_VALUE);

    const debouncedAllocatePoints = useCallback(
        debounce((value: string) => handleAllocatePoints(value), 500),
        []
    );

    const handleChange = (e: any) => {
        const value = e.target.value;
        // AJS maybe here to fix the issue of the displayed localPoints not being updated here
        setLocalPoints(value);
        debouncedAllocatePoints(value);
    };

    const handleAllocatePoints = (inputValue: string) => {
        const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        console.log('numericValue', numericValue, '\nvalue', inputValue);
        const currentPoints = skill.pointsAllocated || 0;
        const diff = numericValue - currentPoints;

        // handle negative inputs or NaN
        if (numericValue < 0 || isNaN(numericValue)) {
            setSkillById(skill.id, { ...skill, pointsAllocated: 0 });
            setSkillPointsRemaining(skillPointsRemaining + currentPoints);
            setLocalPoints(0);
            return;
        }

        // do we have enough points left?
        if(diff > skillPointsRemaining) {
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 500);
            setLocalPoints(skill.pointsAllocated || 0);
            return;
        }

        // check max value
        if (numericValue + baseValue > maxValue) {
            const allowedPoints = maxValue - baseValue;
            setSkillById(skill.id, { ...skill, pointsAllocated: allowedPoints });
            setSkillPointsRemaining(skillPointsRemaining + (currentPoints - allowedPoints));
            setLocalPoints(allowedPoints);
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 500);
            return;
        }

        // default happy path, set the new value
        console.log('skillPointsRemaining pre set', skillPointsRemaining);
        console.log('diff', diff);
        setSkillById(skill.id, { ...skill, pointsAllocated: numericValue });
        setSkillPointsRemaining(skillPointsRemaining - diff);
        console.log('skillPointsRemaining post set', skillPointsRemaining);
    };

    const handleBonusChange = (value: number) => {
        adjustBonus(skill.id, value);
    };

    const skillLabel = `${skill.label} ${skill.subType ? `(${skill.subType})` : ''}`;

    return (
        <SkillInputContainer>
            <StyledSkillName>
                <ReminderTooltip 
                    labelText={skillLabel}
                    reminderText={skill.reminderText} 
                />
                <SubtypeEditor skill={skill} />
            </StyledSkillName>
            <InputGroup>
                <BaseGroup>
                    <StyledLabel>Starts at: </StyledLabel>
                    <StyledBaseValue>{baseValue}</StyledBaseValue>
                </BaseGroup>
                <ValueGroup>
                    <StyledLabel>Skill Points Allocated</StyledLabel>
                    <StyledValueInput
                        min={0}
                        max={maxValue - baseValue}
                        value={localPoints}
                        onChange={handleChange}
                        $isFlashing={isFlashing}
                    />
                </ValueGroup>
                <Separator orientation="vertical" />
                <ValueGroup>
                    <StyledLabel>
                        {/* AJS move this to the header */}
                        <ReminderTooltip labelText='Bonus' reminderText={`Adds ${DEFAULT_BONUS_VALUE} to the skill total for each bonus point allocated (capped at ${DEFAULT_TOTAL_CAP})`} />
                    </StyledLabel>
                    <StyledBonusInput
                        min={0}
                        max={8}
                        width={'4rem'}
                        value={skill.bonus || 0}
                        onChange={handleBonusChange}
                    />
                </ValueGroup>
                <Separator orientation="vertical" />
                <ValueGroup>
                    <StyledLabel>Total</StyledLabel>
                    <div>{totalValue}</div>
                </ValueGroup>
            </InputGroup>
        </SkillInputContainer>
    );
}

export default CustomSkillInput;
