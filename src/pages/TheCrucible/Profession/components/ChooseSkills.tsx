import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { Checkbox, GroupBox } from 'react95';

import { IProfession } from '../../../../types/characterTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';

type ChooseSkillsProps = {
    profession: IProfession;
};
const StyledGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'choose-skills-group',
    'data-component': 'ChooseSkills/StyledGroupBox'
})`
    background-color: ${({ theme }) => theme.materialDark};
    width: 100%;
`;

const StyledSkillContainer = styled.div.attrs<any>({
    'data-testid': 'skill-container',
    'data-component': 'ChooseSkills/StyledSkillContainer'
})`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

function ChooseSkills({ profession }: ChooseSkillsProps) {
    // need to track chosen skills and remaining choices
    const [selectedSkillsIds, setSelectedSkillsIds] = useState<string[]>([]);
    // AJS we need to clear selectedSkillsIds when profession changes
    const [remainingChoices, setRemainingChoices] = useState(profession?.chosenSkillCount || 0);
    const { setSkillById, applyProfessionSkills } = useSkills();

    const toggleSkill = (skillId: string) => {
        if (selectedSkillsIds.includes(skillId)) {
            // Remove skill
            const defaultValue = DEFAULT_SKILLS.find(s => s.id === skillId)?.value || 0;
            const success = setSkillById(skillId, { value: defaultValue });
            if (success) {
                setSelectedSkillsIds(prev => prev.filter(id => id !== skillId));
                setRemainingChoices(prev => prev + 1);
            }
        } else if (remainingChoices > 0) {
            // apply profession skill if we have choices remaining
            applyProfessionSkills([profession.choosableSkills.find(s => s.id === skillId)]);
        }
    };

    return (
        <StyledGroupBox variant='flat' label={`Choose ${remainingChoices > 0 ? remainingChoices : ''} Additional Skills`}>
            {profession.choosableSkills.map((skill) => {
                return (
                    <StyledSkillContainer>
                        <Checkbox
                            name={skill.name}
                            value={skill.id}
                            checked={selectedSkillsIds.includes(skill.id)} 
                            onChange={() => toggleSkill(skill.id)}
                        />
                        {skill.label} ({skill.value})
                    </StyledSkillContainer>
                );
            })}
            <div>
                <PointsCounter 
                    value={remainingChoices}
                    showNoPointsWarning={remainingChoices <= 0}
                    minDigits={1}
                    label='Skills Remaining'
                />
            </div>
        </StyledGroupBox>
    );
}

export default ChooseSkills;