import { 
    DEFAULT_SKILLS,
    IProfession, 
    Skill, 
    StatisticKeys 
} from "../types/characterTypes";

// Export the createSkillId function
export const createSkillId = (name: string, subType?: string): string => {
    const baseId = name.toLowerCase().replace(/\s+/g, '-');
    return subType ? `${baseId}-${subType.toLowerCase().replace(/\s+/g, '-')}` : baseId;
};

export class Profession implements IProfession {
    name: string;
    flavorText?: string;
    affiliation?: string;
    bondCount: number;
    chosenSkillCount: number;
    choosableSkills: Skill[];
    professionalSkills: Skill[];
    recommendedStats: StatisticKeys[];

    constructor(config: {
        name: string;
        flavorText?: string;
        affiliation?: string;
        bondCount: number;
        chosenSkillCount: number;
        choosableSkills: Skill[];
        professionalSkills: Skill[];
        recommendedStats: StatisticKeys[];
    }) {
        this.name = config.name;
        this.flavorText = config.flavorText;
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
    flavorText: 'You study humanity. You’re concerned with the patterns that emerge over time, across land masses, cultures, and language groups. You might be a number-cruncher, a field worker trudging through the jungle, a consultant in a war zone, or a think-tank analyst sifting myth from history in studies of the Tcho-Tcho peoples.',
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
    flavorText: 'You study history. You’re concerned with the patterns that emerge over time, across land masses, cultures, and language groups. You might be a number-cruncher, a field worker trudging through the jungle, a consultant in a war zone, or a think-tank analyst sifting myth from history in studies of the Tcho-Tcho peoples.',
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
    flavorText: 'Computers and machinery are the backbone of modern industry. You are a craftsman with data or machinery, possibly for the government and most definitely for profit. However you use your skills, the overlap between information technology and awareness of the unnatural could make this the most dangerous job on the planet.',
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
    flavorText: 'Many Delta Green Agents are federal law enforcement officers, mostly from the FBI. Delta Green decided long ago that federal agents have the optimum balance of skills and mental stability needed to confront the unnatural.',
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
    flavorText: 'Doctors are often the first to uncover signs of an unnatural incursion, and the most valuable investigators of its disastrous effects on humanity.',
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
    flavorText: 'You expand human knowledge in a field such as biology, physics, or chemistry. When certain forms of knowledge cause insanity and death, it’s easy to conclude that some hypotheses should not be tested.',
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
    flavorText: 'As part of a force like the U.S. Army Rangers, you volunteered for a more difficult path than other soldiers. You’ve spent years in the most grueling training on the planet, and now serve on the most dangerous missions around.',
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
    flavorText: '',
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

// base professions, can break out from nested menu?
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

export const Criminal = new Profession({
    name: 'Criminal',
    flavorText: 'So much is illegal that there are broad economies of crime. This profile fits a hardened militant or a traditional “black collar” criminal: pimp, burglar, extortionist, or thug. If you want a white-collar criminal, choose Computer Scientist or Business Executive and make very risky decisions.',
    professionalSkills: Profession.createSkillList([
        ['alertness', 50],
        ['athletics', 50],
        ['criminology', 60],
        ['dodge', 40],
        ['drive', 50],
        ['firearms', 40],
        ['law', 20],
        ['melee-weapons', 40],
        ['persuade', 50],
        ['stealth', 50],
        ['unarmed-combat', 50],
    ]),
    choosableSkills: Profession.createSkillList([
        ['craft', 40, 'Locksmithing'],
        ['demolitions', 40],
        ['disguise', 50],
        ['foreign-languages', 40, 'French'],
        ['forensics', 40],
        ['HUMINT', 50],
        ['navigate', 50],
        ['occult', 50],
        ['pharmacy', 40],
    ]),
    bondCount: 4,
    recommendedStats: ['strength', 'dexterity'],
    chosenSkillCount: 2,
});

// Firefighter
// Your job oscillates between the tedium of maintaining your
// gear, exhilaration when the alarm finally comes, and the
// work of investigating a scene after the smoke has cleared. If
// you’re involved with Delta Green, you clearly stumbled into
// something worse than a house fire.
// RECOMMENDED STATS: STR, DEX, CON
// PROFESSIONAL SKILLS:
// » Alertness 50%
// » Athletics 60%
// » Craft (Electrician) 40%
// » Craft (Mechanic) 40%
// » Demolitions 50%
// » Drive 50%
// » First Aid 50%
// » Forensics 40%
// » Heavy Machinery 50%
// » Navigate 50%
// » Search 40%
// BONDS: 3

export const Firefighter = new Profession({
    name: 'Firefighter',
    flavorText: 'Your job oscillates between the tedium of maintaining your gear, exhilaration when the alarm finally comes, and the work of investigating a scene after the smoke has cleared. If you’re involved with Delta Green, you clearly stumbled into something worse than a house fire.',
    professionalSkills: Profession.createSkillList([
        ['alertness', 50],
        ['athletics', 60],
        ['craft', 40, 'Electrician'],
        ['craft', 40, 'Mechanic'],
        ['demolitions', 50],
        ['drive', 50],
        ['first-aid', 50],
        ['forensics', 40],
        ['heavy-machinery', 50],
        ['navigate', 50],
        ['search', 40],
    ]),
    bondCount: 3,
    recommendedStats: ['strength', 'dexterity', 'constitution'],
    choosableSkills: [],
    chosenSkillCount: 0,
});

export const ForeignServiceOfficer = new Profession({
    name: 'Foreign Service Officer',
    flavorText: 'You travel to strange lands, meet interesting people, and try to get along with them. Odds are you work for the State Department, though USAID, the Commercial Service and the Foreign Agriculture Service also have FSOs. Either way, you’ve had every opportunity to learn exotic and deadly things; the kinds of things that qualify you for Delta Green clearance.',
    professionalSkills: Profession.createSkillList([
        ['accounting', 40],
        ['anthropology', 40],
        ['bureaucracy', 60],
        ['foreign-languages', 50, 'French'],
        ['foreign-languages', 50, 'German'],
        ['foreign-languages', 40, 'Spanish'],
        ['history', 40],
        ['HUMINT', 50],
        ['law', 40],
        ['persuade', 50],
    ]),
    bondCount: 3,
    recommendedStats: ['intelligence', 'charisma'],
    choosableSkills: [],
    chosenSkillCount: 0,
});

export const IntelligenceAnalyst = new Profession({
    name: 'Intelligence Analyst',
    flavorText: 'In the FBI, NSA and CIA, there are those who gather information and those who decide what it means. You take information from disparate sources—newspapers, websites, informants, ELINT, and the assets developed by Case Officers—and figure out what it means. In short, your job is the piecing together of unrelated knowledge, a dangerous endeavor in the world of Delta Green.',
    professionalSkills: Profession.createSkillList([
        ['anthropology', 40],
        ['bureaucracy', 50],
        ['computer-science', 40],
        ['criminology', 40],
        ['foreign-languages', 50, 'French'],
        ['foreign-languages', 50, 'German'],
        ['foreign-languages', 40, 'Spanish'],
        ['history', 40],
        ['HUMINT', 50],
        ['SIGINT', 40],
    ]),
    bondCount: 3,
    recommendedStats: ['intelligence'],
    choosableSkills: [],
    chosenSkillCount: 0,
});

export const IntelligenceCaseOfficer = new Profession({
    name: 'Intelligence Case Officer',
    flavorText: 'You recruit people to spy on their own countries for your agency, probably the CIA. Your job is to develop foreign intelligence sources (“assets”), communicate with them, and keep them under control, productive, and alive. It’s a hard business because you must view everyone as a potential threat, liar, or tool to further your agenda. If your name came to the attention of Delta Green, congratulations; you are now someone else’s asset.',
    professionalSkills: Profession.createSkillList([
        ['alertness', 50],
        ['bureaucracy', 40],
        ['criminology', 50],
        ['disguise', 50],
        ['drive', 40],
        ['firearms', 40],
        ['foreign-languages', 50, 'French'],
        ['foreign-languages', 40, 'German'],
        ['HUMINT', 60],
        ['persuade', 60],
        ['SIGINT', 40],
        ['stealth', 50],
        ['unarmed-combat', 50],
    ]),
    bondCount: 2,
    recommendedStats: ['intelligence', 'power', 'charisma'],
    choosableSkills: [],
    chosenSkillCount: 0,
});

export const Lawyer = new Profession({
    name: 'Lawyer',
    flavorText: 'Your tools are a computer and smartphone. You might be moving millions of dollars, or bits of data, or both. Or you might be a prosecutor, a defense attorney, or judge.',
    professionalSkills: Profession.createSkillList([
        ['accounting', 50],
        ['bureaucracy', 50],
        ['HUMINT', 40],
        ['persuade', 60],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence', 'charisma'],
    choosableSkills: Profession.createSkillList([
        ['computer-science', 50],
        ['criminology', 60],
        ['foreign-languages', 50, 'French'],
        ['law', 50],
        ['pharmacy', 50],
    ]),
    chosenSkillCount: 4,
});

export const MediaSpecialist = new Profession({
    name: 'Media Specialist',
    flavorText: 'You might be an author, an editor, a researcher for a company or any branch of the government, a blog-ger, a TV reporter, or a scholar of rare texts. With the unnatural, you’ve uncovered the story of a lifetime.',
    professionalSkills: Profession.createSkillList([
        ['art', 60, 'Creative Writing'],
        ['history', 40],
        ['HUMINT', 40],
        ['persuade', 50],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence', 'charisma'],
    choosableSkills: Profession.createSkillList([
        ['anthropology', 40],
        ['archeology', 40],
        ['art', 40, 'Creative Writing'],
        ['bureaucracy', 50],
        ['computer-science', 40],
        ['criminology', 50],
        ['foreign-languages', 40, 'French'],
        ['law', 40],
        ['military-science', 40, 'Land'],
        ['occult', 50],
        ['science', 40, 'Biology'],
    ]),
    chosenSkillCount: 5,
});

export const Nurse = new Profession({
    name: 'Nurse',
    flavorText: 'Medical professionals are on the front line when awful things happen. Is that what brought you to the group’s attention?',
    professionalSkills: Profession.createSkillList([
        ['alertness', 40],
        ['bureaucracy', 40],
        ['first-aid', 60],
        ['HUMINT', 40],
        ['medicine', 40],
        ['persuade', 40],
        ['pharmacy', 40],
        ['science', 40, 'Biology'],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence', 'power', 'charisma'],
    choosableSkills: Profession.createSkillList([
        ['drive', 60],
        ['forensics', 40],
        ['navigate', 50],
        ['psychotherapy', 50],
        ['search', 60],
    ]),
    chosenSkillCount: 2,
});

export const Pilot = new Profession({
    name: 'Pilot',
    flavorText: 'Air or sea, commercial or military, your duty is to keep your passengers alive and craft intact. This can lead to hard choices when your passengers put the vehicle in danger. Or are you a drone operator, flying a Predator from a thousand miles away? Either way, what op brought you to the attention of Delta Green?',
    professionalSkills: Profession.createSkillList([
        ['alertness', 60],
        ['bureaucracy', 30],
        ['craft', 40, 'Electrician'],
        ['craft', 40, 'Mechanic'],
        ['navigate', 50],
        ['pilot', 60],
        ['science', 40, 'Meteorology'],
        ['swim', 40],
    ]),
    bondCount: 3,
    recommendedStats: ['dexterity', 'intelligence'],
    choosableSkills: Profession.createSkillList([
        ['foreign-languages', 50, 'French'],
        ['pilot', 50],
        ['heavy-weapons', 50],
        ['military-science', 50, 'Land'],
    ]),
    chosenSkillCount: 2,
});

export const PoliceOfficer = new Profession({
    name: 'Police Officer',
    flavorText: 'You serve and protect. Police officers walk the beat in uniform. Deputy sheriffs answer to an elected law enforcer and have jurisdiction over an entire county. Detectives come in after the fact and put the pieces together.',
    professionalSkills: Profession.createSkillList([
        ['alertness', 60],
        ['bureaucracy', 40],
        ['criminology', 40],
        ['drive', 50],
        ['firearms', 40],
        ['first-aid', 30],
        ['HUMINT', 50],
        ['law', 30],
        ['melee-weapons', 50],
        ['navigate', 40],
        ['persuade', 40],
        ['search', 40],
        ['unarmed-combat', 60],
    ]),
    bondCount: 3,
    recommendedStats: ['strength', 'constitution', 'power'],
    choosableSkills: Profession.createSkillList([
        ['forensics', 50],
        ['heavy-machinery', 60],
        ['heavy-weapons', 50],
        ['ride', 60],
    ]),
    chosenSkillCount: 1,
});

export const ProgramManager = new Profession({
    name: 'Program Manager',
    flavorText: 'You run an organization. Someone has to secure funding, move resources, and make connections, and that’s you. You control a budget and are responsible for how your program is maintained and where the money goes. Organizations discover the most startling things in their pursuit of profit or the public good.',
    professionalSkills: Profession.createSkillList([
        ['accounting', 60],
        ['bureaucracy', 60],
        ['computer-science', 50],
        ['criminology', 30],
        ['foreign-languages', 50, 'French'],
    ]),
    bondCount: 4,
    recommendedStats: ['intelligence', 'charisma'],
    choosableSkills: Profession.createSkillList([
        ['anthropology', 30],
        ['art', 30, 'Creative Writing'],
        ['craft', 30, 'Electrician'],
        ['craft', 30, 'Mechanic'],
        ['science', 30, 'Biology'],
    ]),
    chosenSkillCount: 1,
});

export const Marine = new Profession({
    name: 'Soldier or Marine',
    flavorText: 'Governments will always need boots on the ground and steady hands holding rifles. When war begins, civilization gets out of the way. With the social contract void, unnatural things creep in at the edges. There’s a reason Delta Green began in the military.',
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
    bondCount: 4,
    recommendedStats: ['strength', 'constitution'],
    choosableSkills: Profession.createSkillList([
        ['artillery', 40],
        ['computer-science', 40],
        ['craft', 40, 'Electrician'],
        ['craft', 40, 'Mechanic'],
        ['demolitions', 40],
        ['foreign-languages', 40, 'French'],
        ['heavy-machinery', 50],
        ['heavy-weapons', 40],
        ['search', 60],
        ['SIGINT', 40],
        ['swim', 60],
    ]),
    chosenSkillCount: 3,
});

// additional professions
export const additionalProfessions = [
    Criminal,
    Firefighter,
    ForeignServiceOfficer,
    IntelligenceAnalyst,
    IntelligenceCaseOfficer,
    Lawyer,
    Marine,
    MediaSpecialist,
    Nurse,
    Pilot,
    PoliceOfficer,
    ProgramManager,
];

export default professions;