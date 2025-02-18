import { STAT_REMINDERS } from '../types/characterTypes';
import { createSkillId } from '../utils/Professions';

import { 
    Skills, 
    Statistics, 
    Stat,
    DEFAULT_SKILLS,
    STAT_REMINDER_MSGS,
    STAT_LABEL_MSGS
} from '../types/characterTypes';

export const buildStat = (name: string): Stat => {
    return {
        label: name.charAt(0).toUpperCase() + name.slice(1),
        labelMsg: STAT_LABEL_MSGS[name as keyof typeof STAT_LABEL_MSGS],
        score: 10,
        x5: 50,
        distinguishingFeature: '',
        // AJS: TODO clean up reminderText usage
        reminderText: STAT_REMINDERS[name as keyof typeof STAT_REMINDERS],
        reminderMsg: STAT_REMINDER_MSGS[name as keyof typeof STAT_REMINDER_MSGS],
    };
}

export const defaultStats: Statistics = {
    strength: buildStat('strength'),
    dexterity: buildStat('dexterity'),
    constitution: buildStat('constitution'),
    intelligence: buildStat('intelligence'),
    power: buildStat('power'),
    charisma: buildStat('charisma')
};

export function generateDefaultSkills(): Skills {
    return DEFAULT_SKILLS.map(skill => ({
        ...skill,
        id: createSkillId(skill.name, skill?.subType)
    }));
}