import { msg } from '@lingui/core/macro';
import { MessageDescriptor } from '@lingui/core';

export interface Bond {
    name: string,
    detail: string;
    score: number;
    type: string;
}

export interface Character {
    bonds: Bond[];
    derivedAttributes: DerivedAttributes;
    detailedDescription: DetailedDescription;
    profession: IProfession;
    skills: Skills;
    statistics: Statistics;
};

// needs a label
export interface DerivedAttribute {
    currentValue: number;
    maxValue: number;
}

export interface DerivedAttributes {
    // needs max and current
    hitPoints: DerivedAttribute; // strength + constitution / 2 round up
    willPower: DerivedAttribute; // power
    sanity: DerivedAttribute; // power x 5
    breakingPoint: DerivedAttribute; // sanity - power
}

export interface DetailedDescription {
    firstName: string;
    lastName: string;
    middleInitial?: string;
    alias?: string;
    dateOfBirth: Date;
    sex?: string;
    employer?: string;
    nationality?: string;
    appearance: string;
    residence?: string; // maybe make it city, state, country
    education?: string;
    personality?: string;
    beliefs?: string;
    hobbies?: string;
    obsessions?: string;
    motivations?: string;
    admire?: string;
    dislike?: string;
    trustInDeltaGreen?: string;
    deltaGreenAgreement?: string;
    damagedVeteranTemplates?: string[];
    personalMotivations?: string[];
}

export const DISTINGUISHING_FEATURES: { [key in keyof Statistics]: {[score: number]: string} } = {
    strength: {
        3: "Feeble",
        4: "Frail",
        5: "Weak",
        6: "Soft",
        7: "Sedentary",
        8: "Couch Potato",
        9: "Active Couch Potato",
        10: "Could take the stairs",
        11: "Active",
        12: "Weekend Warrior",
        13: "Fit",
        14: "Muscular",
        15: "Athletic",
        16: "Jacked",
        17: "Huge",
        18: "Swole",
    },
    constitution: {
        3: "Infirmed",
        4: "Fragile",
        5: "Delicate",
        6: "Unhealthy",
        7: "Susceptible",
        8: "Fatigued",
        9: "Mediocre",
        10: "Fair",
        11: "Healthy",
        12: "Hearty",
        13: "Sturdy",
        14: "Vigorous",
        15: "Robust",
        16: "Fortified",
        17: "Formidable",
        18: "Nigh Immortal",
    },
    dexterity: {
        3: "Clumsy",
        4: "Awkward",
        5: "Uncoordinated",
        6: "All Thumbs",
        7: "Fumbling",
        8: "Graceless",
        9: "Stiff",
        10: "Handy",
        11: "Nimble",
        12: "Agile",
        13: "Adroit",
        14: "Deft",
        15: "Uncanny",
        16: "Cat-like",
        17: "Greased Lightning",
        18: "Surgically Precise",
    },
    intelligence:  {
        3: "Dim",
        4: "Pays for Mensa",
        5: "Thick-skulled",
        6: "Dull",
        7: "Incurious",
        8: "Simple-minded",
        9: "Does their 'own research'",
        10: "Reads occasionally",
        11: "Bright",
        12: "Whip-smart",
        13: "Razor-sharp",
        14: "Genius",
        15: "Brilliant",
        16: "Polymath",
        17: "Oracular",
        18: "Sagely",
    },
    power:  {
        3: "Weak-willed",
        4: "Irrational",
        5: "Impulsive",
        6: "Wishy-washy",
        7: "Indecisive",
        8: "Pliable",
        9: "Flexible in principle",
        10: "Firm",
        11: "Determined",
        12: "Resolute",
        13: "Stubborn",
        14: "Perserverant",
        15: "Tenacious",
        16: "Resilient",
        17: "Indomitable",
        18: "Unyielding",
    },
    charisma:  {
        3: "Repulsive",
        4: "Insipid",
        5: "Bland",
        6: "Unremarkable",
        7: "Uninspiring",
        8: "Forgettable",
        9: "Plain",
        10: "Affable",
        11: "Pleasant",
        12: "Engaging",
        13: "Alluring",
        14: "Captivating",
        15: "Compelling",
        16: "Mesmerizing",
        17: "Magnetic",
        18: "Radiant",
    },
};

