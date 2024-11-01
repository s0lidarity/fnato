import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { Button,Checkbox, GroupBox } from 'react95';
import { IoCheckmarkSharp } from 'react-icons/io5';

import Dialogue from '../../../../components/Dialogue/Dialogue';
import { Skill } from '../../../../types/characterTypes';


type ChosenSkillPickerProps = {
    chosenSkills: Skill[];
    count: number;
};

const ChosenSkillPicker = ({chosenSkills, count}: ChosenSkillPickerProps) => {
    const [show, setShow] = useState(true);
    // need to track chosen skills and remaining choices
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [remainingChoices, setRemainingChoices] = useState(count);

    const toggleSelectedSkill = (skill: Skill) => {
        setSelectedSkills((prevSkills) => prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill]);
    };
    // AJS cannot just be checkboxes, need to account for adding optional skills, subytpe skills, foreignLanguages
    const renderSkillCheckboxes = () => {
        return chosenSkills.map((skill) => {
            return <Checkbox 
                label={`${skill.label} (${skill.value})`} 
                name="ChosenSkills"
                value={skill.value}
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSelectedSkill(skill)}
            />;
        });
    };

    // probably not a dialogue, maybe a form
    return (
        
        <Dialogue
            title={`Choose ${count} Skills`}
            show={show}
            setShow={setShow}
        >
            <GroupBox>
                {renderSkillCheckboxes()}
            </GroupBox>
            <Button onClick={() => setShow(false)}>
                <IoCheckmarkSharp />
            </Button>
        </Dialogue>
    );
};

export default ChosenSkillPicker;