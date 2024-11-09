import { useState } from 'preact/hooks';
import { Skill } from '../../../../types/characterTypes';
import styled from 'styled-components';
import { Checkbox, GroupBox } from 'react95';

import { IProfession } from '../../../../types/characterTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';

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
    const [remainingChoices, setRemainingChoices] = useState(profession?.chosenSkillCount || 0);
    const { setSkillById } = useSkills();

    const toggleSkill = (skillId: string) => {
        if (selectedSkillsIds.includes(skillId)) {
            // Remove skill
            setSelectedSkillsIds(prev => prev.filter(id => id !== skillId));
            setRemainingChoices(prev => prev + 1);
            setSkillById(skillId, { value: 0 }); // Reset skill value
        } else if (remainingChoices > 0) {
            // Add skill if we have choices remaining
            setSelectedSkillsIds(prev => [...prev, skillId]);
            setRemainingChoices(prev => prev - 1);
            
            // Find the skill to get its profession value
            const skill = profession.choosableSkills.find(s => s.id === skillId);
            if (skill) {
                setSkillById(skillId, { value: skill.value });
            }
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