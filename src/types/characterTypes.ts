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
    labelMsg?: MessageDescriptor;
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

export const DISTINGUISHING_FEATURES: { [key in keyof Statistics]: {[score: number]: MessageDescriptor} } = {
    strength: {
        3: msg({
            message: "Feeble"
        }),
        4: msg({
            message: "Frail"
        }),
        5: msg({
            message: "Weak"
        }),
        6: msg({
            message: "Soft"
        }),
        8: msg({
            message: "Couch Potato"
        }),
        9: msg({
            message: "Active Couch Potato"
        }),
        10: msg({
            message: "Could take the stairs"
        }),
        11: msg({
            message: "Active"
        }),
        12: msg({
            message: "Weekend Warrior"
        }),
        13: msg({
            message: "Fit"
        }),
        14: msg({
            message: "Muscular"
        }),
        15: msg({
            message: "Athletic"
        }),
        16: msg({
            message: "Jacked"
        }),
        17: msg({
            message: "Huge"
        }),
        18: msg({
            message: "Swole"
        }),
    },
    constitution: {
        3: msg({
            message: "Infirmed"
        }),
        4: msg({
            message: "Fragile"
        }),
        5: msg({
            message: "Delicate"
        }),
        6: msg({
            message: "Unhealthy"
        }),
        7: msg({
            message: "Susceptible"
        }),
        8: msg({
            message: "Fatigued"
        }),
        9: msg({
            message: "Mediocre"
        }),
        10: msg({
            message: "Fair"
        }),
        11: msg({
            message: "Healthy"
        }),
        12: msg({
            message: "Hearty"
        }),
        13: msg({
            message: "Sturdy"
        }),
        14: msg({
            message: "Vigorous"
        }),
        15: msg({
            message: "Robust"
        }),
        16: msg({
            message: "Fortified"
        }),
        17: msg({
            message: "Formidable"
        }),
        18: msg({
            message: "Nigh Immortal"
        }),
    },
    dexterity: {
        3: msg({
            message: "Clumsy"
        }),
        4: msg({
            message: "Awkward"
        }),
        5: msg({
            message: "Uncoordinated"
        }),
        6: msg({
            message: "All Thumbs"
        }),
        7: msg({
            message: "Fumbling"
        }),
        8: msg({
            message: "Graceless"
        }),
        9: msg({
            message: "Stiff"
        }),
        10: msg({
            message: "Handy"
        }),
        11: msg({
            message: "Nimble"
        }),
        12: msg({
            message: "Agile"
        }),
        13: msg({
            message: "Adroit"
        }),
        14: msg({
            message: "Deft"
        }),
        15: msg({
            message: "Uncanny"
        }),
        16: msg({
            message: "Cat-like"
        }),
        17: msg({
            message: "Greased Lightning"
        }),
        18: msg({
            message: "Surgically Precise"
        }),
    },
    intelligence:  {
        3: msg({
            message: "Dim"
        }),
        4: msg({
            message: "Pays for Mensa"
        }),
        5: msg({
            message: "Thick-skulled"
        }),
        6: msg({
            message: "Dull"
        }),
        7: msg({
            message: "Incurious"
        }),
        10: msg({
            message: "Reads occasionally"
        }),
        11: msg({
            message: "Bright"
        }),
        12: msg({
            message: "Whip-smart"
        }),
        13: msg({
            message: "Razor-sharp"
        }),
        14: msg({
            message: "Genius"
        }),
        15: msg({
            message: "Brilliant"
        }),
        16: msg({
            message: "Polymath"
        }),
        17: msg({
            message: "Oracular"
        }),
        18: msg({
            message: "Sagely"
        }),
    },
    power:  {
        3: msg({
            message: "Weak-willed"
        }),
        4: msg({
            message: "Irrational"
        }),
        5: msg({
            message: "Impulsive"
        }),
        8: msg({
            message: "Pliable"
        }),
        9: msg({
            message: "Flexible in principle"
        }),
        10: msg({
            message: "Firm"
        }),
        11: msg({
            message: "Determined"
        }),
        12: msg({
            message: "Resolute"
        }),
        13: msg({
            message: "Stubborn"
        }),
        14: msg({
            message: "Perserverant"
        }),
        15: msg({
            message: "Tenacious"
        }),
        16: msg({
            message: "Resilient"
        }),
        17: msg({
            message: "Indomitable"
        }),
        18: msg({
            message: "Unyielding"
        }),
    },
    charisma:  {
        3: msg({
            message: "Repulsive"
        }),
        4: msg({
            message: "Insipid"
        }),
        5: msg({
            message: "Bland"
        }),
        6: msg({
            message: "Unremarkable"
        }),
        7: msg({
            message: "Uninspiring"
        }),
        8: msg({
            message: "Forgettable"
        }),
        10: msg({
            message: "Affable"
        }),
        11: msg({
            message: "Pleasant"
        }),
        12: msg({
            message: "Engaging"
        }),
        13: msg({
            message: "Alluring"
        }),
        14: msg({
            message: "Captivating"
        }),
        15: msg({
            message: "Compelling"
        }),
        16: msg({
            message: "Mesmerizing"
        }),
        17: msg({
            message: "Magnetic"
        }),
        18: msg({
            message: "Radiant"
        }),
    },
};

