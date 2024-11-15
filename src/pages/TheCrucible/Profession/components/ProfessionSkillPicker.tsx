import styled from 'styled-components';
import { GroupBox } from 'react95';

import ChooseSkills from './ChooseSkills';
import { IProfession, Skill } from '../../../../types/characterTypes';


const PSPContainer = styled.div.attrs<any>({
    'data-testid': 'profession-skill-picker-container',
    'data-component': 'ProfessionSkillPicker/PSPContainer'
})`
    width: 95%;
    margin-top: 1.5rem;
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
`;

const ProfessionalSkillsContainer = styled.div.attrs<any>({
    'data-testid': 'professional-skills-container',
    'data-component': 'ProfessionSkillPicker/ProfessionalSkillsContainer'
})`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    flex: 1;
`;

const SkillChoiceContainer = styled.div.attrs<any>({
    'data-testid': 'skill-choice-container',
    'data-component': 'ProfessionSkillPicker/SkillChoiceContainer'
})`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const StyledGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'group-box',
    'data-component': 'ProfessionSkillPicker/StyledGroupBox'
})`
    background-color: ${({ theme }) => theme.materialDark};
`;

type ChosenSkillPickerProps = {
    profession: IProfession;
};

const ProfessionSkillPicker = ({
    profession, 
}: ChosenSkillPickerProps) => {
    // AJS, use this to indicate when a skill has a subtype that needs to be entered
    const renderSubtypedSkill = (skill: Skill) => {
        return (<div>
            {skill.label} starts at {skill.value} Choose a subtype below.
        </div>);
    };

    const renderProfessionSkills = () => {
        let renderedOutput = null;

        renderedOutput = profession?.professionalSkills.map((skill) => {
            return <div>
                {skill.label} starts at {skill.value}
            </div>;
        });

        return( 
            <StyledGroupBox variant='flat' label='Preset Professional Skills'>
                {renderedOutput} 
            </StyledGroupBox>
        );
    }

    // AJS easy fix, this should all be in ChooseSkills, not this mess
    const renderSkillChoices = () => {
        let renderedOutput = null;
        // AJS pick up here
        if(profession?.choosableSkills.length) {
            renderedOutput = <ChooseSkills profession={profession} />
        }
        return renderedOutput;
    }

    return (
        <PSPContainer>
            <ProfessionalSkillsContainer>
                {renderProfessionSkills()}
            </ProfessionalSkillsContainer>
            <SkillChoiceContainer>
                {renderSkillChoices()}
            </SkillChoiceContainer>
        </PSPContainer>
    );
};

// AJS rename, ProfessionChoices or something
export default ProfessionSkillPicker;