export interface IProfession {
    name: string;
    flavorText?: string;
    affiliation?: string;
    professionalSkills: Skill[];
    bondCount: number;
    recommendedStats: StatisticKeys[];
    choosableSkills: Skill[];
    chosenSkillCount: number;
    otherSkills?: { [skillName: string]: Skill }; 
}

export interface Skill {
    id: string;
    name: string;
    value: number;
    bonus: number;
    label?: string;
    reminderText?: string;
    subType?: string;
    isDefault?: boolean;
    pointsAllocated?: number;
}

export const SKILL_REMINDERS: { [key: string]: string } = {
    Accounting: "Business Math",
    Alertness: "Noticing things",
    Anthropology: "Study of humans and their cultures",
    Archeology: "Jurassic Park",
    Art: "Painting",
    Artillery: "Making things explode from far away",
    Athletics: "Jumping, ducking, running, climbing, etc",
    Bureaucracy: "Greasing the wheels of government",
    ComputerScience: "010111100001",
    Crafts: "Inner Adam Savage",
    Criminology: "Muddying the waters of a crime-scene",
    Demolitions: "Controlled explosions",
    Disguise: "Gene Parmesan, he's the best",
    Dodge: "Avoiding getting hit",
    Drive: "Opearting a motor-vehicle",
    Firearms: "pew-pew",
    FirstAid: "Minor urgent medical care",
    Forensics: "CSI",
    ForeignLanguages: "Parles-vous Français?",
    HeavyMachinery: "Forklifts, cranes, excavators, etc",
    HeavyWeapons: "LMGs I think",
    History: "If you haven't studied it you're doomed to repeat it",
    HUMINT: "Understanding human behavior",
    Law: "Lawyering",
    Medicine: "Medical practice",
    MeleeWeapons: "Knives, hatchets, swords, etc",
    MilitaryScience: "Military tactics",
    Navigate: "Finding the path",
    Occult: "Cult shit",
    Persuade: "Convincing people",
    Pharmacy: "Do you like drugs?",
    Pilot: "Operating flying vehicles",
    Psychotherapy: "Analysing thought",
    Ride: "Horses and such",
    Science: "Phsyics, Chemistry, Biology, etc",
    Search: "Finding things",
    SIGINT: "Signal intelligence, breaking codes",
    Stealth: "Sneaking around",
    Surgery: "Removing a bullet, stitching a wound",
    Survival: "Camping, tracking, improvising in nature",
    Swim: "Moving oneself through water",
    UnarmedCombat: "Punch, kick, grapple, bite, etc",
    Unnatural: "It's a jeep thing, you wouldn't understand",
};

export type Skills = Skill[];

// AJS consider adding shortHand value, ie: constitution -> con
// AJS TODO: switch msgs over strings 
export interface Stat {
    label: string;
    labelMsg?: MessageDescriptor;
    score: number;
    x5: number;
    distinguishingFeature: string;
    distinguishingFeatureMsg?: MessageDescriptor;
    reminderText?: string;
    reminderMsg?: MessageDescriptor;
}

export const STAT_REMINDERS: { [key in keyof Statistics]: string } = {
    strength: "Raw physical power",
    constitution: "Health and hardiness",
    dexterity: "Speed and physical agility",
    intelligence: "Cunning, logic, and intuition",
    power: "Will, spirit, and mental stability",
    charisma: "Personal and physical appeal",
};

export const STAT_LABEL_MSGS: { [key in keyof Statistics]: MessageDescriptor } = {
    strength: msg({
        message: 'Strength'
    }),
    constitution: msg({
        message: 'Constitution'
    }),
    dexterity: msg({
        message: 'Dexterity'
    }),
    intelligence: msg({
        message: 'Intelligence'
    }),
    power: msg({
        message: 'Power'
    }),
    charisma: msg({
        message: 'Charisma'
    }),
}

// New constant with message descriptors
export const STAT_REMINDER_MSGS: { [key in keyof Statistics]: MessageDescriptor } = {
    strength: msg({
        message: 'Raw physical power'
    }),
    constitution: msg({
        message: 'Health and hardiness'
    }),
    dexterity: msg({
        message: 'Speed and physical agility'
    }),
    intelligence: msg({
        message: 'Cunning, logic, and intuition'
    }),
    power: msg({
        message: 'Will, spirit, and mental stability'
    }),
    charisma: msg({
        message: 'Personal and physical appeal'
    })
};

export interface Statistics {
    strength: Stat;
    constitution: Stat;
    dexterity: Stat;
    intelligence: Stat;
    power: Stat;
    charisma: Stat;
}

