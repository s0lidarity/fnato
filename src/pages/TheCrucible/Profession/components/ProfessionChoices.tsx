import styled from 'styled-components';
import { GroupBox } from 'react95';
import { Trans } from '@lingui/react';
import { t } from '@lingui/core/macro';

import ChooseSkills from './ChooseSkills';
import { useSkills } from '../../../../providers/SkillsContext';


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

function ProfessionChoices() {

    const renderProfessionSkills = () => {
        const { profession } = useSkills();
        let renderedOutput = null;

        renderedOutput = profession?.professionalSkills.map((skill) => {
            return <div>
                <Trans id={skill.labelMsg.id} /> {skill.subType ? <Trans id={skill.subTypeMsg.id}/> : ''} {t`starts at`} {skill.value}
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
                <ChooseSkills />
            </SkillChoiceContainer>
        </PCContainer>
    );
};

export default ProfessionChoices;