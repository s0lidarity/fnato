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
    name: string;
    age: number;
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

// AJS this is overdone, can we just have this be a collection of skills? initialzing on defaults
// insert new skills at the end of the list, or alphabetically?
export type Skills = Skill[];

// AJS consider adding shortHand value, ie: constitution -> con
export interface Stat {
    score: number;
    x5: number;
    distinguishingFeature: string;
    reminderText?: string;
}

export const STAT_REMINDERS: { [key in keyof Statistics]: string } = {
    strength: "Raw physical power",
    constitution: "Health and hardiness",
    dexterity: "Speed and physical agility",
    intelligence: "Cunning, logic, and intuition",
    power: "Will, spirit, and mental stability",
    charisma: "Personal and physical appeal",
};

export interface Statistics {
    strength: Stat;
    constitution: Stat;
    dexterity: Stat;
    intelligence: Stat;
    power: Stat;
    charisma: Stat;
}

// AJS Damaged Veteran Adjustment will likely need to be refactored when we get there
export interface DamagedVeteranAdjustment {
    name: string;
    description: string;
    statAdjustment: { [key in keyof Statistics]: number };
    skillAdjustment: { [key in keyof Skills]: number };
}
// Extreme Violence
// Add +10% to your Agent’s Occult skill. Reduce SAN by 5. Subtract 3 from your Agent’s CHA and each Bond. Your Agent is adapted to violence (see page 73).
// Captivity or Imprisonment
// Add +10% to your Agent’s Occult skill. Reduce SAN by 5. Subtract 3 from your Agent’s POW. Your Agent is adapted to helplessness (see page 73).
// Hard Experience
// Add +10% to your Agent’s Occult and +10% to any five skills other than Unnatural. This can bring no skill higher than 90%. Reduce your Agent’s SAN by 5. Remove one Bond.
// Things Man Was Not Meant to Know
// Your Agent gains 10% in the Unnatural skill and adds +20% to Occult. Reduce your Agent’s SAN by his or
// her POW. Your Agent gains a new disorder caused by the Unnatural (see page 72). Reset your Agent’s Break- ing Point to his or her new SAN minus POW.

export type StatisticKeys = keyof Statistics;

