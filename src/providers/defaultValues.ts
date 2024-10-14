import { Statistics, Stat } from '../types/characterTypes';

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