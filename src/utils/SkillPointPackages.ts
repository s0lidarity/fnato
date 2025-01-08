export type IBonusSkillChoice = {
    skillName: string;
    subType?: string;
}
export type IBonusSkillPackage = {
    name: string;
    skills: IBonusSkillChoice[];
    personalSpecialties?: number;
};

export const createBonusSkillPackage = (
    name: string, 
    skills: IBonusSkillChoice[], 
    personalSpecialties: number = 0
): IBonusSkillPackage => {
    return {
        name,
        skills,
        personalSpecialties,
    };
};

// ARTIST, ACTOR, OR MUSICIAN: Alertness, Craft (choose one), Disguise, Persuade, Art (choose one), Art (choose another), Art (choose another), HUMINT.
export const ArtistBSP = createBonusSkillPackage(
    "Artist",
    [
        { skillName: "Alertness" },
        { skillName: "Crafts", subType: "Macrame" },
        { skillName: "Disguise" },
        { skillName: "Persuade" },
        { skillName: "Art", subType: "Painting" },
        { skillName: "Art", subType: "Scultpture" },
        { skillName: "Art", subType: "Graphic Design" },
        { skillName: "HUMINT" },
    ],
);
// ATHLETE: Alertness, Athletics, Dodge, First Aid, HUMINT, Persuade, Swim, Unarmed Combat.
export const AthleteBSP = createBonusSkillPackage(
    "Athlete",
    [
        { skillName: "Alertness" },
        { skillName: "Athletics" },
        { skillName: "Dodge" },
        { skillName: "First Aid" },
        { skillName: "HUMINT" },
        { skillName: "Persuade" },
        { skillName: "Swim" },
        { skillName: "Unarmed Combat" },
    ],
);
// AUTHOR, EDITOR, OR JOURNALIST: Anthropology, Art (Creative Writing, Journalism, Poetry, Scriptwriting, etc.), Bureaucracy, History, Law, Occult, Persuade, HUMINT.
export const AuthorBSP = createBonusSkillPackage(
    "Author",
    [
        { skillName: "Anthropology" },
        { skillName: "Art", subType: "Creative Writing" },
        { skillName: "Bureaucracy" },
        { skillName: "History" },
        { skillName: "Law" },
        { skillName: "Occult" },
        { skillName: "Persuade" },
        { skillName: "HUMINT" },
    ],
);
// “BLACK BAG” TRAINING: Alertness, Athletics, Craft (Ele- trician), Craft (Locksmithing), Criminology, Disguise, Search, Stealth.
export const BlackBagBSP = createBonusSkillPackage(
    "Black Bag",
    [
        { skillName: "Alertness" },
        { skillName: "Athletics" },
        { skillName: "Crafts", subType: "Electrical" },
        { skillName: "Crafts", subType: "Locksmithing" },
        { skillName: "Criminology" },
        { skillName: "Disguise" },
        { skillName: "Search" },
        { skillName: "Stealth" },
    ],
);
// BLUE-COLLAR WORKER: Alertness, Craft (choose one), Craft (choose another), Drive, First Aid, Heavy Ma- chinery, Navigate, Search.

// BUREAUCRAT: Accounting, Bureaucracy, Computer Sci- ence, Criminology, HUMINT, Law, Persuade, and one other as a personal specialty.
export const BureaucratBSP = createBonusSkillPackage(
    "Bureaucrat",
    [
        { skillName: "Accounting" },
        { skillName: "Bureaucracy" },
        { skillName: "Computer Science" },
        { skillName: "Criminology" },
        { skillName: "HUMINT" },
        { skillName: "Law" },
        { skillName: "Persuade" },
    ],
    1,
);