export const DEFAULT_SKILLS: Skill[] = [
    {
        id: 'accounting',
        name: "Accounting",
        value: 10,
        bonus: 0,
        label: "Accounting",
        reminderText: "Business Math",
        isDefault: true
    },
    {
        id: 'alertness',
        name: "Alertness",
        value: 20,
        bonus: 0,
        label: "Alertness",
        reminderText: "Noticing things",
        isDefault: true
    },
    {
        id: 'anthropology',
        name: "Anthropology",
        value: 0,
        bonus: 0,
        label: "Anthropology",
        reminderText: "Study of humans and their cultures",
        isDefault: true
    },
    {
        id: 'archeology',
        name: "Archeology",
        value: 0,
        bonus: 0,
        label: "Archeology",
        reminderText: "Jurassic Park",
        isDefault: true
    },
    {
        id: 'art',
        name: "Art",
        value: 0,
        bonus: 0,
        label: "Art",
        reminderText: "Painting",
        isDefault: true
    },
    {
        id: 'artillery',
        name: "Artillery",
        value: 0,
        bonus: 0,
        label: "Artillery",
        reminderText: "Making things explode from far away",
        isDefault: true
    },
    {
        id: 'athletics',
        name: "Athletics",
        value: 30,
        bonus: 0,
        label: "Athletics",
        reminderText: "Jumping, ducking, running, climbing, etc",
        isDefault: true
    },
    {
        id: 'bureaucracy',
        name: "Bureaucracy",
        value: 10,
        bonus: 0,
        label: "Bureaucracy",
        reminderText: "Greasing the wheels of government",
        isDefault: true
    },
    {
        id: 'computer-science',
        name: "Computer Science",
        value: 0,
        bonus: 0,
        label: "Computer Science",
        reminderText: "010111100001",
        isDefault: true
    },
    {
        id: 'crafts',
        name: "Crafts",
        value: 0,
        bonus: 0,
        label: "Craft",
        reminderText: "Inner Adam Savage",
        subType: "Macrame",
        isDefault: true
    },
    {
        id: 'criminology',
        name: "Criminology",
        value: 10,
        bonus: 0,
        label: "Criminology",
        reminderText: "Muddying the waters of a crime-scene",
        isDefault: true
    },
    {
        id: 'demolitions',
        name: "Demolitions",
        value: 0,
        bonus: 0,
        label: "Demolitions",
        reminderText: "Controlled explosions",
        isDefault: true
    },
    {
        id: 'disguise',
        name: "Disguise",
        value: 10,
        bonus: 0,
        label: "Disguise",
        reminderText: "Gene Parmesan, he's the best",
        isDefault: true
    },
    {
        id: 'dodge',
        name: "Dodge",
        value: 30,
        bonus: 0,
        label: "Dodge",
        reminderText: "Avoiding getting hit",
        isDefault: true
    },
    {
        id: 'drive',
        name: "Drive",
        value: 20,
        bonus: 0,
        label: "Drive",
        reminderText: "Opearting a motor-vehicle",
        isDefault: true
    },
    {
        id: 'firearms',
        name: "Firearms",
        value: 20,
        bonus: 0,
        label: "Firearms",
        reminderText: "pew-pew",
        isDefault: true
    },
    {
        id: 'first-aid',
        name: "First Aid",
        value: 10,
        bonus: 0,
        label: "First Aid",
        reminderText: "Minor urgent medical care",
        isDefault: true
    },
    {
        id: 'forensics',
        name: "Forensics",
        value: 0,
        bonus: 0,
        label: "Forensics",
        reminderText: "CSI",
        isDefault: true
    },
    {
        id: 'foreign-languages',
        name: "Foreign Languages",
        value: 0,
        bonus: 0,
        label: "Foreign Languages",
        reminderText: "Parles-vous Français?",
        subType: "French",
        isDefault: true
    },
    {
        id: 'heavy-machinery',
        name: "Heavy Machinery",
        value: 10,
        bonus: 0,
        label: "Heavy Machinery",
        reminderText: "Forklifts, cranes, excavators, etc",
        isDefault: true
    },
    {
        id: 'heavy-weapons',
        name: "Heavy Weapons",
        value: 0,
        bonus: 0,
        label: "Heavy Weapons",
        reminderText: "LMGs I think",
        isDefault: true
    },
    {
        id: 'history',
        name: "History",
        value: 10,
        bonus: 0,
        label: "History",
        reminderText: "If you haven't studied it you're doomed to repeat it",
        isDefault: true
    },
    {
        id: 'humint',
        name: "HUMINT",
        value: 10,
        bonus: 0,
        label: "HUMINT",
        reminderText: "Understanding human behavior",
        isDefault: true
    },
    {
        id: 'law',
        name: "Law",
        value: 0,
        bonus: 0,
        label: "Law",
        reminderText: "Lawyering",
        isDefault: true
    },
    {
        id: 'medicine',
        name: "Medicine",
        value: 0,
        bonus: 0,
        label: "Medicine",
        reminderText: "Medical practice",
        isDefault: true
    },
    {
        id: 'melee-weapons',
        name: "Melee Weapons",
        value: 30,
        bonus: 0,
        label: "Melee Weapons",
        reminderText: "Knives, hatchets, swords, etc",
        isDefault: true
    },
    {
        id: 'military-science',
        name: "Military Science",
        value: 0,
        bonus: 0,
        label: "Military Science",
        reminderText: "Military tactics",
        subType: "Land",
        isDefault: true
    },
    {
        id: 'navigate',
        name: "Navigate",
        value: 10,
        bonus: 0,
        label: "Navigate",
        reminderText: "Finding the path",
        isDefault: true
    },
    {
        id: 'occult',
        name: "Occult",
        value: 10,
        bonus: 0,
        label: "Occult",
        reminderText: "Cult shit",
        isDefault: true
    },
    {
        id: 'persuade',
        name: "Persuade",
        value: 20,
        bonus: 0,
        label: "Persuade",
        reminderText: "Convincing people",
        isDefault: true
    },
    {
        id: 'pharmacy',
        name: "Pharmacy",
        value: 0,
        bonus: 0,
        label: "Pharmacy",
        reminderText: "Do you like drugs?",
        isDefault: true
    },
    {
        id: 'pilot',
        name: "Pilot",
        value: 0,
        bonus: 0,
        label: "Pilot",
        reminderText: "Operating flying vehicles",
        isDefault: true
    },
    {
        id: 'psychotherapy',
        name: "Psychotherapy",
        value: 10,
        bonus: 0,
        label: "Psychotherapy",
        reminderText: "Analysing thought",
        isDefault: true
    },
    {
        id: 'ride',
        name: "Ride",
        value: 10,
        bonus: 0,
        label: "Ride",
        reminderText: "Horses and such",
        isDefault: true
    },
    {
        id: 'science',
        name: "Science",
        value: 0,
        bonus: 0,
        label: "Science",
        reminderText: "Physics, Chemistry, Biology, etc",
        subType: "Theoretical Physics",
        isDefault: true
    },
    {
        id: 'search',
        name: "Search",
        value: 20,
        bonus: 0,
        label: "Search",
        reminderText: "Finding things",
        isDefault: true
    },
    {
        id: 'sigint',
        name: "SIGINT",
        value: 0,
        bonus: 0,
        label: "SIGINT",
        reminderText: "Signal intelligence, breaking codes",
        isDefault: true
    },
    {
        id: 'stealth',
        name: "Stealth",
        value: 10,
        bonus: 0,
        label: "Stealth",
        reminderText: "Sneaking around",
        isDefault: true
    },
    {
        id: 'surgery',
        name: "Surgery",
        value: 0,
        bonus: 0,
        label: "Surgery",
        reminderText: "Removing a bullet, stitching a wound",
        isDefault: true
    },
    {
        id: 'survival',
        name: "Survival",
        value: 10,
        bonus: 0,
        label: "Survival",
        reminderText: "Camping, tracking, improvising in nature",
        isDefault: true
    },
    {
        id: 'swim',
        name: "Swim",
        value: 20,
        bonus: 0,
        label: "Swim",
        reminderText: "Moving oneself through water",
        isDefault: true
    },
    {
        id: 'unarmed-combat',
        name: "Unarmed Combat",
        value: 40,
        bonus: 0,
        label: "Unarmed Combat",
        reminderText: "Punch, kick, grapple, bite, etc",
        isDefault: true
    },
    {
        id: 'unnatural',
        name: "Unnatural",
        value: 0,
        bonus: 0,
        label: "Unnatural",
        reminderText: "It's a jeep thing, you wouldn't understand",
        isDefault: true
    },
];


// ajs, replace this with an actual complete character when we get there
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