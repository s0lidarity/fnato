import { NumberInput, TextInput } from 'react95';
import { useState, useCallback, useMemo, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { i18n } from '@lingui/core';

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
    display: grid;
    grid-template-columns: minmax(200px, 300px) repeat(4, auto);
    align-items: center;
    width: 100%;
    padding: 0.1rem;
    border: 0.2rem solid ${({ theme }) => theme.borderDark};
    gap: 2rem;
`;

const StyledSkillName = styled.div.attrs<any>({
    'data-testid': 'skill-name',
    'data-component': 'CustomSkillInput/StyledSkillName'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ValueSection = styled.div.attrs<any>({
    'data-testid': 'value-section',
    'data-component': 'CustomSkillInput/ValueSection'
})`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
`;

const StyledBaseValue = styled.div.attrs<any>({
    'data-testid': 'base-value',
    'data-component': 'CustomSkillInput/StyledBaseValue'
})`
    margin: 0.2rem;
    font-weight: bold;
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
        skillPointsRemaining,
        setSkillById,
        setSkillPointsRemaining
    } = useSkills();
    // local points are used to prevent user from setting points allocated higher than the max
    const [localPoints, setLocalPoints] = useState(skill.pointsAllocated || 0);
    const [isFlashing, setIsFlashing] = useState(false);

    useEffect(() => {
        setLocalPoints(skill.pointsAllocated || 0);
    }, [skill.pointsAllocated]);

    const baseValue = DEFAULT_SKILLS.find(s => s.name === skill.name)?.value || 0;
    const totalValue = Math.min(DEFAULT_TOTAL_CAP, baseValue + skill.pointsAllocated + (skill.bonus * DEFAULT_BONUS_VALUE));

    const handleAllocatePoints = useCallback((inputValue: string) => {
        const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        const currentPoints = skill.pointsAllocated || 0;
        const diff = numericValue - currentPoints;

        // handle negative inputs or NaN
        if (numericValue < 0 || isNaN(numericValue)) {
            setSkillById(skill.id, { 
                ...skill,
                pointsAllocated: 0
            });
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
        if (numericValue + baseValue > DEFAULT_MAX_SKILL_VALUE) {
            const allowedPoints = DEFAULT_MAX_SKILL_VALUE - baseValue;
            setSkillById(skill.id, { 
                ...skill,
                pointsAllocated: allowedPoints
            });
            setSkillPointsRemaining(skillPointsRemaining + (currentPoints - allowedPoints));
            setLocalPoints(allowedPoints);
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 500);
            return;
        }

        // default happy path, set the new value
        setSkillById(skill.id, { 
            ...skill,
            pointsAllocated: numericValue
        });
        setSkillPointsRemaining(skillPointsRemaining - diff);
    }, [skill, skillPointsRemaining, maxValue, baseValue, setSkillById, setSkillPointsRemaining]);

    const debouncedAllocatePoints = useMemo(
        () => debounce((value: string) => handleAllocatePoints(value), 500),
        [handleAllocatePoints]
    );

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedAllocatePoints.cancel();
        };
    }, [debouncedAllocatePoints]);

    const handleChange = (e: any) => {
        const value = e.target.value;
        setLocalPoints(value);
        debouncedAllocatePoints(value);
    };

    const handleBonusChange = (value: number) => {
        adjustBonus(skill.id, value);
    };

    const labelText = skill.fullLabelMsg || `${i18n._(skill.labelMsg)} ${skill.subType ? `(${skill.subType})` : ''}`;

    return (
        <SkillInputContainer>
            <StyledSkillName>
                <ReminderTooltip 
                    labelText={labelText}
                    reminderText={skill.reminderMsg} 
                />
                <SubtypeEditor skill={skill} />
            </StyledSkillName>
            
            <ValueSection>
                <StyledLabel>Starts at:</StyledLabel>
                <StyledBaseValue>{baseValue}</StyledBaseValue>
            </ValueSection>
            
            <ValueSection>
                <StyledLabel>Points</StyledLabel>
                <StyledValueInput
                    min={0}
                    max={maxValue - baseValue}
                    value={localPoints}
                    onChange={handleChange}
                    $isFlashing={isFlashing}
                />
            </ValueSection>
            
            <ValueSection>
                <StyledLabel>Bonus</StyledLabel>
                <StyledBonusInput
                    min={0}
                    max={8}
                    width={'4rem'}
                    value={skill.bonus || 0}
                    onChange={handleBonusChange}
                />
            </ValueSection>
            
            <ValueSection>
                <StyledLabel>Total</StyledLabel>
                <div>{totalValue.toString().padStart(2, '0')}</div>
            </ValueSection>
        </SkillInputContainer>
    );
}

export default CustomSkillInput;
