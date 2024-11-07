import { 
    DEFAULT_SKILLS,
    IProfession, 
    Skill, 
    StatisticKeys 
} from "../types/characterTypes";

export class Profession implements IProfession {
    name: string;
    affiliation?: string;
    bondCount: number;
    chosenSkillCount: number;
    choosableSkills: Skill[];
    professionalSkills: Skill[];
    recommendedStats: StatisticKeys[];

    constructor(config: {
        name: string;
        affiliation?: string;
        bondCount: number;
        chosenSkillCount: number;
        choosableSkills: Skill[];
        professionalSkills: Skill[];
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
    
    static createSkill(id: string, value: number, subType?: string): Skill {
        const defaultSkill = DEFAULT_SKILLS.find(s => s.id === id);
        const newSkill: Skill = {
            id: id,
            name: defaultSkill.name,
            value: value,
            bonus: 0,
            label: defaultSkill.label,
            reminderText: defaultSkill.reminderText,
            subType: subType,
        };
        return newSkill;
    };

    // AJS createSkillList is not creating subtyped skills properlys
    static createSkillList(rawSkills: Array<
        | [string, number]            // [skillName, value]
        | [string, number, string]    // [skillName, value, subType]
    >): Skill[] {
        return rawSkills.map((skill) => {
            switch (skill.length) {
                case 2:
                    return this.createSkill(skill[0], skill[1]);
                case 3:
                    return this.createSkill(skill[0], skill[1], skill[2]);
                default:
                    throw new Error('Invalid skill array');
            }
        });
    };
};

export const Anthropologist = new Profession({
    name: 'Anthropologist',
    professionalSkills: Profession.createSkillList([
            ['anthropology', 50],
            ['bureaucracy', 40],
            ['foreign-languages', 50, 'French'],
            ['foreign-languages', 40, 'German'],
            ['history', 60],
            ['occult', 40],
            ['persuade', 40],
    ]),
    choosableSkills: Profession.createSkillList([
        ['anthropology', 50],
        ['archeology', 40],
        ['humint', 50],
        ['navigate', 50],
        ['search', 60],
        ['survival', 50],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
});

export const Historian = new Profession({
    name: 'Historian',
    professionalSkills: Profession.createSkillList([
        ['archeology', 50],
        ['bureaucracy', 40],
        ['history', 60],
        ['occult', 40],
        ['persuade', 40]
    ]),
    choosableSkills: Profession.createSkillList([
        ['anthropology', 50],
        ['humint', 50],
        ['navigate', 50],
        ['search', 60],
        ['survival', 50],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
});

export const Engineer = new Profession({
    name: 'Engineer',
    professionalSkills: Profession.createSkillList([
        ['computer-science', 60],
        ['crafts', 40, 'Electrician'],
        ['crafts', 40, 'Mechanic'],
        ['crafts', 40, 'Microelectronics'],
        ['science', 40, 'Mathematics'],
        ['sigint', 40],   
    ]),
    choosableSkills: Profession.createSkillList([
        ['accounting', 50],
        ['bureaucracy', 50],
        ['crafts', 40],
        ['foreign-languages', 40],
        ['heavy-machinery', 50],
        ['law', 40],
        ['science', 40],
    ]),
    bondCount: 3,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 2,
});

export const FederalAgent = new Profession({
    name: 'Federal Agent',
    professionalSkills: Profession.createSkillList([
        ['alertness', 50],
        ['bureaucracy', 40],
        ['criminology', 50],
        ['drive', 50],
        ['firearms', 50],
        ['forensics', 30],
        ['humint', 60],
        ['law', 30],
        ['persuade', 50],
        ['search', 50],
        ['unarmed-combat', 60],
    ]),
    choosableSkills: Profession.createSkillList([
        ['accounting', 60],
        ['computer-science', 50],
        ['foreign-languages', 50],
        ['heavy-weapons', 50],
        ['pharmacy', 50],
    ]),
    bondCount: 3,
    recommendedStats: ['constitution', 'power', 'charisma'],
    chosenSkillCount: 3,
});

export const Physician = new Profession({
    name: 'Physician',
    professionalSkills: Profession.createSkillList([
        ['bureaucracy', 50], 
        ['first-aid', 60],
        ['medicine', 60],
        ['persuade', 40],
        ['pharmacy', 50],
        ['science', 60, 'Biology'], 
        ['search', 40],
    ]),
    choosableSkills: Profession.createSkillList([
        ['forensics', 50],
        ['psychotherapy', 60],
        ['science', 50],
        ['surgery', 50],
    ]),
    bondCount: 3,
    recommendedStats: ['intelligence', 'power', 'dexterity'],
    chosenSkillCount: 2,
});

export const Scientist = new Profession({
    name: 'Scientist',
    professionalSkills: Profession.createSkillList([
        ['bureaucracy', 40],
        ['computer-science', 40],
        ['science', 60],
        ['science', 50], 
        ['science', 50],
    ]),
    choosableSkills: Profession.createSkillList([
        ['accounting', 50],
        ['crafts', 40],
        ['foreign-languages', 40], 
        ['forensics', 40],
        ['law', 40],
        ['pharmacy', 40],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence'],
    chosenSkillCount: 3,
});

export const SpecialOperator = new Profession({
    name: 'Special Operator',
    professionalSkills: Profession.createSkillList([
        ['alertness', 60],
        ['athletics', 60],
        ['demolitions', 40],
        ['firearms', 60],
        ['heavy-weapons', 50],
        ['melee-weapons', 50],
        ['military-science', 60, 'Land'], 
        ['navigate', 50],
        ['stealth', 50],
        ['survival', 50],
        ['swim', 50],
        ['unarmed-combat', 60],
    ]),
    choosableSkills: [],
    bondCount: 2,
    recommendedStats: ['strength', 'constitution', 'power'],
    chosenSkillCount: 0,
});

export const Soldier = new Profession({
    name: 'Soldier',
    professionalSkills: Profession.createSkillList([
        ['alertness', 50],
        ['athletics', 50],
        ['bureaucracy', 30],
        ['drive', 40],
        ['firearms', 40],
        ['first-aid', 40],
        ['military-science', 40, 'Land'],
        ['navigate', 40],
        ['persuade', 30],
        ['unarmed-combat', 50],
    ]),
    choosableSkills: Profession.createSkillList([
        ['artillery', 40],
        ['computer-science', 40],
        ['crafts', 40],
        ['demolitions', 40],
        ['foreign-languages', 40],
        ['heavy-machinery', 50],
        ['heavy-weapons', 40],
        ['search', 60],
        ['sigint', 40], 
        ['swim', 60],
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