// AJS starting point: templates need to handle adjustments to derived attributes and bonds
export interface DamagedVeteranAdjustment {
    id: string;
    label: string;
    description: string;
    statAdjustment: { [statName in string]: number };
    skillAdjustment: { [skillName: string]: number };
}
// Extreme Violence
// Add +10% to your Agent's Occult skill. Reduce SAN by 5. Subtract 3 from your Agent's CHA and each Bond. Your Agent is adapted to violence (see page 73).
export const EXTREME_VIOLENCE: DamagedVeteranAdjustment = {
    id: "extreme-violence",
    label: "Extreme Violence",
    description: "Add +10% to your Agent's Occult skill. Reduce SAN by 5. Subtract 3 from your Agent's CHA and each Bond. Your Agent is adapted to violence (see page 73).",
    statAdjustment: {
        charisma: -3,
        power: -3,
    },
    skillAdjustment: {
        occult: 10,
    },
}
// Captivity or Imprisonment
// Add +10% to your Agent's Occult skill. Reduce SAN by 5. Subtract 3 from your Agent's POW. Your Agent is adapted to helplessness (see page 73).
export const CAPTIVITY_OR_IMPRISONMENT: DamagedVeteranAdjustment = {
    id: "captivity-or-imprisonment",
    label: "Captivity or Imprisonment",
    description: "Add +10% to your Agent's Occult skill. Reduce SAN by 5. Subtract 3 from your Agent's POW. Your Agent is adapted to helplessness (see page 73).",
    statAdjustment: {
        power: -3,
    },
    skillAdjustment: {
        occult: 10,
    },
}
// Hard Experience
// Add +10% to your Agent's Occult and +10% to any five skills other than Unnatural. This can bring no skill higher than 90%. Reduce your Agent's SAN by 5. Remove one Bond.
// AJS: we need a way to represent the cap at 90% and that it is 5 skills of the user's choice
export const HARD_EXPERIENCE: DamagedVeteranAdjustment = {
    id: "hard-experience",
    label: "Hard Experience",
    description: "Add +10% to your Agent's Occult and +10% to any five skills other than Unnatural. This can bring no skill higher than 90%. Reduce your Agent's SAN by 5. Remove one Bond.",
    statAdjustment: {
        sanity: -5,
    },
    skillAdjustment: {
        occult: 10,
    },
}
// Things Man Was Not Meant to Know
// Your Agent gains 10% in the Unnatural skill and adds +20% to Occult. Reduce your Agent's SAN by his or
// her POW. Your Agent gains a new disorder caused by the Unnatural (see page 72). Reset your Agent's Break- ing Point to his or her new SAN minus POW.
// AJS: we need a way to represent the new disorder and the breaking point
export const THINGS_MAN_WAS_NOT_MEANT_TO_KNOW: DamagedVeteranAdjustment = {
    id: "things-man-was-not-meant-to-know",
    label: "Things Man Was Not Meant to Know",
    description: "Your Agent gains 10% in the Unnatural skill and adds +20% to Occult. Reduce your Agent's SAN by his or her POW. Your Agent gains a new disorder caused by the Unnatural (see page 72). Reset your Agent's Break- ing Point to his or her new SAN minus POW.",
    statAdjustment: {
        sanity: -5,
    },
    skillAdjustment: {
        occult: 10,
    },
}

export type StatisticKeys = keyof Statistics;

