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
    professionalSkills: ProfessionalSkill[];
    recommendedStats: StatisticKeys[];

    constructor(config: {
        affiliation?: string;
        bondCount: number;
        chosenSkillCount: number;
        choosableSkills: ProfessionalSkill[];
        professionalSkills: ProfessionalSkill[];
        recommendedStats: StatisticKeys[];
    }) {
        this.affiliation = config.affiliation || "";
        this.bondCount = config.bondCount;
        this.chosenSkillCount = config.chosenSkillCount;
        this.choosableSkills = config.choosableSkills;
        this.professionalSkills = config.professionalSkills;
        this.recommendedStats = config.recommendedStats;
    };
    
    static createSkill(skillName: keyof Skills, value: number, subType?: string): ProfessionalSkill {
        return new ProfessionalSkill(skillName, value, subType);
    };

    static createSkillList(rawSkills: Array<
        | [keyof Skills, number]            // [skillName, value]
        | [keyof Skills, number, string]    // [skillName, value, subType]
    >): ProfessionalSkill[] {
        return rawSkills.map((skill) => {
            switch (skill.length) {
                case 2:
                    return this.createSkill(skill[0], skill[1]);
                case 3:
                    this.createSkill(skill[0], skill[1], skill[2]);
                    break;
                default:
                    throw new Error('Invalid skill array');
            }
        });
    };
};

export const Anthropologist = new Profession({
    professionalSkills: Profession.createSkillList([
            ['Anthropology', 50],
            ['Bureaucracy', 40],
            ['ForeignLanguages', 50],
            ['ForeignLanguages', 40],
            ['History', 60],
            ['Occult', 40],
            ['Persuade', 40],
    ]),
    choosableSkills: Profession.createSkillList([
        ['Anthropology', 50],
        ['Archeology', 40],
        ['HUMINT', 50],
        ['Navigate', 50],
        ['Search', 60],
        ['Survival', 50],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
});

export const Historian = new Profession({
    professionalSkills: Profession.createSkillList([
        ['Archeology', 50],
        ['Bureaucracy', 40],
        ['History', 60],
        ['Occult', 40],
        ['Persuade', 40]
    ]),
    choosableSkills: Profession.createSkillList([
        ['Anthropology', 50],
        ['HUMINT', 50],
        ['Navigate', 50],
        ['Search', 60],
        ['Survival', 50],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
});

export const Engineer = new Profession({
    professionalSkills: Profession.createSkillList([
        ['ComputerScience', 60],
        ['Crafts', 40, 'Electrician'],
        ['Crafts', 40, 'Mechanic'],
        ['Crafts', 40, 'Microelectronics'],
        ['Science', 40, 'Mathematics'],
        ['SIGINT', 40],   
    ]),
    choosableSkills: Profession.createSkillList([
        ['Accounting', 50],
        ['Bureaucracy', 50],
        ['Crafts', 40],
        ['ForeignLanguages', 40],
        ['HeavyMachinery', 50],
        ['Law', 40],
        ['Science', 40],
    ]),
    bondCount: 3,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
});

export const FederalAgent = new Profession({
    professionalSkills: Profession.createSkillList([
        ['Alertness', 50],
        ['Bureaucracy', 40],
        ['Criminology', 50],
        ['Drive', 50],
        ['Firearms', 50],
        ['Forensics', 30],
        ['HUMINT', 60],
        ['Law', 30],
        ['Persuade', 50],
        ['Search', 50],
        ['UnarmedCombat', 60],
    ]),
    choosableSkills: Profession.createSkillList([
        ['Accounting', 60],
        ['ComputerScience', 50],
        ['ForeignLanguages',  50],
        ['HeavyWeapons', 50],
        ['Pharmacy', 50],
    ]),
    bondCount: 3,
    recommendedStats: ['constitution', 'power', 'charisma'],
    chosenSkillCount: 3,
});

const professions = [
    Anthropologist,
    Historian,
    Engineer,
];

export default professions;