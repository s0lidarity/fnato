import { NumberInput } from 'react95';
import styled from 'styled-components';

import { useSkills } from '../../../../providers/SkillsContext';
import { getSkillNameText } from './utils';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { SKILL_REMINDERS } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';

const SkillInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    min-width: 0rem;
`;

const StyledReminderTooltip = styled(ReminderTooltip)`
    min-width: 0rem;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const StyledNumberInput = styled(NumberInput)`
    width: 3rem;
    flex-shrink: 0;
`;

const StyledLabel = styled.label`
    white-space: nowrap;
    font-size: 0.9rem;
    align-self: center;
`;

const StyledBonusContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: right;
    gap: 0.5rem;
`;

type SkillInputProps = {
    config: ProfessionConfigOptions;
    skillKey: string;
    handleBonusChange: (skillKey: string) => (value: number) => void;
};

function SkillInput({ config, skillKey, handleBonusChange }: SkillInputProps) {
    const { skills } = useSkills();

    return (
        <SkillInputContainer>
            <ReminderTooltip 
                itemKey={skillKey} 
                labelText={getSkillNameText(skillKey)} 
                reminders={SKILL_REMINDERS} 
            />
            <span>
                {skills[skillKey].value}
            </span>
            <StyledBonusContainer>
            <StyledLabel>Bonus</StyledLabel>
            <StyledNumberInput
                min={0}
                max={8}
                width="4rem"
                value={skills[skillKey].bonus}
                onChange={handleBonusChange(skillKey)}
            />
            </StyledBonusContainer>
        </SkillInputContainer>
    );
};

export default SkillInput;