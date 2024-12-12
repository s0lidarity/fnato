import { 
    DEFAULT_SKILLS,
    IProfession, 
    Skill, 
    StatisticKeys 
} from "../types/characterTypes";

// Add this utility function to standardize skill ID creation
const createSkillId = (name: string, subType?: string): string => {
    const baseId = name.toLowerCase().replace(/\s+/g, '-');
    return subType ? `${baseId}-${subType.toLowerCase().replace(/\s+/g, '-')}` : baseId;
};

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
    
    static createSkill(name: string, value: number, subType?: string): Skill {
        const formattedName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const defaultSkill = DEFAULT_SKILLS.find(s => s.name === formattedName);
        if (!defaultSkill) {
            console.warn(`No default skill found for ${name} / ${formattedName}`);
        }
        
        const skillId = createSkillId(name, subType);
        
        const newSkill: Skill = {
            id: skillId,
            name: formattedName,
            value: value,
            bonus: 0,
            label: defaultSkill?.label || name.charAt(0).toUpperCase() + name.slice(1),
            reminderText: defaultSkill?.reminderText,
            subType: subType,
        };
        return newSkill;
    };

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
        ['HUMINT', 50],
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
        ['HUMINT', 50],
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
        ['SIGINT', 40],   
    ]),
    choosableSkills: Profession.createSkillList([
        ['accounting', 50],
        ['bureaucracy', 50],
        ['crafts', 40, 'Pottery'],
        ['foreign-languages', 40, 'French'],
        ['heavy-machinery', 50],
        ['law', 40],
        ['science', 40, 'Biology'],
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
        ['HUMINT', 60],
        ['law', 30],
        ['persuade', 50],
        ['search', 50],
        ['unarmed-combat', 60],
    ]),
    choosableSkills: Profession.createSkillList([
        ['accounting', 60],
        ['computer-science', 50],
        ['foreign-languages', 50, 'French'],
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
        ['science', 50, 'Chemistry'],
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
        ['science', 60, 'Biology'],
        ['science', 50, 'Chemistry'], 
        ['science', 50, 'Physics'],
    ]),
    choosableSkills: Profession.createSkillList([
        ['accounting', 50],
        ['crafts', 40, 'Pottery'],
        ['foreign-languages', 40, 'French'], 
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
        ['crafts', 40, 'Pottery'],
        ['demolitions', 40],
        ['foreign-languages', 40, 'French'],
        ['heavy-machinery', 50],
        ['heavy-weapons', 40],
        ['search', 60],
        ['SIGINT', 40], 
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