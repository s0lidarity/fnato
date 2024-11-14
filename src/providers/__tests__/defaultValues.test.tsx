import { buildStat, generateDefaultSkills } from '../defaultValues';
// import { DEFAULT_SKILLS } from '../../types/characterTypes';

describe('defaultValues', () => {
    describe('buildStat', () => {
        it('buildStat should return a Stat with the correct label', () => {
            const stat = buildStat('strength');
            expect(stat.label).toBe('Strength');
        });
        it('buildStat should return a Stat with the correct score and x5', () => {
            const stat = buildStat('strength');
            expect(stat.score).toBe(10);
            expect(stat.x5).toBe(50);
        });
        it('buildStat should return a Stat with the correct reminderText', () => {
            const stat = buildStat('strength');
            expect(stat.reminderText).toBe('Raw physical power');
        });
    });
    describe('generateDefaultSkills', () => {
        const skills = generateDefaultSkills();
        it('generateDefaultSkills should return an array of Skills', () => {
            expect(skills).toEqual(expect.any(Array));
        });
    });
});