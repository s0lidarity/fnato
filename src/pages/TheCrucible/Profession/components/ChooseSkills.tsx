import { useState } from 'preact/hooks';
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
            selectedSkillsIds, 
            profession, 
            skills, 
            remainingSkillChoices,
            applyProfessionSkills, 
            setRemainingSkillChoices,
            setSelectedSkillsIds, 
            setSkillById,
            setSkills
        } = useSkills();

    // AJS start here, subtyped skills not working well
    const toggleSkill = (skillId: string) => {
        if (selectedSkillsIds.includes(skillId)) {
            const skillToRemove = profession?.choosableSkills.find(s => s.id === skillId);
            if(!skillToRemove){
                console.warn(`Skill with id: ${skillId} not found in ${profession?.name} choosable skills`);
                return;
            }

            // If this is a subtyped skill that was added (not in profession skills)
            const isProfessionSkill = profession?.professionalSkills.some(ps => 
                ps.name === skillToRemove.name && 
                ps.subType === skillToRemove.subType
            );

            if (!isProfessionSkill && skillToRemove.subType) {
                // Remove the skill entirely from context
                const newSkills = skills.filter(s => 
                    !(s.name === skillToRemove.name && s.subType === skillToRemove.subType)
                );
                setSkills(newSkills);
            } else {
                // Reset to default value if it's not a subtyped skill or is in profession skills
                const defaultSkill = DEFAULT_SKILLS.find(s => 
                    s.name === skillToRemove.name && (!s.subType || s.subType === skillToRemove.subType)
                );

                if(defaultSkill){
                    setSkillById(skillId, { value: defaultSkill.value });
                }
            }
            
            setSelectedSkillsIds((prev: string[]) => prev.filter((id: string) => id !== skillId));
            setRemainingSkillChoices(prev => prev + 1);
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
                        name={`${skill.name} (${skill.subType})`}
                        value={skill.id}
                        checked={selectedSkillsIds.includes(skill.id)} 
                        onChange={() => toggleSkill(skill.id)}
                    />
                    {`${skill.name} ${skill.subType ? `(${skill.subType})` : ''} [${skill.value}]`}
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