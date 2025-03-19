import { Checkbox } from "react95";
import { Trans } from "@lingui/react/macro";
import { i18n } from "@lingui/core";
import { useState } from "preact/hooks";

import Dialogue from "../../../components/Dialogue/Dialogue";
import { useSkills } from "../../../providers/SkillsContext";
import { Skill } from "../../../types/characterTypes";
import { MAX_DV_SKILLS } from "../../../constants/gameRules";

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
            {/* AJS render checkboxes for user to select up to 4 skills for the dv bonus */}
            <Trans>Select up to 4 skills for the damaged veteran bonus</Trans>
            <div>
                {skills.map(renderSkillCheckbox)}
            </div>
        </Dialogue>
    );
}   