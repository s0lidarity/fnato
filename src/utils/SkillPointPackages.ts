// Optional Bonus Skill Point Packages
// What did your Agent do before his or her current profession? 
// If you like, grab a package to quickly choose the eight skills for your Agent’s bonus skill points 
// these give a flat +20 to the selected bonus skills

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


// AJS we're going to need a way to apply the bonsus skills to skills from skillscontext
// need to add a new skill when 'choose another' is applied
// choose any 'gives bonus skill points to be added'

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
export const BeurocratBSP = createBonusSkillPackage(
    "Beurocrat",
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
// COMPUTER ENTHUSIAST OR HACKER: Computer Science, Craft (Microelectronics), Science (Mathematics), SIGINT, and any four others as personal specialties.
// COUNSELOR: Bureaucracy, First Aid, Foreign Languages (choose one), HUMINT, Law, Persuade, Psychothera- py, Search.
// CRIMINALIST: Accounting, Bureaucracy, Computer Sci- ence, Criminology, Forensics, Law, Pharmacy, Search.
// FIREFIGHTER: Alertness, Demolitions, Drive, First Aid, Forensics, Heavy Machinery, Navigate, Search.
// GANGSTER OR DEEP COVER: Alertness, Criminology, Dodge, Drive, Persuade, Stealth; choose two from: Athletics, Foreign Languages (choose one), Firearms, HUMINT, Melee Weapons, Pharmacy, or Unarmed Combat.
// INTERROGATOR: Criminology, Foreign Languages (choose one), Foreign Languages (choose another), HUMINT, Law, Persuade, Pharmacy, Search.
// LIBERAL ARTS DEGREE: Anthropology or Archeology, Art (choose one), Foreign Languages (choose one), History, Persuade, and any three others as personal specialties.
// MILITARY OFFICER: Bureaucracy, Firearms, History, Mil- itary Science (choose one), Navigate, Persuade, Un- armed Combat; choose one: Artillery, Heavy Machin- ery, Heavy Weapons, HUMINT, Pilot (choose one), or SIGINT.
// MBA: Accounting, Bureaucracy, HUMINT, Law, Per- suade, and any three others as personal specialties.
// NURSE, PARAMEDIC, OR PRE-MED: Alertness, First Aid, Medicine, Persuade, Pharmacy, Psychotherapy, Science (Biology), Search.
// OCCULT INVESTIGATOR OR CONSPIRACY THEORIST: Anthro- pology, Archeology, Computer Science, Criminology, History, Occult, Persuade, Search.
// OUTDOORSMAN: Alertness, Athletics, Firearms, Navi- gate, Ride, Search, Stealth, Survival.
// PHOTOGRAPHER: Alertness, Art (Photography), Com- puter Science, Persuade, Search, Stealth, and any two others as personal specialties.
// PILOT OR SAILOR: Alertness, Craft (Mechanic), First Aid, Foreign Languages (choose one), Navigate, Pilot (choose one), Survival, Swim.
// POLICE OFFICER: Alertness, Criminology, Drive, Firearms, HUMINT, Law, Melee Weapons, Unarmed Combat.
// SCIENCE GRAD STUDENT: Bureaucracy, Computer Sci- ence, Craft (choose one), Foreign Languages (choose one), Science (choose one), Science (choose another), Science (choose another); choose one: Accounting, Forensics, Law, or Pharmacy.
// SOCIAL WORKER OR CRIMINAL JUSTICE DEGREE: Bureaucracy, Criminology, Forensics, Foreign Languages (choose one), HUMINT, Law, Persuade, Search.
// SOLDIER OR MARINE: Alertness, Artillery, Athletics, Drive, Firearms, Heavy Weapons, Military Science (Land), Unarmed Combat.
// TRANSLATOR: Anthropology, Foreign Languages (choose one), Foreign Languages (choose another), Foreign Languages (choose another), History, HUMINT, Per- suade, and any one other as a personal specialty.
// URBAN EXPLORER: Alertness, Athletics, Craft (choose one), Law, Navigate, Persuade, Search, Stealth.

export const BonusSkillPackages = {
    ArtistBSP,
    AthleteBSP,
    AuthorBSP,
    BlackBagBSP,
    BeurocratBSP,
    ClergyBSP,
};