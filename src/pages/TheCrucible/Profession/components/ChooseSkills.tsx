import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { Checkbox, GroupBox } from 'react95';

import { useSkills } from '../../../../providers/SkillsContext';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';

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

function ChooseSkills() {
    // need to track chosen skills and remaining choices
    const [showNoChoicesWarning, setShowNoChoicesWarning] = useState(false);
    const { 
            setSkillById, 
            applyProfessionSkills, 
            selectedSkillsIds, 
            setSelectedSkillsIds, 
            profession, 
            remainingSkillChoices,
            setRemainingSkillChoices
        } = useSkills();

    // AJS start here. Checks not rendering correctly. applies skills any time you click the checkbox
    const toggleSkill = (skillId: string) => {
        if (selectedSkillsIds.includes(skillId)) {
            // Remove skill
            // need to look this up by name
            const defaultValue = DEFAULT_SKILLS.find(s => s.id === skillId)?.value || 0;
            const success = setSkillById(skillId, { value: defaultValue });
            if (success) {
                // AJS start here, fix this
                setSelectedSkillsIds((prev: string[]) => prev.filter((id: string) => id !== skillId));
                setRemainingSkillChoices(prev => prev + 1);
            }
        } else if (remainingSkillChoices > 0) {
            // apply profession skill if we have choices remaining
            const skillToApply = profession.choosableSkills.find(s => s.id === skillId);
            if (skillToApply) {
                applyProfessionSkills([skillToApply]);
                setSelectedSkillsIds(prev => [...prev, skillToApply.id]);
                setRemainingSkillChoices(prev => prev - 1);
            }
        } else if (remainingSkillChoices <= 0) {
            setShowNoChoicesWarning(true);
            setTimeout(() => setShowNoChoicesWarning(false), 500);
        }
    };

    const noChoices = () => {
        return (profession ? 
            (<div>{`${profession?.name} has no flexible skills to choose from.`}</div>)
            : null 
        );
    } 

    const chooseSkillsCheckboxes = () => {
        return profession.choosableSkills.map((skill) => (
                <StyledSkillContainer key={skill.id}>
                    <Checkbox
                        name={skill.name}
                        value={skill.id}
                        checked={selectedSkillsIds.includes(skill.id)} 
                        onChange={() => toggleSkill(skill.id)}
                    />
                    {skill.label} ({skill.value})
                </StyledSkillContainer>
        ));
    };

    return (
        <StyledGroupBox variant='flat' label={`Choose ${remainingSkillChoices > 0 ? remainingSkillChoices : ''} Additional Skills`}>
            { !profession || profession?.choosableSkills?.length === 0 
                ? noChoices() 
                : chooseSkillsCheckboxes()
            }
            <div>
                <PointsCounter 
                    value={remainingSkillChoices}
                    showNoPointsWarning={showNoChoicesWarning}
                    minDigits={1}
                    label='Skill Choices Remaining'
                />
            </div>
        </StyledGroupBox>
    );
}

export default ChooseSkills;