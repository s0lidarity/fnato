import { describe, test, expect } from 'vitest';

import { generateStat, rollDice } from './CharacterGenerator';

describe('CharacterGenerator', () => {
    test('rollDice rolling 4d6 drop 1 lowest yields values between 3 and 18', () => {
        for(let i = 0; i < 100; i++) {
            const rr = rollDice(6, 4, 1);
            expect(rr.result).toBeGreaterThanOrEqual(3);
            expect(rr.result).toBeLessThanOrEqual(18);
        };
    });

    test('rollDice rolling 4d6 drop 1 always returns a rolls array with a length of 3', () => {
        for(let i = 0; i < 100; i++) {
            const rr = rollDice(6, 4, 1);
            expect(rr.rolls.length).toBe(3);
        };
    });

    test('generateStat returns a valid Stat object', () => {
        const stat = generateStat('strength', rollDice(6, 4, 1).result);
        expect(stat).toHaveProperty('score');
        expect(stat.score).toBeLessThan(19);
        expect(stat.score).toBeGreaterThan(2);
        expect(stat).toHaveProperty('x5');
        expect(stat.x5).toBe(stat.score * 5);
        expect(stat).toHaveProperty('distinguishingFeature');
        expect(stat).toHaveProperty('reminderText');
    });

    test('generateStat returns null for an invalid stat name', () => {
        const stat = generateStat('invalid', 18);
        expect(stat).toBeNull();
    });

    test('generateStat returns null for an invalid roll result', () => {
        const stat = generateStat('strength', null);
        expect(stat).toBeNull();
    });

    test('generateStat returns null for a roll result less than 3', () => {
        const stat = generateStat('strength', 2);
        expect(stat).toBeNull();
    });

    test('generateStat returns null for a roll result greater than 18', () => {
        const stat = generateStat('strength', 19);
        expect(stat).toBeNull();
    });
});