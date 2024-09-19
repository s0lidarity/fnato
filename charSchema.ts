
interface Statistics {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    power: number;
    charisma: number;
}

interface DerivedAttributes {
    // needs max and current
    hitPoints: number; // strength + constitution / 2 round up
    willPower: number; // power
    sanity: number; // power x 5
    breakingPoint: number; // sanity - power
}

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