export const DEFAULT_SKILLS: Skill[] = [
    {
        id: 'accounting',
        name: "Accounting",
        value: 10,
        bonus: 0,
        label: "Accounting",
        reminderText: "Business Math",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'alertness',
        name: "Alertness",
        value: 20,
        bonus: 0,
        label: "Alertness",
        reminderText: "Noticing things",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'anthropology',
        name: "Anthropology",
        value: 0,
        bonus: 0,
        label: "Anthropology",
        reminderText: "Study of humans and their cultures",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'archeology',
        name: "Archeology",
        value: 0,
        bonus: 0,
        label: "Archeology",
        reminderText: "Jurassic Park",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'art',
        name: "Art",
        value: 0,
        bonus: 0,
        label: "Art",
        reminderText: "Creative pursuits",
        isDefault: true,
        pointsAllocated: 0,
        subType: "Painting",
    },
    {
        id: 'artillery',
        name: "Artillery",
        value: 0,
        bonus: 0,
        label: "Artillery",
        reminderText: "Making things explode from far away",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'athletics',
        name: "Athletics",
        value: 30,
        bonus: 0,
        label: "Athletics",
        reminderText: "Jumping, ducking, running, climbing, etc",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'bureaucracy',
        name: "Bureaucracy",
        value: 10,
        bonus: 0,
        label: "Bureaucracy",
        reminderText: "Greasing the wheels of government",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'computer-science',
        name: "Computer Science",
        value: 0,
        bonus: 0,
        label: "Computer Science",
        reminderText: "010111100001",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'crafts-macrame',
        name: "Crafts",
        value: 0,
        bonus: 0,
        label: "Craft",
        reminderText: "Inner Adam Savage",
        subType: "Macrame",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'criminology',
        name: "Criminology",
        value: 10,
        bonus: 0,
        label: "Criminology",
        reminderText: "Muddying the waters of a crime-scene",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'demolitions',
        name: "Demolitions",
        value: 0,
        bonus: 0,
        label: "Demolitions",
        reminderText: "Controlled explosions",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'disguise',
        name: "Disguise",
        value: 10,
        bonus: 0,
        label: "Disguise",
        reminderText: "Gene Parmesan, he's the best",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'dodge',
        name: "Dodge",
        value: 30,
        bonus: 0,
        label: "Dodge",
        reminderText: "Avoiding getting hit",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'drive',
        name: "Drive",
        value: 20,
        bonus: 0,
        label: "Drive",
        reminderText: "Opearting a motor-vehicle",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'firearms',
        name: "Firearms",
        value: 20,
        bonus: 0,
        label: "Firearms",
        reminderText: "pew-pew",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'first-aid',
        name: "First Aid",
        value: 10,
        bonus: 0,
        label: "First Aid",
        reminderText: "Minor urgent medical care",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'forensics',
        name: "Forensics",
        value: 0,
        bonus: 0,
        label: "Forensics",
        reminderText: "CSI",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'foreign-languages-french',
        name: "Foreign Languages",
        value: 0,
        bonus: 0,
        subType: "French",
        label: "Foreign Languages",
        reminderText: "Parles-vous Français?",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'heavy-machinery',
        name: "Heavy Machinery",
        value: 10,
        bonus: 0,
        label: "Heavy Machinery",
        reminderText: "Forklifts, cranes, excavators, etc",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'heavy-weapons',
        name: "Heavy Weapons",
        value: 0,
        bonus: 0,
        label: "Heavy Weapons",
        reminderText: "LMGs I think",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'history',
        name: "History",
        value: 10,
        bonus: 0,
        label: "History",
        reminderText: "If you haven't studied it you're doomed to repeat it",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'humint',
        name: "HUMINT",
        value: 10,
        bonus: 0,
        label: "HUMINT",
        reminderText: "Understanding human behavior",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'law',
        name: "Law",
        value: 0,
        bonus: 0,
        label: "Law",
        reminderText: "Lawyering",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'medicine',
        name: "Medicine",
        value: 0,
        bonus: 0,
        label: "Medicine",
        reminderText: "Medical practice",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'melee-weapons',
        name: "Melee Weapons",
        value: 30,
        bonus: 0,
        label: "Melee Weapons",
        reminderText: "Knives, hatchets, swords, etc",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'military-science-land',
        name: "Military Science",
        value: 0,
        bonus: 0,
        label: "Military Science",
        reminderText: "Military tactics",
        subType: "Land",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'navigate',
        name: "Navigate",
        value: 10,
        bonus: 0,
        label: "Navigate",
        reminderText: "Finding the path",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'occult',
        name: "Occult",
        value: 10,
        bonus: 0,
        label: "Occult",
        reminderText: "Cult shit",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'persuade',
        name: "Persuade",
        value: 20,
        bonus: 0,
        label: "Persuade",
        reminderText: "Convincing people",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'pharmacy',
        name: "Pharmacy",
        value: 0,
        bonus: 0,
        label: "Pharmacy",
        reminderText: "Do you like drugs?",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'pilot-aircraft',
        name: "Pilot",
        value: 0,
        bonus: 0,
        label: "Pilot",
        reminderText: "Operating flying vehicles",
        subType: "Aircraft",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'psychotherapy',
        name: "Psychotherapy",
        value: 10,
        bonus: 0,
        label: "Psychotherapy",
        reminderText: "Analysing thought",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'ride',
        name: "Ride",
        value: 10,
        bonus: 0,
        label: "Ride",
        reminderText: "Horses and such",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'science-theoretical-physics',
        name: "Science",
        value: 0,
        bonus: 0,
        label: "Science",
        reminderText: "Physics, Chemistry, Biology, etc",
        subType: "Theoretical Physics",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'search',
        name: "Search",
        value: 20,
        bonus: 0,
        label: "Search",
        reminderText: "Finding things",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'sigint',
        name: "SIGINT",
        value: 0,
        bonus: 0,
        label: "SIGINT",
        reminderText: "Signal intelligence, breaking codes",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'stealth',
        name: "Stealth",
        value: 10,
        bonus: 0,
        label: "Stealth",
        reminderText: "Sneaking around",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'surgery',
        name: "Surgery",
        value: 0,
        bonus: 0,
        label: "Surgery",
        reminderText: "Removing a bullet, stitching a wound",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'survival',
        name: "Survival",
        value: 10,
        bonus: 0,
        label: "Survival",
        reminderText: "Camping, tracking, improvising in nature",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'swim',
        name: "Swim",
        value: 20,
        bonus: 0,
        label: "Swim",
        reminderText: "Moving oneself through water",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'unarmed-combat',
        name: "Unarmed Combat",
        value: 40,
        bonus: 0,
        label: "Unarmed Combat",
        reminderText: "Punch, kick, grapple, bite, etc",
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'unnatural',
        name: "Unnatural",
        value: 0,
        bonus: 0,
        label: "Unnatural",
        reminderText: "It's a jeep thing, you wouldn't understand",
        isDefault: true,
        pointsAllocated: 0,
    },
];


