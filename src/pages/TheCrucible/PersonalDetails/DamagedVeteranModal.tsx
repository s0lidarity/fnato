import { Button, Checkbox } from "react95";
import { Trans } from "@lingui/react/macro";
import { i18n } from "@lingui/core";
import { useState } from "preact/hooks";
import styled from "styled-components";
import { IoMdSave } from "react-icons/io";

import Dialogue from "../../../components/Dialogue/Dialogue";
import { useSkills } from "../../../providers/SkillsContext";
import { Skill } from "../../../types/characterTypes";
import { MAX_DV_SKILLS } from "../../../constants/gameRules";

const StyledCheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'dv-checkbox-container',
    'data-component': 'DamagedVeteranModal/CheckboxContainer'
})`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`;

const StyledButtonContainer = styled.div.attrs<any>({
    'data-testid': 'dv-button-container',
    'data-component': 'DamagedVeteranModal/ButtonContainer'
})`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export default function DamagedVeteranModal({ show, setShow }: { show: boolean, setShow: (show: boolean) => void }) {

    const { skills } = useSkills();
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

    const handleToggle = (skill: Skill) => {
        console.log("toggled", skill);
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else if (selectedSkills.length < MAX_DV_SKILLS) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const renderSkillCheckbox = (skill: Skill) => {
        return (
            <Checkbox
                key={skill.id}
                label={i18n._(skill.labelMsg)}
                checked={selectedSkills.includes(skill)}
                onChange={() => handleToggle(skill)}
            />
        )
    }

    return (
        <Dialogue
            title="Damaged Veteran"
            show={show}
            setShow={setShow}
        >
            <Trans>Select up to 4 skills for the damaged veteran bonus</Trans>
            <StyledCheckboxContainer>
                {skills.map(renderSkillCheckbox)}
            </StyledCheckboxContainer>
            <Button onClick={() => {
                setShow(false);
            }}>
                <Trans>Save Hardened Skills</Trans>
                <StyledButtonContainer>
                <IoMdSave />
                </StyledButtonContainer>
            </Button>
        </Dialogue>
    );
}   