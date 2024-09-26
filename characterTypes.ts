interface Bond {
    name: string;
    detail: string;
    score: number;
}

interface DerivedAttribute {
    name: string;
    currentValue: number;
    maxValue: number;
}
interface DerivedAttributes {
    // needs max and current
    hitPoints: DerivedAttribute; // strength + constitution / 2 round up
    willPower: DerivedAttribute; // power
    sanity: DerivedAttribute; // power x 5
    breakingPoint: DerivedAttribute; // sanity - power
}
interface DetailedDescription {
    name: string;
    age: number;
    appearance: string;
    residence: string; // maybe make it city, state, country
    education: string;
    personality: string;
    beliefs: string;
    hobbies: string;
    obsessions: string;
    motivations: string;
    admire: string;
    dislike: string;
    trustInDeltaGreen: string;
    deltaGreenAgreement: string;
}
interface Profession {
    name: string;
    affiliation: string;
    professionalSkills: Skill[];
    bondCount: number;
    recommendedStats: StatisticKeys[];
    chosenSkills: Skill[];
    chosenSkillCount: number;
}
interface Skill {
    name: string;
    value: number;
    base: number;
    bonus: boolean;
}
interface Stat {
    name: string;
    score: number;
    x5: number;
    distinguishingFeature: string;
}
interface Statistics {
    strength: Stat;
    dexterity: Stat;
    constitution: Stat;
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

type StatisticKeys = keyof Statistics;


const character = {
    // roll 4d6, drop the lowest or assign from a pool of 72 points
    statistics:{
        // min 3, max 18
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        power: 10,
        charisma: 10,
    },
    derivedAttributes:{

    },
    profession:{

    },
    skills:{
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
    bonds:[
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
    motivations:[
        "money",
        "fame",
    ],
    mentalDisorders:[
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