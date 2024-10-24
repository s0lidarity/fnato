import { Profession, Skill, Skills, SKILL_BASE_VALUES } from "../types/characterTypes";

export const professions: { [key: string]: Profession } = {
    "Anthropologist": {
        affiliation: "",
        professionalSkills: [
            {
                value: 50,
                base: SKILL_BASE_VALUES['Anthropology'],
                bonus: false,
            } as Skills['Anthropology'],
            {
                value: 40,
                base: SKILL_BASE_VALUES['Bureaucracy'],
                bonus: false,
            } as Skills['Bureaucracy'],
            {
                value: 50,
                base: 0,
                bonus: false,
            } as Skills['Foreign Language'],
        ],
        bondCount: 4,
        recommendedStats: ['intelligence'],
        chosenSkills: [],
        chosenSkillCount: 2,
    },
};