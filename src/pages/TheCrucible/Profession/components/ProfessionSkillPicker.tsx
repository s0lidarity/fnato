import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Button, Checkbox, GroupBox } from 'react95';


import { IProfession, Skill } from '../../../../types/characterTypes';


const PSPContainer = styled.div`
    width: 95%;
    margin-bottom: 1rem;
`;

type ChosenSkillPickerProps = {
    profession: IProfession;
};

const ProfessionSkillPicker = ({
    profession, 
}: ChosenSkillPickerProps) => {
    // need to track chosen skills and remaining choices
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [remainingChoices, setRemainingChoices] = useState(profession?.chosenSkillCount || 0);

    const renderSubtypedSkill = (skill: Skill) => {
        return (<div>
            {skill.label} starts at {skill.value} Choose a subtype below.
        </div>);
    };
    // we need to be able to handle subtyped skills, choosing a foreign language or science for example
    const renderProfessionSkills = () => {
        let renderedOutput = null;

        renderedOutput = profession?.professionalSkills.map((skill) => {
            return <div>
                {skill.label} starts at {skill.value}
            </div>;
        });

        return renderedOutput;
    }

    return (
        <PSPContainer>
            {renderProfessionSkills()}
        </PSPContainer>
    );
};

// AJS rename to ProfessionSkillPicker
export default ProfessionSkillPicker;