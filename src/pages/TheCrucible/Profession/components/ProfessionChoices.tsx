import styled from 'styled-components';
import { GroupBox } from 'react95';

import ChooseSkills from './ChooseSkills';
import { IProfession, Skill } from '../../../../types/characterTypes';


const PCContainer = styled.div.attrs<any>({
    'data-testid': 'profession-choices--container',
    'data-component': 'ProfessionChoices/PSPContainer'
})`
    width: 95%;
    margin-top: 1.5rem;
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
`;

const ProfessionalSkillsContainer = styled.div.attrs<any>({
    'data-testid': 'professional-skills-container',
    'data-component': 'ProfessionChoices/ProfessionalSkillsContainer'
})`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    flex: 1;
`;

const SkillChoiceContainer = styled.div.attrs<any>({
    'data-testid': 'profession-choices-skill-choice-container',
    'data-component': 'ProfessionChoices/SkillChoiceContainer'
})`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const StyledGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'profession-choices-group-box',
    'data-component': 'ProfessionChoices/StyledGroupBox'
})`
    background-color: ${({ theme }) => theme.materialDark};
`;

type ChosenSkillPickerProps = {
    profession: IProfession;
};

// AJS make this a function instead of a const to make style consistent
const ProfessionChoices = ({
    profession, 
}: ChosenSkillPickerProps) => {

    const renderProfessionSkills = () => {
        let renderedOutput = null;

        renderedOutput = profession?.professionalSkills.map((skill) => {
            return <div>
                {skill.label} {skill.subType ? ` (${skill.subType})` : ''} starts at {skill.value}
            </div>;
        });

        return( 
            <StyledGroupBox variant='flat' label='Preset Professional Skills'>
                {renderedOutput} 
            </StyledGroupBox>
        );
    }

    return (
        <PCContainer>
            <ProfessionalSkillsContainer>
                {renderProfessionSkills()}
            </ProfessionalSkillsContainer>
            <SkillChoiceContainer>
                <ChooseSkills profession={profession} />
            </SkillChoiceContainer>
        </PCContainer>
    );
};

export default ProfessionChoices;