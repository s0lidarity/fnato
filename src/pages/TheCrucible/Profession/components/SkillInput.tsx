import { NumberInput, Separator } from 'react95';
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
    width: 100%;
    min-width: 0;
    border: 2px solid ${({ theme }) => theme.borderDark};
`;

const StyledSkillName = styled.div`
    flex-shrink: 0;
    flex-grow: 1;
    justify-content: flex-start;
`;

const StyledValueContainer = styled.div`
    justify-content: flex-end;
    margin-right: 0.5rem;
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
    justify-content: flex-end;
    align-items: right;
    margin-left: 0.5rem;
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
            <StyledSkillName>
                <ReminderTooltip 
                    itemKey={skillKey} 
                    labelText={getSkillNameText(skillKey)} 
                    reminders={SKILL_REMINDERS} 
                />
                {/* need to be able to assign a subtype here */}
                {skills[skillKey].subType}
            </StyledSkillName>
            <StyledValueContainer>
                {skills[skillKey].value}
            </StyledValueContainer>
            <Separator orientation="vertical" />
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