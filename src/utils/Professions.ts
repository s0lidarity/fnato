import { IProfession, Skill, Skills, SKILL_BASE_VALUES, StatisticKeys } from "../types/characterTypes";

type IProfessionalSkill = Skill & { skillName: keyof Skills; subType?: string };

export class ProfessionalSkill implements IProfessionalSkill {
    skillName: keyof Skills;
    value: number;
    bonus: boolean;
    subType?: string;

    constructor(skillName: keyof Skills, value: number, subType?: string){
        this.skillName = skillName;
        this.value = value;
        this.bonus = false;
        this.subType = subType;
    };
};

export class Profession implements IProfession {
    affiliation?: string;
    bondCount: number;
    chosenSkillCount: number;
    choosableSkills: ProfessionalSkill[];
    foreignLanguageCount: number;
    foreignLanguages: { [language: string]: ProfessionalSkill };
    professionalSkills: ProfessionalSkill[];
    recommendedStats: StatisticKeys[];

    constructor(config: {
        affiliation?: string;
        bondCount: number;
        chosenSkillCount: number;
        choosableSkills: ProfessionalSkill[];
        foreignLanguageCount: number;
        professionalSkills: ProfessionalSkill[];
        recommendedStats: StatisticKeys[];
    }) {
        this.affiliation = config.affiliation || "";
        this.bondCount = config.bondCount;
        this.chosenSkillCount = config.chosenSkillCount;
        this.choosableSkills = config.choosableSkills;
        this.foreignLanguageCount = config.foreignLanguageCount;
        this.foreignLanguages = {};
        this.professionalSkills = config.professionalSkills;
        this.recommendedStats = config.recommendedStats;
    };
    
    static createSkill(skillName: keyof Skills, value: number, subType?: string): ProfessionalSkill {
        return new ProfessionalSkill(skillName, value, subType);
    };
};

export const Anthropologist = new Profession({
    professionalSkills: [
        Profession.createSkill('Anthropology', 50),
        Profession.createSkill('Bureaucracy', 40),
        Profession.createSkill('History', 60),
        Profession.createSkill('Occult', 40),
        Profession.createSkill('Persuade', 40),
    ],
    choosableSkills: [
        Profession.createSkill('Anthropology', 50),
        Profession.createSkill('Archeology', 40),
        Profession.createSkill('HUMINT', 50),
        Profession.createSkill('Navigate', 50),
        Profession.createSkill('Search', 60),
        Profession.createSkill('Survival', 50),
    ],
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
    foreignLanguageCount: 2,
});

export const Historian = new Profession({
    professionalSkills: [
        Profession.createSkill('Archeology', 50),
        Profession.createSkill('Bureaucracy', 40),
        Profession.createSkill('History', 60),
        Profession.createSkill('Occult', 40),
        Profession.createSkill('Persuade', 40),
    ],
    choosableSkills: [
        Profession.createSkill('Anthropology', 50),
        Profession.createSkill('HUMINT', 50),
        Profession.createSkill('Navigate', 50),
        Profession.createSkill('Search', 60),
        Profession.createSkill('Survival', 50),
    ],
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
    foreignLanguageCount: 2,
});

export const Engineer = new Profession({
    professionalSkills: [
        Profession.createSkill('ComputerScience', 60),
        Profession.createSkill('Crafts', 40, 'Electrician'),
        Profession.createSkill('Crafts', 40, 'Mechanic'),
        Profession.createSkill('Crafts', 40, 'Microelectronics'),
        Profession.createSkill('Science', 40, 'Mathematics'),
        Profession.createSkill('SIGINT', 40),   
    ],
    choosableSkills: [
        Profession.createSkill('Accounting', 50),
        Profession.createSkill('Bureaucracy', 50),
        Profession.createSkill('Crafts', 40, 'TBD'),
        Profession.createSkill('foreignLanguages', 40, 'TBD'),
        Profession.createSkill('HeavyMachinery', 50),
        Profession.createSkill('Law', 40),
        Profession.createSkill('Science', 40, 'TBD'),
    ],
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
    foreignLanguageCount: 2,
});

const professions = [
    Anthropologist,
    Historian,
    Engineer,
];

export default professions;