// AJS, replace this with an actual complete character when we get there
export const character = {
    // roll 4d6, drop the lowest or assign from a pool of 72 points
    statistics: {
        // min 3, max 18
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        power: 10,
        charisma: 10,
    },
    derivedAttributes: {

    },
    profession: {

    },
    skills: {
        //         Accounting (10%)
        //  Alertness (20%)
        //  Anthropology (0%)
        //  Archeology (0%)
        //  Art (0%):
        //  Artillery (0%)
        //  Athletics (30%)
        //  Bureaucracy (10%)
        //  Computer Science (0%)
        //  Craft (0%):
        //  Criminology (10%)
        //  Demolitions (0%)
        //  Disguise (10%)
        //  Dodge (30%)
        //  Drive (20%)
        //  Firearms (20%)
        //          
        //     
        // 
        // First Aid (10%)
        // Forensics (0%)
        // Heavy Machinery (10%)
        // Heavy Weapons (0%)
        // History (10%)
        // HUMINT (10%)
        // Law (0%)
        // Medicine (0%)
        // Melee Weapons (30%)
        // Military Science (0%):
        // Navigate (10%)
        // Occult (10%)
        // Persuade (20%)
        // Pharmacy (0%)
        // Pilot (0%):
        // Psychotherapy (10%)
        //  Ride (10%)
        //  Science (0%):
        //  Search (20%)
        //  SIGINT (0%)
        //  Stealth (10%)
        //  Surgery (0%)
        //  Survival (10%)
        //  Swim (20%)
        //  Unarmed Combat (40%)
        // Unnatural (0%)
        // Foreign Languages and Other Skills:
        //      
    },
    bonds: [
        {
            name: "family",
            detail: "loves his family",
            score: 1,
        }
    ],
    name: {
        first: "John",
        last: "Doe",
    },
    distingiushingFeatures: {
        strength: "strong",
        dexterity: "agile",
        constitution: "tough",
        intelligence: "smart",
        power: "powerful",
        charisma: "charming",
    },
    age: {
        birthDate: "01/01/1970",
    },
    nationality: "American",
    motivations: [
        "money",
        "fame",
    ],
    mentalDisorders: [
        {
            name: "PTSD",
            description: "Post Traumatic Stress Disorder",
            severity: "moderate",
            triggers: [
                "loud noises",
                "sudden movements",
            ]
        }
    ],
    id: "1234567890",
    prompts: {
        // How old is your Agent? What does he or she look like? What’s his or her nationality?
        // What’s your Agent’s name? What are your Agent’s job and personal life like?
        // Why does Delta Green trust your Agent to help with its deadly and secretive mission?
        // And why, despite all the terrifying dangers, does your Agent answer the call?
    },
    adaptations: {
        // at 3 incidents without going insane, agent is immune to that trigger
        violence: 0,
        helplessness: 0,
    }
}