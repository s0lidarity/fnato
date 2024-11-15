import { v4 as uuidv4 } from 'uuid';
import { STAT_REMINDERS } from '../types/characterTypes';

import { 
    Skills, 
    Statistics, 
    Stat,
    DEFAULT_SKILLS
} from '../types/characterTypes';

export const buildStat = (name: string): Stat => {
    return {
        label: name.charAt(0).toUpperCase() + name.slice(1),
        score: 10,
        x5: 50,
        distinguishingFeature: '',
        reminderText: STAT_REMINDERS[name as keyof typeof STAT_REMINDERS],
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
        id: uuidv4()
    }));
}