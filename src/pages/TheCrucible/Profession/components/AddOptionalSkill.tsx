import { useState } from "preact/hooks";
import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { TextInput, Button } from "react95";

import { useSkills } from "../../../../providers/SkillsContext";
import Dialogue from "../../../../components/Dialogue/Dialogue";

// AJS starting point, unfinished feature

const AddOptionalSkillContainer = styled.div.attrs<any>({
    'data-component': 'AddOptionalSkill/AddOptionalSkillContainer',
    'data-testid': 'add-optional-skill-container',
})`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AddOptionalSkill = () => {
    const [show, setShow] = useState(false);
    const [skillName, setSkillName] = useState('');
    const { skills  } = useSkills();

    const handleAddSkill = () => {
        // check if skillName is already in skills
    };

    return (
        <>
            <AddOptionalSkillContainer>
                <Button onClick={() => setShow(true)}>
                    <IoAddSharp />
                </Button>
            </AddOptionalSkillContainer>
            <Dialogue
                show={show}
                setShow={setShow}
                title="Add Optional Skill"
            >
                <form>
                    <div>
                        <label>Skill Name</label>
                        <TextInput
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                        />
                    </div>
                </form>
                <Button onClick={handleAddSkill}><IoAddSharp /></Button>
            </Dialogue>
        </>
    );
};

export default AddOptionalSkill;