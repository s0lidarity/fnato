import { Button, Checkbox } from "react95";
import { Trans } from "@lingui/react/macro";
import { i18n } from "@lingui/core";
import styled from "styled-components";
import { IoMdSave } from "react-icons/io";

import Dialogue from "../../../components/Dialogue/Dialogue";
import { useSkills } from "../../../providers/SkillsContext";
import { Skill } from "../../../types/characterTypes";
import { MAX_HARDENED_VETERAN_SKILLS } from "../../../constants/gameRules";
import { useDamagedVeteran } from "../../../providers/DamagedVeteranContext";

const StyledCheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'dv-checkbox-container',
    'data-component': 'DamagedVeteranModal/CheckboxContainer'
})`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
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
    const { selectedDVSkills, selectSkillsForTemplate } = useDamagedVeteran();

    const handleToggle = (skill: Skill) => {
        if(skill.id === "occult") {
            console.error("Occult skill should not be selectable in the hardened veteran modal");
            return;
        }


        console.log("toggled", skill);
        console.log("selectedDVSkills", selectedDVSkills);
        selectSkillsForTemplate(skill.id, selectedDVSkills);
    };

    const renderSkillCheckbox = (skill: Skill) => {
        // Users cannot increase Unnatural skill via the hardened veteran template
        if(skill.id === "unnatural") return null;

        // occult is already selected by default and cannot be deselected with the hardened veteran template
        return (
            <Checkbox
                key={skill.id}
                label={i18n._(skill.labelMsg)}
                checked={selectedDVSkills.includes(skill.id) || skill.id === "occult"}
                disabled={skill.id === "occult"}
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