import { Skill } from "../../../../types/characterTypes"
export function getSkillNameText(skill: Skill) {
    if(skill.subType) {
        return `${skill.label} (${skill.subType})`;
    }
    return skill.label;
}