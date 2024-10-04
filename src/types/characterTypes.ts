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

export interface optionalSkills {
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

export const skillReminders: { [key in keyof Skills]: string } = {
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

export const skillBaseValues: { [key in keyof Skills]: number } = {
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

export const statReminders: { [key in keyof Statistics]: string } = {
    strength: "represents raw physical power",
    constitution: "represents health and hardiness",
    dexterity: "represents speed and physical agility",
    intelligence: "represents cunning, logic, and intuition",
    power: "represents will, spirit, and mental stability",
    charisma: "represents personal and physical appeal",
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