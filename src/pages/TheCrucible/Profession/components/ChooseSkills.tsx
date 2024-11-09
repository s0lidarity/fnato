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

const StyledGroupBox = styled(GroupBox)`
    background-color: ${({ theme }) => theme.materialDark};
    width: 100%;
`;

const StyledSkillContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

function ChooseSkills({ profession }: ChooseSkillsProps) {
    // need to track chosen skills and remaining choices
    // maybe make this track skill ids
    const [selectedSkillsIds, setSelectedSkillsIds] = useState<string[]>([]);
    const [remainingChoices, setRemainingChoices] = useState(profession?.chosenSkillCount || 0);
    const { setSkillById } = useSkills();

    const toggleSkill = (skillId: string) => {
        // check if skill is already selected, if so always remove it 
        // if not selected, check if adding it will put us over the limit
        // update skills and remaining choices
        console.log(skillId);
    };

    return (
        <StyledGroupBox variant='flat' label={`Choose ${remainingChoices} Additional Skills`}>
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