export interface IProfession {
    name: string;
    labelMsg?: MessageDescriptor;
    flavorText?: string;
    flavorTextMsg?: MessageDescriptor;
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
    labelMsg?: MessageDescriptor;
    reminderText?: string;
    reminderMsg?: MessageDescriptor;
    subType?: string;
    subTypeMsg?: MessageDescriptor;
    isDefault?: boolean;
    pointsAllocated?: number;
}

export const SKILL_REMINDERS: { [key: string]: MessageDescriptor } = {
    Accounting: msg({
        message: "Business Math"
    }),
    Alertness: msg({
        message: "Noticing things"
    }),
    Anthropology: msg({
        message: "Study of humans and their cultures"
    }),
    Archeology: msg({
        message: "Jurassic Park"
    }),
    Art: msg({
        message: "Painting"
    }),
    Artillery: msg({
        message: "Making things explode from far away"
    }),
    Athletics: msg({
        message: "Jumping, ducking, running, climbing, etc"
    }),
    Bureaucracy: msg({
        message: "Greasing the wheels of government"
    }),
    ComputerScience: msg({
        message: "010111100001"
    }),
    Crafts: msg({
        message: "Inner Adam Savage"
    }),
    Disguise: msg({
        message: "Gene Parmesan, he's the best"
    }),
    Dodge: msg({
        message: "Avoiding getting hit"
    }),
    Drive: msg({
        message: "Opearting a motor-vehicle"
    }),
    Firearms: msg({
        message: "pew-pew"
    }),
    FirstAid: msg({
        message: "Minor urgent medical care"
    }),
    Forensics: msg({
        message: "CSI"
    }),
    ForeignLanguages: msg({
        message: "Parles-vous Français?"
    }),
    HeavyMachinery: msg({
        message: "Forklifts, cranes, excavators, etc"
    }),
    HeavyWeapons: msg({
        message: "LMGs I think"
    }),
    History: msg({
        message: "If you haven't studied it you're doomed to repeat it"
    }),
    Medicine: msg({
        message: "Medical practice"
    }),
    MeleeWeapons: msg({
        message: "Knives, hatchets, swords, etc"
    }),
    MilitaryScience: msg({
        message: "Military tactics"
    }),
    Navigate: msg({
        message: "Finding the path"
    }),
    Occult: msg({
        message: "Cult shit"
    }),
    Persuade: msg({
        message: "Convincing people"
    }),
    Pharmacy: msg({
        message: "Do you like drugs?"
    }),
    Pilot: msg({
        message: "Operating flying vehicles"
    }),
    Psychotherapy: msg({
        message: "Analysing thought"
    }),
    Ride: msg({
        message: "Horses and such"
    }),
    Science: msg({
        message: "Phsyics, Chemistry, Biology, etc"
    }),
    Search: msg({
        message: "Finding things"
    }),
    SIGINT: msg({
        message: "Signal intelligence, breaking codes"
    }),
    Survival: msg({
        message: "Camping, tracking, improvising in nature"
    }),
    Swim: msg({
        message: "Moving oneself through water"
    }),
    UnarmedCombat: msg({
        message: "Punch, kick, grapple, bite, etc"
    }),
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

// AJS TODO: clear out the non msg strings
export const DEFAULT_SKILLS: Skill[] = [
    {
        id: 'accounting',
        name: "Accounting",
        value: 10,
        bonus: 0,
        label: "Accounting",
        labelMsg: msg({
            message: "Accounting"
        }),
        reminderText: "Business Math",
        reminderMsg: msg({
            message: "Business Math"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'alertness',
        name: "Alertness",
        value: 20,
        bonus: 0,
        label: "Alertness",
        labelMsg: msg({
            message: "Alertness"
        }),
        reminderText: "Noticing things",
        reminderMsg: msg({
            message: "Noticing things"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'anthropology',
        name: "Anthropology",
        value: 0,
        bonus: 0,
        label: "Anthropology",
        labelMsg: msg({
            message: "Anthropology"
        }),
        reminderText: "Study of humans and their cultures",
        reminderMsg: msg({
            message: "Study of humans and their cultures"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'archeology',
        name: "Archeology",
        value: 0,
        bonus: 0,
        label: "Archeology",
        labelMsg: msg({
            message: "Archeology"
        }),
        reminderText: "Jurassic Park",
        reminderMsg: msg({
            message: "Jurassic Park"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'art',
        name: "Art",
        value: 0,
        bonus: 0,
        label: "Art",
        labelMsg: msg({
            message: "Art"
        }),
        reminderText: "Creative pursuits",
        reminderMsg: msg({
            message: "Creative pursuits"
        }),
        isDefault: true,
        pointsAllocated: 0,
        subType: "Painting",
        subTypeMsg: msg({
            message: "Painting"
        }),
    },
    {
        id: 'artillery',
        name: "Artillery",
        value: 0,
        bonus: 0,
        label: "Artillery",
        labelMsg: msg({
            message: "Artillery"
        }),
        reminderText: "Making things explode from far away",
        reminderMsg: msg({
            message: "Making things explode from far away"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'athletics',
        name: "Athletics",
        value: 30,
        bonus: 0,
        label: "Athletics",
        labelMsg: msg({
            message: "Athletics"
        }),
        reminderText: "Jumping, ducking, running, climbing, etc",
        reminderMsg: msg({
            message: "Jumping, ducking, running, climbing, etc"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'bureaucracy',
        name: "Bureaucracy",
        value: 10,
        bonus: 0,
        label: "Bureaucracy",
        labelMsg: msg({
            message: "Bureaucracy"
        }),
        reminderText: "Greasing the wheels of government",
        reminderMsg: msg({
            message: "Greasing the wheels of government"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'computer-science',
        name: "Computer Science",
        value: 0,
        bonus: 0,
        label: "Computer Science",
        labelMsg: msg({
            message: "Computer Science"
        }),
        reminderText: "010111100001",
        reminderMsg: msg({
            message: "010111100001"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'crafts-macrame',
        name: "Crafts",
        value: 0,
        bonus: 0,
        label: "Craft",
        labelMsg: msg({
            message: "Craft"
        }),
        reminderText: "Inner Adam Savage",
        reminderMsg: msg({
            message: "Inner Adam Savage"
        }),
        subType: "Macrame",
        subTypeMsg: msg({
            message: "Macrame"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'criminology',
        name: "Criminology",
        value: 10,
        bonus: 0,
        label: "Criminology",
        labelMsg: msg({
            message: "Criminology"
        }),
        reminderText: "Muddying the waters of a crime-scene",
        reminderMsg: msg({
            message: "Muddying the waters of a crime-scene"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'demolitions',
        name: "Demolitions",
        value: 0,
        bonus: 0,
        label: "Demolitions",
        labelMsg: msg({
            message: "Demolitions"
        }),
        reminderText: "Controlled explosions",
        reminderMsg: msg({
            message: "Controlled explosions"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'disguise',
        name: "Disguise",
        value: 10,
        bonus: 0,
        label: "Disguise",
        labelMsg: msg({
            message: "Disguise"
        }),
        reminderText: "Gene Parmesan, he's the best",
        reminderMsg: msg({
            message: "Gene Parmesan, he's the best"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'dodge',
        name: "Dodge",
        value: 30,
        bonus: 0,
        label: "Dodge",
        labelMsg: msg({
            message: "Dodge"
        }),
        reminderText: "Avoiding getting hit",
        reminderMsg: msg({
            message: "Avoiding getting hit"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'drive',
        name: "Drive",
        value: 20,
        bonus: 0,
        label: "Drive",
        labelMsg: msg({
            message: "Drive"
        }),
        reminderText: "Opearting a motor-vehicle",
        reminderMsg: msg({
            message: "Opearting a motor-vehicle"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'firearms',
        name: "Firearms",
        value: 20,
        bonus: 0,
        label: "Firearms",
        labelMsg: msg({
            message: "Firearms"
        }),
        reminderText: "pew-pew",
        reminderMsg: msg({
            message: "pew-pew"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'first-aid',
        name: "First Aid",
        value: 10,
        bonus: 0,
        label: "First Aid",
        labelMsg: msg({
            message: "First Aid"
        }),
        reminderText: "Minor urgent medical care",
        reminderMsg: msg({
            message: "Minor urgent medical care"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'forensics',
        name: "Forensics",
        value: 0,
        bonus: 0,
        label: "Forensics",
        labelMsg: msg({
            message: "Forensics"
        }),
        reminderText: "CSI",
        reminderMsg: msg({
            message: "CSI"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'foreign-languages-french',
        name: "Foreign Languages",
        value: 0,
        bonus: 0,
        subType: "French",
        subTypeMsg: msg({
            message: "French"
        }),
        label: "Foreign Languages",
        labelMsg: msg({
            message: "Foreign Languages"
        }),
        reminderText: "Parles-vous Français?",
        reminderMsg: msg({
            message: "Parles-vous Français?"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'heavy-machinery',
        name: "Heavy Machinery",
        value: 10,
        bonus: 0,
        label: "Heavy Machinery",
        labelMsg: msg({
            message: "Heavy Machinery"
        }),
        reminderText: "Forklifts, cranes, excavators, etc",
        reminderMsg: msg({
            message: "Forklifts, cranes, excavators, etc"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'heavy-weapons',
        name: "Heavy Weapons",
        value: 0,
        bonus: 0,
        label: "Heavy Weapons",
        labelMsg: msg({
            message: "Heavy Weapons"
        }),
        reminderText: "LMGs I think",
        reminderMsg: msg({
            message: "LMGs I think"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'history',
        name: "History",
        value: 10,
        bonus: 0,
        label: "History",
        labelMsg: msg({
            message: "History"
        }),
        reminderText: "If you haven't studied it you're doomed to repeat it",
        reminderMsg: msg({
            message: "If you haven't studied it you're doomed to repeat it"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'humint',
        name: "HUMINT",
        value: 10,
        bonus: 0,
        label: "HUMINT",
        labelMsg: msg({
            message: "HUMINT"
        }),
        reminderText: "Understanding human behavior",
        reminderMsg: msg({
            message: "Understanding human behavior"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'law',
        name: "Law",
        value: 0,
        bonus: 0,
        label: "Law",
        labelMsg: msg({
            message: "Law"
        }),
        reminderText: "Understanding and arguing the law",
        reminderMsg: msg({
            message: "Understanding and arguing the law"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'medicine',
        name: "Medicine",
        value: 0,
        bonus: 0,
        label: "Medicine",
        labelMsg: msg({
            message: "Medicine"
        }),
        reminderText: "Medical practice",
        reminderMsg: msg({
            message: "Medical practice"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'melee-weapons',
        name: "Melee Weapons",
        value: 30,
        bonus: 0,
        label: "Melee Weapons",
        labelMsg: msg({
            message: "Melee Weapons"
        }),
        reminderText: "Knives, hatchets, swords, etc",
        reminderMsg: msg({
            message: "Knives, hatchets, swords, etc"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'military-science-land',
        name: "Military Science",
        value: 0,
        bonus: 0,
        label: "Military Science",
        labelMsg: msg({
            message: "Military Science"
        }),
        reminderText: "Military tactics",
        reminderMsg: msg({
            message: "Military tactics"
        }),
        subType: "Land",
        subTypeMsg: msg({
            message: "Land"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'navigate',
        name: "Navigate",
        value: 10,
        bonus: 0,
        label: "Navigate",
        labelMsg: msg({
            message: "Navigate"
        }),
        reminderText: "Finding the path",
        reminderMsg: msg({
            message: "Finding the path"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'occult',
        name: "Occult",
        value: 10,
        bonus: 0,
        label: "Occult",
        labelMsg: msg({
            message: "Occult"
        }),
        reminderText: "Cult shit",
        reminderMsg: msg({
            message: "Cult shit"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'persuade',
        name: "Persuade",
        value: 20,
        bonus: 0,
        label: "Persuade",
        labelMsg: msg({
            message: "Persuade"
        }),
        reminderText: "Convincing people",
        reminderMsg: msg({
            message: "Convincing people"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'pharmacy',
        name: "Pharmacy",
        value: 0,
        bonus: 0,
        label: "Pharmacy",
        labelMsg: msg({
            message: "Pharmacy"
        }),
        reminderText: "Do you like drugs?",
        reminderMsg: msg({
            message: "Do you like drugs?"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'pilot-aircraft',
        name: "Pilot",
        value: 0,
        bonus: 0,
        label: "Pilot",
        labelMsg: msg({
            message: "Pilot"
        }),
        reminderText: "Operating flying vehicles",
        reminderMsg: msg({
            message: "Operating flying vehicles"
        }),
        subType: "Aircraft",
        subTypeMsg: msg({
            message: "Aircraft"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'psychotherapy',
        name: "Psychotherapy",
        value: 10,
        bonus: 0,
        label: "Psychotherapy",
        labelMsg: msg({
            message: "Psychotherapy"
        }),
        reminderText: "Analysing thought",
        reminderMsg: msg({
            message: "Analysing thought"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'ride',
        name: "Ride",
        value: 10,
        bonus: 0,
        label: "Ride",
        labelMsg: msg({
            message: "Ride"
        }),
        reminderText: "Horses and such",
        reminderMsg: msg({
            message: "Horses and such"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'science-theoretical-physics',
        name: "Science",
        value: 0,
        bonus: 0,
        label: "Science",
        labelMsg: msg({
            message: "Science"
        }),
        reminderText: "Physics, Chemistry, Biology, etc",
        reminderMsg: msg({
            message: "Physics, Chemistry, Biology, etc"
        }),
        subType: "Theoretical Physics",
        subTypeMsg: msg({
            message: "Theoretical Physics"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'search',
        name: "Search",
        value: 20,
        bonus: 0,
        label: "Search",
        labelMsg: msg({
            message: "Search"
        }),
        reminderText: "Finding things",
        reminderMsg: msg({
            message: "Finding things"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'sigint',
        name: "SIGINT",
        value: 0,
        bonus: 0,
        label: "SIGINT",
        labelMsg: msg({
            message: "SIGINT"
        }),
        reminderText: "Signal intelligence, breaking codes",
        reminderMsg: msg({
            message: "Signal intelligence, breaking codes"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'stealth',
        name: "Stealth",
        value: 10,
        bonus: 0,
        label: "Stealth",
        labelMsg: msg({
            message: "Stealth"
        }),
        reminderText: "Sneaking around",
        reminderMsg: msg({
            message: "Sneaking around"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'surgery',
        name: "Surgery",
        value: 0,
        bonus: 0,
        label: "Surgery",
        labelMsg: msg({
            message: "Surgery"
        }),
        reminderText: "Removing a bullet, stitching a wound",
        reminderMsg: msg({
            message: "Removing a bullet, stitching a wound"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'survival',
        name: "Survival",
        value: 10,
        bonus: 0,
        label: "Survival",
        labelMsg: msg({
            message: "Survival"
        }),
        reminderText: "Camping, tracking, improvising in nature",
        reminderMsg: msg({
            message: "Camping, tracking, improvising in nature"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'swim',
        name: "Swim",
        value: 20,
        bonus: 0,
        label: "Swim",
        labelMsg: msg({
            message: "Swim"
        }),
        reminderText: "Moving oneself through water",
        reminderMsg: msg({
            message: "Moving oneself through water"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'unarmed-combat',
        name: "Unarmed Combat",
        value: 40,
        bonus: 0,
        label: "Unarmed Combat",
        labelMsg: msg({
            message: "Unarmed Combat"
        }),
        reminderText: "Punch, kick, grapple, bite, etc",
        reminderMsg: msg({
            message: "Punch, kick, grapple, bite, etc"
        }),
        isDefault: true,
        pointsAllocated: 0,
    },
    {
        id: 'unnatural',
        name: "Unnatural",
        value: 0,
        bonus: 0,
        label: "Unnatural",
        labelMsg: msg({
            message: "Unnatural"
        }),
        reminderText: "It's a jeep thing, you wouldn't understand",
        reminderMsg: msg({
            message: "It's a jeep thing, you wouldn't understand"
        }),
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