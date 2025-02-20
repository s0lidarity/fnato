import { 
    Profession, 
    Anthropologist, 
    Engineer,
    FederalAgent 
} from '../Professions';
import { DEFAULT_SKILLS } from '../../types/characterTypes';

describe('Profession Class', () => {
    describe('createSkill', () => {
        it('should create a skill with correct properties', () => {
            const skill = Profession.createSkill('firearms', 50);
            const defaultSkill = DEFAULT_SKILLS.find(s => s.id === 'firearms');

            expect(skill).toEqual({
                id: 'firearms',
                name: defaultSkill.name,
                value: 50,
                bonus: 0,
                label: defaultSkill.label,
                labelMsg: defaultSkill.labelMsg,
                reminderText: defaultSkill.reminderText,
                reminderMsg: defaultSkill.reminderMsg,
                subType: undefined
            });
        });

        it('should create a skill with subType', () => {
            const skill = Profession.createSkill('science', 40, 'Biology');
            
            expect(skill.subType).toBe('Biology');
            expect(skill.value).toBe(40);
        });

        it('should create the expected skill name for two word skill names', () => {
            const skill = Profession.createSkill('computer-science', 60);
            expect(skill.name).toBe('Computer Science');
        });
    });

    describe('createSkillList', () => {
        it('should create a list of skills without subtypes', () => {
            const skillList = Profession.createSkillList([
                ['firearms', 50],
                ['alertness', 40]
            ]);

            expect(skillList).toHaveLength(2);
            expect(skillList[0].id).toBe('firearms');
            expect(skillList[1].id).toBe('alertness');
        });

        it('should create a list of skills with subtypes', () => {
            const skillList = Profession.createSkillList([
                ['science', 40, 'Biology'],
                ['crafts', 40, 'Mechanic']
            ]);

            expect(skillList).toHaveLength(2);
            expect(skillList[0].subType).toBe('Biology');
            expect(skillList[1].subType).toBe('Mechanic');
        });

        it('should throw error for invalid skill array', () => {
            expect(() => {
                Profession.createSkillList([['firearms']] as any);
            }).toThrow('Invalid skill array');
        });
    });
});

describe('Predefined Professions', () => {
    describe('Federal Agent', () => {
        it('should have correct properties', () => {
            expect(FederalAgent.name).toBe('Federal Agent');
            expect(FederalAgent.bondCount).toBe(3);
            expect(FederalAgent.chosenSkillCount).toBe(3);
            expect(FederalAgent.professionalSkills).toHaveLength(11);
            expect(FederalAgent.choosableSkills).toHaveLength(5);
        });
    });

    describe('Engineer', () => {
        it('should have correct crafts subtypes', () => {
            const craftsSkills = Engineer.professionalSkills.filter(
                skill => skill.id.includes('crafts')
            );

            expect(craftsSkills).toHaveLength(3);
            expect(craftsSkills.map(skill => skill.subType)).toEqual([
                'Electrician',
                'Mechanic',
                'Microelectronics'
            ]);
        });
    });

    describe('Anthropologist', () => {
        it('should have correct foreign language skills', () => {
            const languageSkills = Anthropologist.professionalSkills.filter(
                skill => skill.id.includes('foreign-languages')
            );

            expect(languageSkills).toHaveLength(2);
            expect(languageSkills.map(skill => skill.subType)).toEqual([
                'French',
                'German'
            ]);
            expect(languageSkills.map(skill => skill.name)).toEqual([
                'Foreign Languages',
                'Foreign Languages'
            ]);
        });
    });
});
