import { NumberInput, Separator, TextInput } from 'react95';
import styled from 'styled-components';

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { Skill } from '../../../../types/characterTypes';
import SubtypeEditor from './SubtypeEditor';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';

const SkillInputContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-input-container',
    'data-component': 'CustomSkillInput/SkillInputContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
    min-width: 250px;
`;

const BaseGroup = styled.div.attrs<any>({
    'data-testid': 'base-group',
    'data-component': 'CustomSkillInput/BaseGroup'
})`
    display: flex;
    flex-direction: row;
`;

const StyledBaseValue = styled.div.attrs<any>({
    'data-testid': 'base-value',
    'data-component': 'CustomSkillInput/StyledBaseValue'
})`
    color: ${({ theme }) => theme.materialTextDisabled};
`;

const StyledValueInput = styled(TextInput).attrs<any>({
    'data-testid': 'value-input',
    'data-component': 'CustomSkillInput/StyledValueInput'
})`
    width: 4rem;
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

function CustomSkillInput({ skill, maxValue = 60 }: CustomSkillInputProps) {
    const { 
        adjustBonus,
        calculateSkillValue,
        skillPointsRemaining,
        setSkillById,
        setSkillPointsRemaining
    } = useSkills();

    const handleBaseValueChange = (value: number) => {
        if (value >= 0 && value <= maxValue) {
            setSkillById(skill.id, { value });
        }
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
                    <StyledBaseValue>{`${DEFAULT_SKILLS.find(s => s.name === skill.name)?.value}`}</StyledBaseValue>
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
                        max={maxValue}
                        value={skill.value || 0}
                        onChange={handleBaseValueChange}
                    />
                </ValueGroup>
                <Separator orientation="vertical" />
                <ValueGroup>
                    <StyledLabel>Bonus</StyledLabel>
                    <StyledValueInput
                        min={0}
                        max={8}
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
