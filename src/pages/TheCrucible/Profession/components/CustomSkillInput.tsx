import { NumberInput, Separator, TextInput } from 'react95';
import { useState } from 'preact/hooks';
import styled from 'styled-components';

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { Skill } from '../../../../types/characterTypes';
import SubtypeEditor from './SubtypeEditor';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';
import { DEFAULT_MAX_SKILL_VALUE, DEFAULT_BONUS_VALUE } from '../../../../constants/gameRules';

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
})`
    width: 3rem;
    text-align: right;
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

    const baseValue = DEFAULT_SKILLS.find(s => s.name === skill.name)?.value || 0;
    const totalValue = baseValue + skill.pointsAllocated + (skill.bonus * DEFAULT_BONUS_VALUE);

    const handleChange = (e: any) => {
        const value = e.target.value;
        console.log(`handleChange: skill ${skill.name}`, value);
        setLocalPoints(value);
    };

    // AJS needs to be able to handle string or number input
    const handleAllocatePoints = (inputValue: string) => {
        const numericValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
        console.log('numericValue', numericValue, '\nvalue', inputValue);
        const currentPoints = skill.pointsAllocated || 0;
        const diff = numericValue - currentPoints;

        // handle negative inputs or NaN
        if (numericValue < 0 || isNaN(numericValue)) {
            setSkillById(skill.id, { ...skill, pointsAllocated: 0 });
            setSkillPointsRemaining(skillPointsRemaining + currentPoints);
            return;
        }

        // do we have enough points left?
        if(diff > skillPointsRemaining) {
            // flash the UI

            // AJS start here, it's not forcing the displayed localPoints back to pointsAllocated
            // force the localPoints back to pointsAllocated
            setLocalPoints(skill.pointsAllocated || 0);
            return;
        }

        // check max value
        if (numericValue + baseValue > maxValue) {
            const allowedPoints = maxValue - baseValue;
            setSkillById(skill.id, { ...skill, pointsAllocated: allowedPoints });
            setSkillPointsRemaining(skillPointsRemaining + (currentPoints - allowedPoints));
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
                        onBlur={() => handleAllocatePoints(localPoints)}
                    />
                </ValueGroup>
                <Separator orientation="vertical" />
                <ValueGroup>
                    <StyledLabel>Bonus</StyledLabel>
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
