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

const Historian: Profession = {
    affiliation: "",
    professionalSkills: [
        {
            value: 50,
            base: SKILL_BASE_VALUES['Archeology'],
            bonus: false,
        } as Skills['Archeology'],
        {
            value: 40,
            base: SKILL_BASE_VALUES['Bureaucracy'],
            bonus: false,
        } as Skills['Bureaucracy'],
        {
            value: 60,
            base: 0,
            bonus: false,
        } as Skills['History'],
        {
            value: 40,
            base: 0,
            bonus: false,
        } as Skills['Occult'],
        {
            value: 40,
            base: 0,
            bonus: false,
        } as Skills['Persuade'],
    ],
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkills: [
        {
            value: 40,
            base: SKILL_BASE_VALUES['Anthropology'],
            bonus: false,
        } as Skills['Anthropology'],
        {
            value: 50,
            base: SKILL_BASE_VALUES['HUMINT'],
            bonus: false,
        } as Skills['HUMINT'],
        {
            value: 50,
            base: SKILL_BASE_VALUES['Navigate'],
            bonus: false,
        } as Skills['Navigate'],
        {
            value: 60,
            base: SKILL_BASE_VALUES['Search'],
            bonus: false,
        } as Skills['Search'],
        {
            value: 50,
            base: SKILL_BASE_VALUES['Survival'],
            bonus: false,
        } as Skills['Survival'],
    ],
    chosenSkillCount: 2,
    foreignLanguages: {
        "TBD": {
            value: 50,
            base: 0,
            bonus: false,
        },
        "TBD2": {
            value: 40,
            base: 0,
            bonus: false,
        },
    },
    foreignLanguageCount: 2,
};

const Engineer: Profession = {
    affiliation: "",
    professionalSkills: [
        {
            value: 60,
            base: SKILL_BASE_VALUES['ComputerScience'],
            bonus: false,
        } as Skills['ComputerScience'],
        {
            value: 40,
            base: SKILL_BASE_VALUES['Crafts'],
            bonus: false,
        } as Skills['Crafts'],
    ],
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkills: [],
    chosenSkillCount: 2,
}

const professions = [
    Anthropologist,
    Historian,
    Engineer,
];

export default professions;