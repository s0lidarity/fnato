import { useState } from "preact/hooks";
import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { Button, TextInput } from "react95";

import { useSkills } from "../../../../providers/SkillsContext";
import Dialogue from "../../../../components/Dialogue/Dialogue";

const AddOptionalSkillContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AddOptionalSkill = () => {
    const [show, setShow] = useState(false);
    const [skillName, setSkillName] = useState('');
    const { skills,  } = useSkills();

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