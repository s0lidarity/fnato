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
    profession: Profession;
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

export interface OptionalSkills {
    ForeignLanguages?: Skill[];
    OtherSkills?: Skill[];
}

// I need to map the professions in a constant or something
// might be better as an api in the future
export interface Profession {
    affiliation?: string;
    professionalSkills: Skill[];
    bondCount: number;
    recommendedStats: StatisticKeys[];
    chosenSkills: Skill[];
    chosenSkillCount: number;
}

export interface Skill {
    value: number;
    base: number;
    bonus: boolean;
    reminderText?: string;
}

export const SKILL_REMINDERS: { [key in keyof Skills]: string } = {
    Accounting: "Business Math",
    Alertness: "Noticing things",
    Anthropology: "Study of ",
    Archeology: "Jurassic Park",
    Art: "Painting",
    Artillery: "Making things explode from far away",
    Athletics: "Jumping, ducking, running, climbing, etc",
    Bureaucracy: "Greasing the wheels of government",
    ComputerScience: "010111100001",
    Craft: "Inner Adam Savage",
    Criminology: "Muddying the waters of a crime-scene",
    Demolitions: "Controlled explosions",
    Disguise: "Gene Parmesan, he's the best",
    Dodge: "Avoiding getting hit",
    Drive: "Opearting a motor-vehicle",
    Firearms: "pew-pew",
    FirstAid: "Minor urgent medical care",
    Forensics: "CSI",
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

export const SKILL_BASE_VALUES: { [key in keyof Skills]: number } = {
    Accounting: 10,
    Alertness: 20,
    Anthropology: 0,
    Archeology: 0,
    Art: 0,
    Artillery: 0,
    Athletics: 30,
    Bureaucracy: 10,
    ComputerScience: 0,
    Craft: 0,
    Criminology: 10,
    Demolitions: 0,
    Disguise: 10,
    Dodge: 30,
    Drive: 20,
    Firearms: 20,
    FirstAid: 10,
    Forensics: 0,
    HeavyMachinery: 10,
    HeavyWeapons: 0,
    History: 10,
    HUMINT: 10,
    Law: 0,
    Medicine: 0,
    MeleeWeapons: 30,
    MilitaryScience: 0,
    Navigate: 10,
    Occult: 10,
    Persuade: 20,
    Pharmacy: 0,
    Pilot: 0,
    Psychotherapy: 10,
    Ride: 10,
    Science: 0,
    Search: 20,
    SIGINT: 0,
    Stealth: 10,
    Surgery: 0,
    Survival: 10,
    Swim: 20,
    UnarmedCombat: 40,
    Unnatural: 0,
};

// need to account for optional skills in here
// multiple foreign languages
// multiple optional/custom skills
export interface Skills {
    Accounting: Skill;
    Alertness: Skill;
    Anthropology: Skill;
    Archeology: Skill;
    Art: Skill;
    Artillery: Skill;
    Athletics: Skill;
    Bureaucracy: Skill;
    ComputerScience: Skill;
    Craft: Skill;
    Criminology: Skill;
    Demolitions: Skill;
    Disguise: Skill;
    Dodge: Skill;
    Drive: Skill;
    Firearms: Skill;
    FirstAid: Skill;
    Forensics: Skill;
    HeavyMachinery: Skill;
    HeavyWeapons: Skill;
    History: Skill;
    HUMINT: Skill;
    Law: Skill;
    Medicine: Skill;
    MeleeWeapons: Skill;
    MilitaryScience: Skill;
    Navigate: Skill;
    Occult: Skill;
    Persuade: Skill;
    Pharmacy: Skill;
    Pilot: Skill;
    Psychotherapy: Skill;
    Ride: Skill;
    Science: Skill;
    Search: Skill;
    SIGINT: Skill;
    Stealth: Skill;
    Surgery: Skill;
    Survival: Skill;
    Swim: Skill;
    UnarmedCombat: Skill;
    Unnatural: Skill;
}

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

interface DamagedVeteranAdjustment {

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


const character = {
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