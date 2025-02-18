import { i18n } from '@lingui/core';
import { DEFAULT_SKILLS, Skill } from '../../../../types/characterTypes';

export const generateSkillLabel = (skill: Skill): string => {
    const label = i18n._(skill.labelMsg);
        if (skill.subType && skill.subTypeMsg) {
            if(skill.subTypeMsg){
                if(skill.subType === DEFAULT_SKILLS.find(s => s.id === skill.id)?.subType){
                    return `${label} (${i18n._(skill.subTypeMsg)})`;
                }
                else{
                    return `${label} (${skill.subType})`;
                }
            }
        }
        return label;
};
