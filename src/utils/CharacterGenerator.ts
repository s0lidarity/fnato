import { RollResult } from './../types/diceTypes';
import {
	Bond,
	Character,
	DerivedAttribute,
	DerivedAttributes,
	DetailedDescription,
	DISTINGUISHING_FEATURES,
	Profession,
	Skill,
	SKILL_BASE_VALUES,
	Stat,
	Statistics,
	StatisticKeys,
	STAT_REMINDERS,
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
	strength: { ...baseStat, reminderText: STAT_REMINDERS.strength },
	constitution: { ...baseStat, reminderText: STAT_REMINDERS.constitution },
	dexterity: { ...baseStat, reminderText: STAT_REMINDERS.dexterity },
	intelligence: { ...baseStat, reminderText: STAT_REMINDERS.intelligence },
	power: { ...baseStat, reminderText: STAT_REMINDERS.power },
	charisma: { ...baseStat, reminderText: STAT_REMINDERS.charisma },
};

export const initializeSkills = (): Skills => {
	const skills: Partial<Skills> = {};

	for (const skill in SKILL_BASE_VALUES) {
		if (SKILL_BASE_VALUES.hasOwnProperty(skill)) {
			skills[skill as keyof Skills] = {
				value: SKILL_BASE_VALUES[skill as keyof Skills],
				base: SKILL_BASE_VALUES[skill as keyof Skills],
				bonus: false,
			} as Skill;
		}
	}

	return skills as Skills;
};

export function calculateDerivedAttributes(stats: Statistics): DerivedAttributes {
	const referenceSanity = stats.power.score * 5;

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
			maxValue: referenceSanity,
			currentValue: referenceSanity,
		},
		// AJS fix this, always zero at the moment
		breakingPoint: {
			maxValue: referenceSanity - stats.power.score,
			currentValue: referenceSanity - stats.power.score,
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

// this could be more clever to run faster, but this is easier to read and follow
export function rollDice(dSize: number, count: number, drop: number = 0): RollResult {
	const roll = () => Math.floor(Math.random() * dSize) + 1;
	let total = 0;
	let rolls = [];
	for (let i = 0; i < count; i++) {
		rolls.push(roll());
	};
	rolls.sort();
	rolls = rolls.slice(drop);
	total = rolls.reduce((acc, val) => acc + val, 0);
	return { result: total, rolls: rolls };
}

// AJS: this should probably be a constructor that takes in a rollResult, otherwise we lose the array of rolls
export function generateStat(name: string, rr: RollResult): Stat {
	if (!STAT_REMINDERS.hasOwnProperty(name) || !rr?.result || rr.result < 3 || rr.result > 18) {
		return null;
	};
	return {
		score: rr.result,
		x5: rr.result * 5,
		distinguishingFeature: DISTINGUISHING_FEATURES[name][rr.result],
		reminderText: STAT_REMINDERS[name],
	}
}

