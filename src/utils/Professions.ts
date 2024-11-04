import { 
    IProfession, 
    Skill, 
    Skills, 
    StatisticKeys 
} from "../types/characterTypes";

type IProfessionalSkill = Skill & { skillName: keyof Skills; subType?: string };

export class ProfessionalSkill implements IProfessionalSkill {
    skillName: keyof Skills;
    value: number;
    bonus: number;
    subType?: string;

    constructor(skillName: keyof Skills, value: number, subType?: string){
        this.skillName = skillName;
        this.value = value;
        this.bonus = 0;
        this.subType = subType;
    };
};

export class Profession implements IProfession {
    name: string;
    affiliation?: string;
    bondCount: number;
    chosenSkillCount: number;
    choosableSkills: ProfessionalSkill[];
    professionalSkills: ProfessionalSkill[];
    recommendedStats: StatisticKeys[];

    constructor(config: {
        name: string;
        affiliation?: string;
        bondCount: number;
        chosenSkillCount: number;
        choosableSkills: ProfessionalSkill[];
        professionalSkills: ProfessionalSkill[];
        recommendedStats: StatisticKeys[];
    }) {
        this.name = config.name;
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
    name: 'Anthropologist',
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
    name: 'Historian',
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
    name: 'Engineer',
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
    name: 'Federal Agent',
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

export const Physician = new Profession({
    name: 'Physician',
    professionalSkills: Profession.createSkillList([
        ['Bureaucracy', 50], 
        ['FirstAid', 60],
        ['Medicine', 60],
        ['Persuade', 40],
        ['Pharmacy', 50],
        ['Science', 60, 'Biology'], 
        ['Search', 40],
    ]),
    choosableSkills: Profession.createSkillList([
        ['Forensics', 50],
        ['Psychotherapy', 60],
        ['Science', 50],
        ['Surgery', 50],
    ]),
    bondCount: 3,
    recommendedStats: ['intelligence', 'power', 'dexterity'],
    chosenSkillCount: 2,
});

export const Scientist = new Profession({
    name: 'Scientist',
    professionalSkills: Profession.createSkillList([
        ['Bureaucracy', 40],
        ['ComputerScience', 40],
        ['Science', 60],
        ['Science', 50], 
        ['Science', 50],
    ]),
    choosableSkills: Profession.createSkillList([
        ['Accounting', 50],
        ['Crafts', 40],
        ['ForeignLanguages', 40], 
        ['Forensics', 40],
        ['Law', 40],
        ['Pharmacy', 40],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 3,
});

export const SpecialOperator = new Profession({
    name: 'Special Operator',
    professionalSkills: Profession.createSkillList([
        ['Alertness', 60],
        ['Athletics', 60],
        ['Demolitions', 40],
        ['Firearms', 60],
        ['HeavyWeapons', 50],
        ['MeleeWeapons', 50],
        ['MilitaryScience', 60, 'Land'], 
        ['Navigate', 50],
        ['Stealth', 50],
        ['Survival', 50],
        ['Swim', 50],
        ['UnarmedCombat', 60],
    ]),
    choosableSkills: [],
    bondCount: 2,
    recommendedStats: ['strength', 'constitution', 'power'],
    chosenSkillCount: 0,
});

export const Soldier = new Profession({
    name: 'Soldier',
    professionalSkills: Profession.createSkillList([
        ['Alertness', 50],
        ['Athletics', 50],
        ['Bureaucracy', 30],
        ['Drive', 40],
        ['Firearms', 40],
        ['FirstAid', 40],
        ['MilitaryScience', 40, 'Land'],
        ['Navigate', 40],
        ['Persuade', 30],
        ['UnarmedCombat', 50],
    ]),
    choosableSkills: Profession.createSkillList([
        ['Artillery', 40],
        ['ComputerScience', 40],
        ['Crafts', 40],
        ['Demolitions', 40],
        ['ForeignLanguages', 40],
        ['HeavyMachinery', 50],
        ['HeavyWeapons', 40],
        ['Search', 60],
        ['SIGINT', 40], 
        ['Swim', 60],
    ]),
    bondCount: 4,
    recommendedStats: ['strength', 'constitution'],
    chosenSkillCount: 3,
});

// base professions, can break out 
const professions = [
    Anthropologist,
    Historian,
    Engineer,
    FederalAgent,
    Physician,
    Scientist,
    SpecialOperator,
    Soldier,
];

export default professions;