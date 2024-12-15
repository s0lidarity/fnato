import { renderHook, act } from '@testing-library/preact';
import { describe, expect, it, beforeEach } from 'vitest';
import { SkillsProvider, useSkills } from '../SkillsContext';
import { generateDefaultSkills } from '../defaultValues';
import { Skill } from '../../types/characterTypes';
import { Anthropologist, Engineer, SpecialOperator } from '../../utils/Professions';

// Test wrapper to provide context
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SkillsProvider>{children}</SkillsProvider>
);

describe('SkillsContext', () => {
    let result: any;

    const compareSkillArrays = (a: Skill[], b: Skill[]): boolean => {
        let match = true;
        a.forEach((skill, index) => {
            match = match && skill.value === b[index].value;
            match = match && skill.bonus === b[index].bonus;
            match = match && skill.subType === b[index].subType;
            match = match && skill.label === b[index].label;
            match = match && skill.reminderText === b[index].reminderText;
            match = match && skill.name === b[index].name;
            if (!match) {
                return false;
            }
        });
        return match;
    };

    beforeEach(() => {
        // Setup fresh hook for each test
        result = renderHook(() => useSkills(), { wrapper }).result;
    });

    it('should initialize with default values', () => {
        // loop through skills and check if non-id values match
        expect(compareSkillArrays(result.current.skills, generateDefaultSkills())).toBe(true);
        expect(result.current.bonusPointsRemaining).toBe(8);
    });

    it('should calculate skill value correctly', () => {
        const testSkill = result.current.skills[0];
        
        // Test base value
        expect(result.current.calculateSkillValue(testSkill.id))
            .toBe(testSkill.value);

        // Test with bonus
        act(() => {
            result.current.adjustBonus(testSkill.id, 1);
        });
        expect(result.current.calculateSkillValue(testSkill.id))
            .toBe(Math.min(testSkill.value + 20, 80)); // 80 is skill cap
    });

    it('should adjust bonus points correctly', () => {
        const testSkill = result.current.skills[0];
        
        // Test successful bonus adjustment
        act(() => {
            result.current.adjustBonus(testSkill.id, 1);
        });
        expect(result.current.bonusPointsRemaining).toBe(7);

        // Test exceeding bonus points
        act(() => {
            result.current.adjustBonus(testSkill.id, 9);
        });
        expect(result.current.bonusPointsRemaining).toBe(7);
    });

    it('should apply profession skills correctly', () => {
        const professionSkills: Skill[] = [
            {
                id: 'test1',
                name: 'Accounting',
                value: 50, // Different from default
                bonus: 0,
            },
            {
                id: 'test2',
                name: 'New Skill',
                value: 30,
                bonus: 0,
            }
        ];

        act(() => {
            result.current.applyProfessionSkills(professionSkills);
        });

        // Check if existing skill was updated
        const updatedSkill = result.current.skills.find((s: Skill) => s.name === 'Accounting');
        expect(updatedSkill.value).toBe(50);

        // Check if new skill was added
        const newSkill = result.current.skills.find((s: Skill) => s.name === 'New Skill');
        expect(newSkill).toBeTruthy();
        expect(newSkill.value).toBe(30);
    });

    it('should reset skills to default values', () => {
        // First modify some skills
        const testSkill = result.current.skills[0];
        act(() => {
            result.current.adjustBonus(testSkill.id, 1);
        });

        // Then reset
        act(() => {
            result.current.resetSkills();
        });

        expect(compareSkillArrays(result.current.skills, generateDefaultSkills())).toBe(true);
        expect(result.current.bonusPointsRemaining).toBe(8);
    });

    it('should set skill by ID correctly', () => {
        const testSkill = result.current.skills[0];
        const update = { value: 45 };

        act(() => {
            const success = result.current.setSkillById(testSkill.id, update);
            expect(success).toBe(true);
        });

        const updatedSkill = result.current.skills.find((s: Skill) => s.id === testSkill.id);
        expect(updatedSkill.value).toBe(45);
    });

    describe('apply profession skills correctly', () => {
        // mostly checking for Science - Mathematics and Crafts - Electrician, Mechanic, Microelectronics here
        it('should apply Engineer skills correctly', () => {
            act(() => {
                result.current.applyProfessionSkills(Engineer.professionalSkills);
            });

            expect(result.current.skills.find(s => s.name === 'Computer Science').value).toBe(60);
            expect(result.current.skills.find(s => s.name === 'Crafts' && s.subType === 'Electrician').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'Crafts' && s.subType === 'Mechanic').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'Crafts' && s.subType === 'Microelectronics').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'Science' && s.subType === 'Mathematics').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'SIGINT').value).toBe(40);
        });

        // mostly checking for Foreign Languages -French and German here
        it('should apply Anthropologist skills correctly', () => {
            act(() => {
                result.current.applyProfessionSkills(Anthropologist.professionalSkills);
            });

            expect(result.current.skills.find(s => s.name === 'Anthropology').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Foreign Languages' && s.subType === 'French').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Foreign Languages' && s.subType === 'German').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'History').value).toBe(60);
            expect(result.current.skills.find(s => s.name === 'Occult').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'Persuade').value).toBe(40);
        });

        // mostly checking for Military Science -Land here
        it('should apply Special Operator skills correctly', () => {
            act(() => {
                result.current.applyProfessionSkills(SpecialOperator.professionalSkills);
            });
            expect(result.current.skills.find(s => s.name === 'Alertness').value).toBe(60);
            expect(result.current.skills.find(s => s.name === 'Athletics').value).toBe(60);
            expect(result.current.skills.find(s => s.name === 'Demolitions').value).toBe(40);
            expect(result.current.skills.find(s => s.name === 'Firearms').value).toBe(60);
            expect(result.current.skills.find(s => s.name === 'Heavy Weapons').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Melee Weapons').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Military Science' && s.subType === 'Land').value).toBe(60);
            expect(result.current.skills.find(s => s.name === 'Navigate').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Stealth').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Survival').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Swim').value).toBe(50);
            expect(result.current.skills.find(s => s.name === 'Unarmed Combat').value).toBe(60);
        });
    });
}); 