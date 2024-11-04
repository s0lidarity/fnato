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
    const skills: Skills = {
        ...DEFAULT_SKILLS,
        otherSkills: {},
        Crafts: {
            "Macrame": {
                ...DEFAULT_SKILLS.Crafts,
                label: "Crafts (Macrame)",
            }
        },
        ForeignLanguages: {
            "French": {
                ...DEFAULT_SKILLS.ForeignLanguages,
                label: "Foreign Languages (French)",
            }
        }
    };
    return skills;
}