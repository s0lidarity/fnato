import { v4 as uuidv4 } from 'uuid';

import { 
    Skill, 
    Skills, 
    Statistics, 
    Stat,
    DEFAULT_SKILLS
} from '../types/characterTypes';

export const defaultStat: Stat = {
    score: 10,
    x5: 50,
    distinguishingFeature: ''
};

export const defaultStats: Statistics = {
    strength: defaultStat,
    dexterity: defaultStat,
    constitution: defaultStat,
    intelligence: defaultStat,
    power: defaultStat,
    charisma: defaultStat,
};

export function generateSkillLabel(skill: Skill) {
    if(skill.subType) {
        return `${skill.label} (${skill.subType})`;
    }
    return skill.label;
}

export function generateDefaultSkills(): Skills {
    return DEFAULT_SKILLS.map(skill => ({
        ...skill,
        id: uuidv4()
    }));
}