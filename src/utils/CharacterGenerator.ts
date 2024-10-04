import {
	Bond,
	Character,
	DerivedAttribute,
	DerivedAttributes,
	DetailedDescription,
	Profession,
	Skill,
	skillBaseValues,
	Stat,
	Statistics,
	StatisticKeys,
	statReminders,
	Skills,
} from '../types/characterTypes';

const baseBonds: Bond[] = [
	{
		name: 'Alex Smith',
		detail: 'Spouse',
		score: 7,
		type: 'Individual',
	},
	{
		name: 'PTA',
		detail: 'Parent Teacher Association',
		score: 5,
		type: 'Group',
	},
];

// AJS: generate some of this with Faker.js
const baseDetailedDescription: DetailedDescription = {
	name: 'Homer Thompson',
	age: 35,
	appearance: 'Average height, brown hair, blue eyes, average build',
	residence: '742 Evergreen Terrace, Point Roberts, WA 98281 USA',
	education: 'Bachelor of Science in Computer Science',
	personality: 'Introverted, analytical, loyal',
	beliefs: 'Agnostic',
	hobbies: 'Reading, hiking, camping',
	obsessions: 'Solar flares',
	motivations: 'Family, financial security',
	admire: 'Zaphod Beeblebrox',
	dislike: 'Cruelty',
	trustInDeltaGreen: 'Somewhat',
	deltaGreenAgreement: 'Yes',
};

const baseProfession: Profession = {
	affiliation: 'Private Sector',
	professionalSkills: [],
	bondCount: 2,
	recommendedStats: ['intelligence', 'power'],
	chosenSkills: [],
	chosenSkillCount: 0,
};

const baseStat: Stat = {
	score: 10,
	x5: 50,
	distinguishingFeature: ''
};

const baseStats: Statistics = {
	strength: { ...baseStat, reminderText: statReminders.strength },
	constitution: { ...baseStat, reminderText: statReminders.constitution },
	dexterity: { ...baseStat, reminderText: statReminders.dexterity },
	intelligence: { ...baseStat, reminderText: statReminders.intelligence },
	power: { ...baseStat, reminderText: statReminders.power },
	charisma: { ...baseStat, reminderText: statReminders.charisma },
};

export const initializeSkills = (): Skills => {
	const skills: Partial<Skills> = {};

	for (const skill in skillBaseValues) {
		if (skillBaseValues.hasOwnProperty(skill)) {
			skills[skill as keyof Skills] = {
				value: skillBaseValues[skill as keyof Skills],
				base: skillBaseValues[skill as keyof Skills],
				bonus: false,
			} as Skill;
		}
	}

	return skills as Skills;
};

export function calculateDerivedAttributes(stats: Statistics): DerivedAttributes {
	return {
		hitPoints: {
			maxValue: Math.ceil((stats.strength.score + stats.constitution.score) / 2),
			currentValue: Math.ceil((stats.strength.score + stats.constitution.score) / 2),
		},
		willPower: {
			maxValue: stats.power.score,
			currentValue: stats.power.score,
		},
		sanity: {
			maxValue: stats.power.score * 5,
			currentValue: stats.power.score * 5,
		},
		breakingPoint: {
			maxValue: stats.power.score - stats.power.score,
			currentValue: stats.power.score - stats.power.score,
		},
	};
}

export function createDefaultCharacter(): Character {

	return {
		bonds: baseBonds,
		derivedAttributes: calculateDerivedAttributes(baseStats),
		detailedDescription: baseDetailedDescription,
		profession: baseProfession,
		skills: initializeSkills(),
		statistics: baseStats,
	}
}