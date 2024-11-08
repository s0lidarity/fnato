import styled from 'styled-components';

import ChooseSkills from './ChooseSkills';
import { IProfession, Skill } from '../../../../types/characterTypes';


const PSPContainer = styled.div`
    width: 95%;
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
`;

const ProfessionalSkillsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    flex: 1;
`;

const SkillChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

type ChosenSkillPickerProps = {
    profession: IProfession;
};

const ProfessionSkillPicker = ({
    profession, 
}: ChosenSkillPickerProps) => {
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

        return renderedOutput;
    }

    // AJS, this should all be in ChooseSkills, not this mess
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