// CLERGY: Foreign Languagess (choose three), History, HUMINT, Occult, Persuade, Psychotherapy.
export const ClergyBSP = createBonusSkillPackage(
    "Clergy",
    [
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "Foreign Languages", subType: "German" },
        { skillName: "Foreign Languages", subType: "Spanish" },
        { skillName: "History" },
        { skillName: "HUMINT" },
        { skillName: "Occult" },
        { skillName: "Persuade" },
        { skillName: "Psychotherapy" },
    ],
);
// COMBAT VETERAN: Alertness, Dodge, Firearms, First Aid, Heavy Weapons, Melee Weapons, Stealth, Unarmed Combat.
export const CombatVeteranBSP = createBonusSkillPackage(
    "Combat Veteran",
    [
        { skillName: "Alertness" },
        { skillName: "Dodge" },
        { skillName: "Firearms" },
        { skillName: "First Aid" },
        { skillName: "Heavy Weapons" },
        { skillName: "Melee Weapons" },
        { skillName: "Stealth" },
        { skillName: "Unarmed Combat" },
    ],
);
// COMPUTER ENTHUSIAST OR HACKER: Computer Science, Craft (Microelectronics), Science (Mathematics), SIGINT, and any four others as personal specialties.
export const ComputerEnthusiastBSP = createBonusSkillPackage(
    "Computer Enthusiast",
    [
        { skillName: "Computer Science" },
        { skillName: "Craft", subType: "Microelectronics" },
        { skillName: "Science", subType: "Mathematics" },
        { skillName: "SIGINT" },
    ],
    4,
);
// COUNSELOR: Bureaucracy, First Aid, Foreign Languages (choose one), HUMINT, Law, Persuade, Psychotherapy, Search.
export const CounselorBSP = createBonusSkillPackage(
    "Counselor",
    [
        { skillName: "Bureaucracy" },
        { skillName: "First Aid" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "HUMINT" },
        { skillName: "Law" },
        { skillName: "Persuade" },
        { skillName: "Psychotherapy" },
        { skillName: "Search" },
    ],
);
// CRIMINALIST: Accounting, Bureaucracy, Computer Sci- ence, Criminology, Forensics, Law, Pharmacy, Search.
export const CriminalistBSP = createBonusSkillPackage(
    "Criminalist",
    [
        { skillName: "Accounting" },
        { skillName: "Bureaucracy" },
        { skillName: "Computer Science" },
        { skillName: "Criminology" },
        { skillName: "Forensics" },
        { skillName: "Law" },
        { skillName: "Pharmacy" },
        { skillName: "Search" },
    ],
);
// FIREFIGHTER: Alertness, Demolitions, Drive, First Aid, Forensics, Heavy Machinery, Navigate, Search.
export const FirefighterBSP = createBonusSkillPackage(
    "Firefighter",
    [
        { skillName: "Alertness" },
        { skillName: "Demolitions" },
        { skillName: "Drive" },
        { skillName: "First Aid" },
        { skillName: "Forensics" },
        { skillName: "Heavy Machinery" },
        { skillName: "Navigate" },
        { skillName: "Search" },
    ],
);
// GANGSTER OR DEEP COVER: Alertness, Criminology, Dodge, Drive, Persuade, Stealth; choose two from: Athletics, Foreign Languages (choose one), Firearms, HUMINT, Melee Weapons, Pharmacy, or Unarmed Combat.
export const GangsterBSP = createBonusSkillPackage(
    "Gangster",
    [
        { skillName: "Alertness" },
        { skillName: "Criminology" },
        { skillName: "Dodge" },
        { skillName: "Drive" },
        { skillName: "Persuade" },
        { skillName: "Stealth" },
    ],
    2,
);
// INTERROGATOR: Criminology, Foreign Languages (choose one), Foreign Languages (choose another), HUMINT, Law, Persuade, Pharmacy, Search.
export const InterrogatorBSP = createBonusSkillPackage(
    "Interrogator",
    [
        { skillName: "Criminology" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "Foreign Languages", subType: "German" },
        { skillName: "HUMINT" },
        { skillName: "Law" },
        { skillName: "Persuade" },
        { skillName: "Pharmacy" },
        { skillName: "Search" },
    ],
);
// LIBERAL ARTS DEGREE: Anthropology or Archeology, Art (choose one), Foreign Languages (choose one), History, Persuade, and any three others as personal specialties.
export const LiberalArtsDegreeBSP = createBonusSkillPackage(
    "Liberal Arts Degree",
    [
        { skillName: "Anthropology" },
        { skillName: "Archeology" },
        { skillName: "Art", subType: "Painting" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "History" },
        { skillName: "Persuade" },
    ],
    3,
);
// MILITARY OFFICER: Bureaucracy, Firearms, History, Military Science (choose one), Navigate, Persuade, Un- armed Combat; choose one: Artillery, Heavy Machinery, Heavy Weapons, HUMINT, Pilot (choose one), or SIGINT.
export const MilitaryOfficerBSP = createBonusSkillPackage(
    "Military Officer",
    [
        { skillName: "Bureaucracy" },
        { skillName: "Firearms" },
        { skillName: "History" },
        { skillName: "Military Science", subType: "Land" },
        { skillName: "Navigate" },
        { skillName: "Persuade" },
        { skillName: "Unarmed Combat" },
    ],
);
// MBA: Accounting, Bureaucracy, HUMINT, Law, Per- suade, and any three others as personal specialties.
export const MBABSP = createBonusSkillPackage(
    "MBA",
    [
        { skillName: "Accounting" },
        { skillName: "Bureaucracy" },
        { skillName: "HUMINT" },
        { skillName: "Law" },
        { skillName: "Persuade" },
    ],
    3,
);
// NURSE, PARAMEDIC, OR PRE-MED: Alertness, First Aid, Medicine, Persuade, Pharmacy, Psychotherapy, Science (Biology), Search.
export const NurseBSP = createBonusSkillPackage(
    "Nurse",
    [
        { skillName: "Alertness" },
        { skillName: "First Aid" },
        { skillName: "Medicine" },
        { skillName: "Persuade" },
        { skillName: "Pharmacy" },
        { skillName: "Psychotherapy" },
        { skillName: "Science", subType: "Biology" },
        { skillName: "Search" },
    ],
);
// OCCULT INVESTIGATOR OR CONSPIRACY THEORIST: Anthro- pology, Archeology, Computer Science, Criminology, History, Occult, Persuade, Search.
export const OccultInvestigatorBSP = createBonusSkillPackage(
    "Occult Investigator",
    [
        { skillName: "Anthropology" },
        { skillName: "Archeology" },
        { skillName: "Computer Science" },
        { skillName: "Criminology" },
        { skillName: "History" },
        { skillName: "Occult" },
        { skillName: "Persuade" },
        { skillName: "Search" },
    ],
);
// OUTDOORSMAN: Alertness, Athletics, Firearms, Navi- gate, Ride, Search, Stealth, Survival.
export const OutdoormanBSP = createBonusSkillPackage(
    "Outdoorman",
    [
        { skillName: "Alertness" },
        { skillName: "Athletics" },
        { skillName: "Firearms" },
        { skillName: "Navigate" },
        { skillName: "Ride" },
        { skillName: "Search" },
        { skillName: "Stealth" },
        { skillName: "Survival" },
    ],
);
// PHOTOGRAPHER: Alertness, Art (Photography), Com- puter Science, Persuade, Search, Stealth, and any two others as personal specialties.
export const PhotographerBSP = createBonusSkillPackage(
    "Photographer",
    [
        { skillName: "Alertness" },
        { skillName: "Art", subType: "Photography" },
        { skillName: "Computer Science" },
        { skillName: "Persuade" },
        { skillName: "Search" },
        { skillName: "Stealth" },
    ],
    2,
);
// PILOT OR SAILOR: Alertness, Craft (Mechanic), First Aid, Foreign Languages (choose one), Navigate, Pilot (choose one), Survival, Swim.
export const PilotOrSailorBSP = createBonusSkillPackage(
    "Pilot or Sailor",
    [
        { skillName: "Alertness" },
        { skillName: "Craft", subType: "Mechanic" },
        { skillName: "First Aid" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "Navigate" },
        { skillName: "Pilot", subType: "Air" },
        { skillName: "Survival" },
        { skillName: "Swim" },
    ],
);
// POLICE OFFICER: Alertness, Criminology, Drive, Firearms, HUMINT, Law, Melee Weapons, Unarmed Combat.
export const PoliceOfficerBSP = createBonusSkillPackage(
    "Police Officer",
    [
        { skillName: "Alertness" },
        { skillName: "Criminology" },
        { skillName: "Drive" },
        { skillName: "Firearms" },
        { skillName: "HUMINT" },
        { skillName: "Law" },
        { skillName: "Melee Weapons" },
        { skillName: "Unarmed Combat" },
    ],
);
// SCIENCE GRAD STUDENT: Bureaucracy, Computer Sci- ence, Craft (choose one), Foreign Languages (choose one), Science (choose one), Science (choose another), Science (choose another); choose one: Accounting, Forensics, Law, or Pharmacy.
export const ScienceGradStudentBSP = createBonusSkillPackage(
    "Science Grad Student",
    [
        { skillName: "Bureaucracy" },
        { skillName: "Computer Science" },
        { skillName: "Craft", subType: "Microelectronics" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "Science", subType: "Mathematics" },
        { skillName: "Science", subType: "Physics" },
        { skillName: "Science", subType: "Chemistry" },
    ],
);
// SOCIAL WORKER OR CRIMINAL JUSTICE DEGREE: Bureaucracy, Criminology, Forensics, Foreign Languages (choose one), HUMINT, Law, Persuade, Search.
export const SocialWorkerBSP = createBonusSkillPackage(
    "Social Worker",
    [
        { skillName: "Bureaucracy" },
        { skillName: "Criminology" },
        { skillName: "Forensics" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "HUMINT" },
        { skillName: "Law" },
        { skillName: "Persuade" },
        { skillName: "Search" },
    ],
);
// SOLDIER OR MARINE: Alertness, Artillery, Athletics, Drive, Firearms, Heavy Weapons, Military Science (Land), Unarmed Combat.
export const SoldierOrMarineBSP = createBonusSkillPackage(
    "Soldier or Marine",
    [
        { skillName: "Alertness" },
        { skillName: "Artillery" },
        { skillName: "Athletics" },
        { skillName: "Drive" },
        { skillName: "Firearms" },
        { skillName: "Heavy Weapons" },
        { skillName: "Military Science", subType: "Land" },
        { skillName: "Unarmed Combat" },
    ],
);
// TRANSLATOR: Anthropology, Foreign Languages (choose one), Foreign Languages (choose another), Foreign Languages (choose another), History, HUMINT, Per- suade, and any one other as a personal specialty.
export const TranslatorBSP = createBonusSkillPackage(
    "Translator",
    [
        { skillName: "Anthropology" },
        { skillName: "Foreign Languages", subType: "French" },
        { skillName: "Foreign Languages", subType: "German" },
        { skillName: "Foreign Languages", subType: "Spanish" },
        { skillName: "History" },
        { skillName: "HUMINT" },
        { skillName: "Persuade" },
    ],
);
// URBAN EXPLORER: Alertness, Athletics, Craft (choose one), Law, Navigate, Persuade, Search, Stealth.
export const UrbanExplorerBSP = createBonusSkillPackage(
    "Urban Explorer",
    [
        { skillName: "Alertness" },
        { skillName: "Athletics" },
        { skillName: "Craft", subType: "Mechanic" },
        { skillName: "Law" },
        { skillName: "Navigate" },
        { skillName: "Persuade" },
        { skillName: "Search" },
        { skillName: "Stealth" },
    ],
);

export const BonusSkillPackages = {
    ArtistBSP,
    AthleteBSP,
    AuthorBSP,
    BlackBagBSP,
    BureaucratBSP,
    ClergyBSP,
    CombatVeteranBSP,
    ComputerEnthusiastBSP,
    CounselorBSP,
    CriminalistBSP,
    FirefighterBSP,
    GangsterBSP,
    InterrogatorBSP,
    LiberalArtsDegreeBSP,
    MilitaryOfficerBSP,
    MBABSP,
    NurseBSP,
    OccultInvestigatorBSP,
    OutdoormanBSP,
    PhotographerBSP,
    PilotOrSailorBSP,
    PoliceOfficerBSP,
    ScienceGradStudentBSP,
    SocialWorkerBSP,
    SoldierOrMarineBSP,
    TranslatorBSP,
    UrbanExplorerBSP,
};