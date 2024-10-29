import { NumberInput } from 'react95';
import styled from 'styled-components';

import { useSkills } from '../../../../providers/SkillsContext';
import { getSkillNameText } from './utils';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { SKILL_REMINDERS } from '../../../../types/characterTypes';

const SkillInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function SkillInput({ skillKey, handleBonusChange }) {
    const { skills } = useSkills();

    return (
        <SkillInputContainer>
            <ReminderTooltip 
                itemKey={skillKey} 
                labelText={getSkillNameText(skillKey)} 
                reminders={SKILL_REMINDERS} 
            />
            <label>Bonus</label>
            <NumberInput
                min={0}
                max={8}
                value={skills[skillKey].bonus}
                onChange={handleBonusChange(skillKey)}
            />
        </SkillInputContainer>
    );
};

export default SkillInput;