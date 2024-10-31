import { 
    Skill, 
    SKILL_BASE_VALUES, 
    SKILL_REMINDERS, 
    Skills, 
    Statistics, 
    Stat,
    SKILL_SUBTYPES
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

export function generateDefaultSkills(): Skills {
    const skills: Skills = {} as Skills;
    Object.keys(SKILL_BASE_VALUES).forEach((skillName) => {
        skills[skillName] = {
            value: SKILL_BASE_VALUES[skillName],
            bonus: 0,
            reminderText: SKILL_REMINDERS[skillName],
            subType: SKILL_SUBTYPES[skillName],
        };
    });
    return skills;
}