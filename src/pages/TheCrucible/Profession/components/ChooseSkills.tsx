import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { Checkbox, GroupBox, Button } from 'react95';
import { Trans } from '@lingui/react/macro';
import { Trans as Trans2 } from '@lingui/react';
import { t } from '@lingui/core/macro';

import { useSkills } from '../../../../providers/SkillsContext';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';
import { createSkillId } from '../../../../utils/Professions';
import { generateSkillLabel } from './skillLabel';
import { i18n } from '@lingui/core';

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

const HeaderContainer = styled.div.attrs<any>({
    'data-testid': 'choose-skills-header',
    'data-component': 'ChooseSkills/HeaderContainer'
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

function ChooseSkills() {
    // need to track chosen skills and remaining choices
    const [showNoChoicesWarning, setShowNoChoicesWarning] = useState(false);
    const { 
        BonusSkillPackage,
        selectedSkillsIds, 
        profession, 
        skills, 
        remainingSkillChoices,
        setRemainingSkillChoices,
        setSelectedSkillsIds, 
        setSkillById,
        setSkills
        } = useSkills();

    // AJS starting point, bug fix
    // adding foreign language from choose skills did not work as expected
    const toggleSkill = (skillId: string) => {
        if (selectedSkillsIds.includes(skillId)) {
            const skillToRemove = profession?.choosableSkills.find(s => s.id === skillId);
            if(!skillToRemove){
                console.warn(`Skill with id: ${skillId} not found in ${profession?.name} choosable skills`);
                return;
            }

            // Check if skill is from profession or bonus package
            const isProfessionSkill = profession?.professionalSkills.some(ps => ps.id === skillId);
            const isBonusPackageSkill = BonusSkillPackage?.skills.some(bs => 
                createSkillId(bs.skillName, bs.subType) === skillId
            );

            // Only modify the skill if it's not from profession or bonus package
            if (!isProfessionSkill && !isBonusPackageSkill) {
                if (skillToRemove.subType) {
                    // Remove subtyped skill entirely if it was added by choice
                    const newSkills = skills.filter(s => s.id !== skillId);
                    setSkills(newSkills);
                } else {
                    // Reset to default value if it's a base skill
                    const defaultSkill = DEFAULT_SKILLS.find(s => s.name === skillToRemove.name);
                    if(defaultSkill){
                        setSkillById(skillId, { value: defaultSkill.value });
                    }
                }
            }
            
            setSelectedSkillsIds((prev: string[]) => prev.filter((id: string) => id !== skillId));
            setRemainingSkillChoices(prev => prev + 1);
        } else if (remainingSkillChoices > 0) {
            // Add single skill without affecting other skills
            const skillToApply = profession?.choosableSkills.find(s => s.id === skillId);
            if (skillToApply) {
                if (skillToApply.subType) {
                    // For subtyped skills, add as new skill
                    setSkills(prev => [...prev, skillToApply].sort((a, b) => a.name.localeCompare(b.name)));
                } else {
                    // For base skills, update existing skill
                    setSkillById(skillId, { value: skillToApply.value });
                }
                setSelectedSkillsIds(prev => [...prev, skillId]);
                setRemainingSkillChoices(prev => prev - 1);
            }
        } else if (remainingSkillChoices <= 0) {
            setShowNoChoicesWarning(true);
            setTimeout(() => setShowNoChoicesWarning(false), 500);
        }
    };

    const noChoices = () => {
        const professionName = profession?.name;
        return i18n._({
            id: 'choose-skills.no-choices',
            message:`{professionName} has no flexible skills to choose from.`,
            values: {
                professionName,
            }
        });
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
                    {generateSkillLabel(skill)} [${skill.value}]
                </StyledSkillContainer>
        ));
    };

    const handleClearSelectedSkills = () => {
        // Reset all selected skills to their default values
        selectedSkillsIds.forEach(skillId => {
            const skillToReset = profession?.choosableSkills.find(s => s.id === skillId);
            if (skillToReset) {
                const defaultSkill = DEFAULT_SKILLS.find(s => 
                    s.name === skillToReset.name && (!s.subType || s.subType === skillToReset.subType)
                );
                if (defaultSkill) {
                    setSkillById(skillId, { value: defaultSkill.value });
                }
            }
        });

        // Reset selected skills IDs
        setSelectedSkillsIds([]);
        
        // Reset remaining choices to original value
        setRemainingSkillChoices(profession?.chosenSkillCount || 0);
    };

    return (
        <StyledGroupBox variant='flat'>
            <HeaderContainer>
                <div>{<Trans>Choose {remainingSkillChoices > 0 ? remainingSkillChoices : ''} Additional Skills</Trans>}</div>
                <Button 
                    onClick={handleClearSelectedSkills}
                    disabled={selectedSkillsIds.length === 0}
                >
                    <Trans>Clear Selected Skills</Trans>
                </Button>
            </HeaderContainer>
            { !profession || profession?.choosableSkills?.length === 0 
                ? noChoices() 
                : chooseSkillsCheckboxes()
            }
            <div>
                <PointsCounter 
                    value={remainingSkillChoices}
                    showNoPointsWarning={showNoChoicesWarning}
                    minDigits={1}
                    label={t`Skill Choices Remaining`}
                />
            </div>
        </StyledGroupBox>
    );
}

export default ChooseSkills;