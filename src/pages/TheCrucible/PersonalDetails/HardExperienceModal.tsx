import { Button, Checkbox } from "react95";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";
import { i18n } from "@lingui/core";
import styled from "styled-components";
import { IoMdSave } from "react-icons/io";

import Dialogue from "../../../components/Dialogue/Dialogue";
import { useSkills } from "../../../providers/SkillsContext";
import { Skill } from "../../../types/characterTypes";
import { useDamagedVeteran } from "../../../providers/DamagedVeteranContext";
import { MAX_HARDENED_VETERAN_SKILLS } from "../../../constants/gameRules";

const StyledCheckboxContainer = styled.div.attrs<any>({
    'data-testid': 'dv-checkbox-container',
    'data-component': 'HardExperienceModal/CheckboxContainer'
})`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;

const StyledButtonContainer = styled.div.attrs<any>({
    'data-testid': 'dv-button-container',
    'data-component': 'HardExperienceModal/ButtonContainer'
})`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
`;

const StyledClearButton = styled(Button).attrs<any>({
    'data-testid': 'dv-clear-button',
    'data-component': 'HardExperienceModal/ClearButton'
})`
    gap: 0.5rem;
`;

export default function HardExperienceModal({ 
    show, 
    setShow, 
    onConfirm 
}: { 
    show: boolean, 
    setShow: (show: boolean) => void,
    onConfirm?: () => void
}) {

    const { skills } = useSkills();
    const { selectedHardExperienceSkills: selectedDVSkills, selectSkillsForTemplate } = useDamagedVeteran();

    const handleToggle = (skill: Skill) => {
        if(skill.id === "occult") {
            console.error("Occult skill should not be selectable in the Hard Experience modal");
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
            title={t`Hard Experience Skill Selection`}
            show={show}
            setShow={setShow}
        >
            <Trans>Select up to {MAX_HARDENED_VETERAN_SKILLS} skills for the Hard Experience bonus</Trans>
            <StyledCheckboxContainer>
                {skills.map(renderSkillCheckbox)}
            </StyledCheckboxContainer>
            <StyledButtonContainer>
                <StyledClearButton onClick={() => {
                    if (onConfirm) {
                        onConfirm();
                    } else {
                        setShow(false);
                    }
                }}>
                    <Trans>Save Hardened Skills</Trans>
                    <IoMdSave />  
                </StyledClearButton>
            </StyledButtonContainer>
        </Dialogue>
    );
}   