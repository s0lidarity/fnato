import { NumberInput, Separator } from 'react95';
import styled from 'styled-components';
import { t } from '@lingui/core/macro';

import { useSkills } from '../../../../providers/SkillsContext';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import { Skill } from '../../../../types/characterTypes';
import { generateSkillLabel } from './skillLabel';
import SubtypeEditor from './SubtypeEditor';

const SkillInputContainer = styled.div.attrs<any>({
    'data-testid': 'skill-input-container',
    'data-component': 'ProfessionSkillInput/SkillInputContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    min-height: 2.5rem;
    border: 0.2rem solid ${({ theme }) => theme.borderDark};
`;

const StyledSkillName = styled.div.attrs<any>({
    'data-testid': 'skill-name',
    'data-component': 'ProfessionSkillInput/StyledSkillName'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    min-width: 250px;
`;

const StyledValueContainer = styled.div.attrs<any>({
    'data-testid': 'value-container',
    'data-component': 'ProfessionSkillInput/StyledValueContainer'
})`
    display: flex;
    justify-content: center;
    min-width: 2rem;
`;

const StyledNumberInput = styled(NumberInput).attrs<any>({
    'data-testid': 'number-input',
    'data-component': 'ProfessionSkillInput/StyledNumberInput'
})`
    width: 3rem;
    flex-shrink: 0;
`;

const StyledLabel = styled.label.attrs<any>({
    'data-testid': 'label',
    'data-component': 'ProfessionSkillInput/StyledLabel'
})`
    white-space: nowrap;
    font-size: 0.9rem;
    align-self: center;
`;

const StyledBonusContainer = styled.div.attrs<any>({
    'data-testid': 'bonus-container',
    'data-component': 'ProfessionSkillInput/StyledBonusContainer'
})`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: right;
    min-width: fit-content;
`;

type SkillInputProps = {
    skill: Skill;
};

function ProfessionSkillInput({ 
    skill, 
}: SkillInputProps) {
    const { 
        adjustBonus, 
        calculateSkillValue, 
        bonusPointsRemaining 
    } = useSkills();

    const handleBonusChange = (value: number) => {
        adjustBonus(skill.id, value);
    };
    
    return (
        <SkillInputContainer>
            <StyledSkillName>
                <ReminderTooltip 
                    labelText={generateSkillLabel(skill)}
                    reminderText={skill.reminderMsg} 
                />
                <SubtypeEditor skill={skill} />
            </StyledSkillName>
            {skill.id !== 'unnatural' && (
                <>
                    <StyledBonusContainer>
                        <StyledLabel>{t`Bonus`}</StyledLabel>
                        <StyledNumberInput
                            min={0}
                            max={Math.min(8, (bonusPointsRemaining || 0) + (skill.bonus || 0))}
                            width="4rem"
                            value={skill.bonus || 0}
                            onChange={(value: number) => handleBonusChange(value)}
                        />
                    </StyledBonusContainer>
                </>
            )}
            <StyledValueContainer>
                {calculateSkillValue(skill.id)}
            </StyledValueContainer>
        </SkillInputContainer>
    );
};

export default ProfessionSkillInput;