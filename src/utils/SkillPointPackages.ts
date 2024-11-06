// Optional Bonus Skill Point Packages
// What did your Agent do before his or her current profession? 
// If you like, grab a package to quickly choose the eight skills for your Agent’s bonus skill points 
// these give a flat +20 to the selected bonus skills

import { Skill, Skills } from "../types/characterTypes";

export type BonusSkillChoice = 
| [string]                // skill without subtype
| [string, string]         // skill with subtype

export type IBonusSkillPackage = [
    BonusSkillChoice,
    BonusSkillChoice,
    BonusSkillChoice,
    BonusSkillChoice,
    BonusSkillChoice,
    BonusSkillChoice,
    BonusSkillChoice,
    BonusSkillChoice // 8 total
];

export const createBonusSkillPackage = (skills: IBonusSkillPackage): IBonusSkillPackage => {
    return skills;
};

// ARTIST, ACTOR, OR MUSICIAN: Alertness, Craft (choose one), Disguise, Persuade, Art (choose one), Art (choose another), Art (choose another), HUMINT.
export const ArtistBSP = createBonusSkillPackage([
    ["alertness"],
    ["crafts"],
    ["disguise"],
    ["persuade"],
    ["art", "Creative Writing"],
    ["art", "Journalism"],
    ["art", "Poetry"],
    ["humint"],
]);
// ATHLETE: Alertness, Athletics, Dodge, First Aid, HUMINT, Persuade, Swim, Unarmed Combat.
export const AthleteBSP = createBonusSkillPackage([
    ["alertness"],
    ["athletics"],
    ["dodge"],
    ["first-aid"],
    ["humint"],
    ["persuade"],
    ["swim"],
    ["unarmed-combat"],
]);
// AUTHOR, EDITOR, OR JOURNALIST: Anthropology, Art (Creative Writing, Journalism, Poetry, Scriptwriting, etc.), Bureaucracy, History, Law, Occult, Persuade, HUMINT.
export const AuthorBSP = createBonusSkillPackage([
    ["anthropology"],
    ["art", "Creative Writing"],
    ["bureaucracy"],
    ["history"],
    ["law"],
    ["occult"],
    ["persuade"],
    ["humint"],
]);
// “BLACK BAG” TRAINING: Alertness, Athletics, Craft (Ele- trician), Craft (Locksmithing), Criminology, Disguise, Search, Stealth.
export const BlackBagBSP = createBonusSkillPackage([
    ["alertness"],
    ["athletics"],
    ["crafts", "Electrical"],
    ["crafts", "Locksmithing"],
    ["criminology"],
    ["disguise"],
    ["search"],
    ["stealth"],
]);
// BLUE-COLLAR WORKER: Alertness, Craft (choose one), Craft (choose another), Drive, First Aid, Heavy Ma- chinery, Navigate, Search.
// BUREAUCRAT: Accounting, Bureaucracy, Computer Sci- ence, Criminology, HUMINT, Law, Persuade, and one other as a personal specialty.
// CLERGY: Foreign Languages (choose three), History, HUMINT, Occult, Persuade, Psychotherapy.
// COMBAT VETERAN: Alertness, Dodge, Firearms, First Aid, Heavy Weapons, Melee Weapons, Stealth, Unarmed Combat.
// COMPUTER ENTHUSIAST OR HACKER: Computer Science, Craft (Microelectronics), Science (Mathematics), SIGINT, and any four others as personal specialties.
// COUNSELOR: Bureaucracy, First Aid, Foreign Language (choose one), HUMINT, Law, Persuade, Psychothera- py, Search.
// CRIMINALIST: Accounting, Bureaucracy, Computer Sci- ence, Criminology, Forensics, Law, Pharmacy, Search.
// FIREFIGHTER: Alertness, Demolitions, Drive, First Aid, Forensics, Heavy Machinery, Navigate, Search.
// GANGSTER OR DEEP COVER: Alertness, Criminology, Dodge, Drive, Persuade, Stealth; choose two from: Athletics, Foreign Language (choose one), Firearms, HUMINT, Melee Weapons, Pharmacy, or Unarmed Combat.
// INTERROGATOR: Criminology, Foreign Language (choose one), Foreign Language (choose another), HUMINT, Law, Persuade, Pharmacy, Search.
// LIBERAL ARTS DEGREE: Anthropology or Archeology, Art (choose one), Foreign Language (choose one), History, Persuade, and any three others as personal specialties.
// MILITARY OFFICER: Bureaucracy, Firearms, History, Mil- itary Science (choose one), Navigate, Persuade, Un- armed Combat; choose one: Artillery, Heavy Machin- ery, Heavy Weapons, HUMINT, Pilot (choose one), or SIGINT.
// MBA: Accounting, Bureaucracy, HUMINT, Law, Per- suade, and any three others as personal specialties.
// NURSE, PARAMEDIC, OR PRE-MED: Alertness, First Aid, Medicine, Persuade, Pharmacy, Psychotherapy, Science (Biology), Search.
// OCCULT INVESTIGATOR OR CONSPIRACY THEORIST: Anthro- pology, Archeology, Computer Science, Criminology, History, Occult, Persuade, Search.
// OUTDOORSMAN: Alertness, Athletics, Firearms, Navi- gate, Ride, Search, Stealth, Survival.
// PHOTOGRAPHER: Alertness, Art (Photography), Com- puter Science, Persuade, Search, Stealth, and any two others as personal specialties.
// PILOT OR SAILOR: Alertness, Craft (Mechanic), First Aid, Foreign Language (choose one), Navigate, Pilot (choose one), Survival, Swim.
// POLICE OFFICER: Alertness, Criminology, Drive, Firearms, HUMINT, Law, Melee Weapons, Unarmed Combat.
// SCIENCE GRAD STUDENT: Bureaucracy, Computer Sci- ence, Craft (choose one), Foreign Language (choose one), Science (choose one), Science (choose another), Science (choose another); choose one: Accounting, Forensics, Law, or Pharmacy.
// SOCIAL WORKER OR CRIMINAL JUSTICE DEGREE: Bureaucracy, Criminology, Forensics, Foreign Language (choose one), HUMINT, Law, Persuade, Search.
// SOLDIER OR MARINE: Alertness, Artillery, Athletics, Drive, Firearms, Heavy Weapons, Military Science (Land), Unarmed Combat.
// TRANSLATOR: Anthropology, Foreign Language (choose one), Foreign Language (choose another), Foreign Language (choose another), History, HUMINT, Per- suade, and any one other as a personal specialty.
// URBAN EXPLORER: Alertness, Athletics, Craft (choose one), Law, Navigate, Persuade, Search, Stealth.

export const BonusSkillPackages = {
    ArtistBSP,
    AthleteBSP,
    AuthorBSP,
    BlackBagBSP,
};