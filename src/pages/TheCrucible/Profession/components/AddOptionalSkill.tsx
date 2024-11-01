import { useState } from "preact/hooks";
import styled from "styled-components";
import { IoAddSharp } from "react-icons/io5";
import { Button } from "react95";

import { useSkills } from "../../../../providers/SkillsContext";
import Dialogue from "../../../../components/Dialogue/Dialogue";

const AddOptionalSkillContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AddOptionalSkill = () => {
    const [show, setShow] = useState(false);

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
                <div>
                    <h3>Skill Name</h3>
                </div>
            </Dialogue>
        </>
    );
};