import { NumberInput, Separator, TextInput } from 'react95';
import { useState } from 'preact/hooks';
import styled from 'styled-components';

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { Skill } from '../../../../types/characterTypes';
import SubtypeEditor from './SubtypeEditor';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';
import { DEFAULT_MAX_SKILL_VALUE } from '../../../../constants/gameRules';

const SkillInputContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-input-container',
    'data-component': 'CustomSkillInput/SkillInputContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 0.5rem;
    width: 100%;
    border: 0.2rem solid ${({ theme }) => theme.borderDark};
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
    width: 20rem;
`;

const BaseGroup = styled.div.attrs<any>({
    'data-testid': 'base-group',
    'data-component': 'CustomSkillInput/BaseGroup'
})`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const StyledBaseValue = styled.div.attrs<any>({
    'data-testid': 'base-value',
    'data-component': 'CustomSkillInput/StyledBaseValue'
})`
    margin: 0.5rem;
    font-weight: bold;
    padding: 0.2rem;
    background-color: ${({ theme }) => theme.flatLight};
    color: ${({ theme }) => theme.materialTextDisabled};
`;

const StyledValueInput = styled(TextInput).attrs<any>({
    'data-testid': 'value-input',
    'data-component': 'CustomSkillInput/StyledValueInput'
})`
    width: 3rem;
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

const InputGroup = styled.div.attrs<any>({
    'data-testid': 'input-group',
    'data-component': 'CustomSkillInput/InputGroup'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
`;

const ValueGroup = styled.div.attrs<any>({
    'data-testid': 'value-group',
    'data-component': 'CustomSkillInput/ValueGroup'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
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


    const handleChange = (e: any) => {
        console.log('e', e);
        const value = e.target.value || 0;
        console.log(`handleChange: skill ${skill.name}`, value);
        if(value === '' || (isNaN(Number(value)) && Number(value) >= 0)) {
            setLocalPoints(value === '' ? 0 : Number(value));
        }
    };

    const handleAllocatePoints = (value: number | string) => {
        const numericValue = value === '' ? 0 : Number(value);
        console.log('numericValue', numericValue, '\nvalue', value);
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
                    {/* AJS start here */}
                    {/* let's show the base value, the points allocated, the bonus, then the total
                    base should be a label
                    points allocated should be a TextInput
                    bonus should be a label and a NumberInput
                    total should show calcualted value
                    might need to have just one input per line in custom skill form */}
                    <StyledLabel>Skill Points Allocated</StyledLabel>
                    <StyledValueInput
                        min={0}
                        max={maxValue - baseValue}
                        value={localPoints}
                        // AJS start here, add onChange to store value in local state then update in the blur
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
                    <div>{calculateSkillValue(skill.id)}</div>
                </ValueGroup>
            </InputGroup>
        </SkillInputContainer>
    );
}

export default CustomSkillInput;
