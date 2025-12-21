import { describe, test, expect } from 'vitest';
import { Statistics, DerivedAttributes } from '../../types/characterTypes';
import { defaultStats } from '../../providers/defaultValues';
import { calculateDerivedAttributes } from '../CharacterGenerator';
import {
    isBaseStat,
    isDerivedAttribute,
    getStatOrDerivedAttributeLabel,
    getCurrentStatValue,
    getCurrentDerivedAttributeValue,
    calculateStatEffectValue,
    calculateDerivedAttributeEffectValue,
} from '../statHelpers';

describe('statHelpers', () => {
    describe('key inference from interfaces', () => {
        test('isBaseStat recognizes all keys from Statistics interface', () => {
            // Verify that all keys from defaultStats (which implements Statistics) are recognized
            const allStatKeys = Object.keys(defaultStats) as (keyof Statistics)[];
            allStatKeys.forEach(key => {
                expect(isBaseStat(key)).toBe(true);
            });
        });

        test('isDerivedAttribute recognizes all keys from DerivedAttributes interface', () => {
            // Verify that all keys from calculated derived attributes are recognized
            const derivedAttrs = calculateDerivedAttributes(defaultStats);
            const allDerivedKeys = Object.keys(derivedAttrs) as (keyof DerivedAttributes)[];
            allDerivedKeys.forEach(key => {
                expect(isDerivedAttribute(key)).toBe(true);
            });
        });

        test('base stats and derived attributes do not overlap', () => {
            const allStatKeys = Object.keys(defaultStats) as string[];
            const derivedAttrs = calculateDerivedAttributes(defaultStats);
            const allDerivedKeys = Object.keys(derivedAttrs) as string[];
            
            // No key should be both a base stat and a derived attribute
            allStatKeys.forEach(statKey => {
                expect(allDerivedKeys).not.toContain(statKey);
            });
        });
    });

    // Mock Statistics object
    const mockStats: Statistics = {
        strength: {
            label: 'Strength',
            score: 12,
            x5: 60,
            distinguishingFeature: 'Strong',
            damagedVeteranStatAdjustment: 0,
        },
        constitution: {
            label: 'Constitution',
            score: 10,
            x5: 50,
            distinguishingFeature: 'Healthy',
            damagedVeteranStatAdjustment: 2,
        },
        dexterity: {
            label: 'Dexterity',
            score: 14,
            x5: 70,
            distinguishingFeature: 'Nimble',
            damagedVeteranStatAdjustment: -1,
        },
        intelligence: {
            label: 'Intelligence',
            score: 13,
            x5: 65,
            distinguishingFeature: 'Smart',
            damagedVeteranStatAdjustment: 0,
        },
        power: {
            label: 'Power',
            score: 11,
            x5: 55,
            distinguishingFeature: 'Determined',
            damagedVeteranStatAdjustment: 0,
        },
        charisma: {
            label: 'Charisma',
            score: 9,
            x5: 45,
            distinguishingFeature: 'Plain',
            damagedVeteranStatAdjustment: -3,
        },
    };

    // Mock DerivedAttributes object
    const mockDerivedAttributes: DerivedAttributes = {
        hitPoints: {
            currentValue: 11,
            maxValue: 11,
            labelMsg: { id: 'hitPoints', message: 'Hit Points' } as any,
        },
        willPower: {
            currentValue: 11,
            maxValue: 11,
            labelMsg: { id: 'willPower', message: 'Will Power' } as any,
        },
        sanity: {
            currentValue: 55,
            maxValue: 55,
            labelMsg: { id: 'sanity', message: 'Sanity' } as any,
        },
        breakingPoint: {
            currentValue: 44,
            maxValue: 44,
            labelMsg: { id: 'breakingPoint', message: 'Breaking Point' } as any,
        },
    };

    describe('isBaseStat', () => {
        test('returns true for valid base stat names', () => {
            expect(isBaseStat('strength')).toBe(true);
            expect(isBaseStat('constitution')).toBe(true);
            expect(isBaseStat('dexterity')).toBe(true);
            expect(isBaseStat('intelligence')).toBe(true);
            expect(isBaseStat('power')).toBe(true);
            expect(isBaseStat('charisma')).toBe(true);
        });

        test('returns false for derived attribute names', () => {
            expect(isBaseStat('hitPoints')).toBe(false);
            expect(isBaseStat('willPower')).toBe(false);
            expect(isBaseStat('sanity')).toBe(false);
            expect(isBaseStat('breakingPoint')).toBe(false);
        });

        test('returns false for invalid names', () => {
            expect(isBaseStat('invalid')).toBe(false);
            expect(isBaseStat('')).toBe(false);
            expect(isBaseStat('randomStat')).toBe(false);
        });
    });

    describe('isDerivedAttribute', () => {
        test('returns true for valid derived attribute names', () => {
            expect(isDerivedAttribute('hitPoints')).toBe(true);
            expect(isDerivedAttribute('willPower')).toBe(true);
            expect(isDerivedAttribute('sanity')).toBe(true);
            expect(isDerivedAttribute('breakingPoint')).toBe(true);
        });

        test('returns false for base stat names', () => {
            expect(isDerivedAttribute('strength')).toBe(false);
            expect(isDerivedAttribute('constitution')).toBe(false);
            expect(isDerivedAttribute('power')).toBe(false);
        });

        test('returns false for invalid names', () => {
            expect(isDerivedAttribute('invalid')).toBe(false);
            expect(isDerivedAttribute('')).toBe(false);
            expect(isDerivedAttribute('randomAttribute')).toBe(false);
        });
    });

    describe('getStatOrDerivedAttributeLabel', () => {
        test('returns stat label for base stats', () => {
            expect(getStatOrDerivedAttributeLabel('strength', mockStats, mockDerivedAttributes)).toBe('Strength');
            expect(getStatOrDerivedAttributeLabel('constitution', mockStats, mockDerivedAttributes)).toBe('Constitution');
            expect(getStatOrDerivedAttributeLabel('power', mockStats, mockDerivedAttributes)).toBe('Power');
        });

        test('returns capitalized name for derived attributes', () => {
            expect(getStatOrDerivedAttributeLabel('hitPoints', mockStats, mockDerivedAttributes)).toBe('Hit Points');
            expect(getStatOrDerivedAttributeLabel('willPower', mockStats, mockDerivedAttributes)).toBe('Will Power');
            expect(getStatOrDerivedAttributeLabel('sanity', mockStats, mockDerivedAttributes)).toBe('Sanity');
            expect(getStatOrDerivedAttributeLabel('breakingPoint', mockStats, mockDerivedAttributes)).toBe('Breaking Point');
        });

        test('returns capitalized name for unknown stat names', () => {
            expect(getStatOrDerivedAttributeLabel('unknown', mockStats, mockDerivedAttributes)).toBe('Unknown');
        });

        test('handles stats without labels gracefully', () => {
            const statsWithoutLabel: Statistics = {
                ...mockStats,
                strength: {
                    ...mockStats.strength,
                    label: '',
                },
            };
            expect(getStatOrDerivedAttributeLabel('strength', statsWithoutLabel, mockDerivedAttributes)).toBe('Strength');
        });
    });

    describe('getCurrentStatValue', () => {
        test('returns stat score when no adjustment is present', () => {
            expect(getCurrentStatValue('strength', mockStats)).toBe(12);
            expect(getCurrentStatValue('intelligence', mockStats)).toBe(13);
        });

        test('returns stat score plus positive adjustment', () => {
            expect(getCurrentStatValue('constitution', mockStats)).toBe(12); // 10 + 2
        });

        test('returns stat score plus negative adjustment', () => {
            expect(getCurrentStatValue('dexterity', mockStats)).toBe(13); // 14 - 1
            expect(getCurrentStatValue('charisma', mockStats)).toBe(6); // 9 - 3
        });

        test('returns 0 for invalid stat names', () => {
            expect(getCurrentStatValue('invalid', mockStats)).toBe(0);
            expect(getCurrentStatValue('sanity', mockStats)).toBe(0); // derived attribute
        });
    });

    describe('getCurrentDerivedAttributeValue', () => {
        test('returns currentValue when no adjustment is present', () => {
            expect(getCurrentDerivedAttributeValue('hitPoints', mockDerivedAttributes)).toBe(11);
            expect(getCurrentDerivedAttributeValue('willPower', mockDerivedAttributes)).toBe(11);
        });

        test('returns currentValue plus adjustment', () => {
            const adjustments = {
                sanity: -5,
                breakingPoint: 3,
            };
            expect(getCurrentDerivedAttributeValue('sanity', mockDerivedAttributes, adjustments)).toBe(50); // 55 - 5
            expect(getCurrentDerivedAttributeValue('breakingPoint', mockDerivedAttributes, adjustments)).toBe(47); // 44 + 3
        });

        test('returns 0 for invalid derived attribute names', () => {
            expect(getCurrentDerivedAttributeValue('invalid', mockDerivedAttributes)).toBe(0);
            expect(getCurrentDerivedAttributeValue('strength', mockDerivedAttributes)).toBe(0); // base stat
        });
    });

    describe('calculateStatEffectValue', () => {
        test('returns correct effect for positive numeric adjustment', () => {
            const result = calculateStatEffectValue(5, mockStats);
            expect(result.effectValue).toBe(5);
            expect(result.effectText).toBe('+5');
        });

        test('returns correct effect for negative numeric adjustment', () => {
            const result = calculateStatEffectValue(-3, mockStats);
            expect(result.effectValue).toBe(-3);
            expect(result.effectText).toBe('-3');
        });

        test('returns correct effect for zero adjustment', () => {
            const result = calculateStatEffectValue(0, mockStats);
            expect(result.effectValue).toBe(0);
            expect(result.effectText).toBe('0'); // Zero doesn't get a + prefix
        });

        test('returns correct effect for dynamic adjustment based on another stat', () => {
            const result = calculateStatEffectValue('power', mockStats);
            expect(result.effectValue).toBe(-11); // negative of power score
            expect(result.effectText).toBe('-11');
        });

        test('handles missing source stat for dynamic adjustment', () => {
            const statsWithoutPower: Statistics = {
                ...mockStats,
                power: undefined as any,
            };
            const result = calculateStatEffectValue('power', statsWithoutPower);
            expect(result.effectValue).toBe(0);
            expect(result.effectText).toBe('-0');
        });
    });

    describe('calculateDerivedAttributeEffectValue', () => {
        test('delegates to calculateStatEffectValue for numeric adjustments', () => {
            const result = calculateDerivedAttributeEffectValue(-5, mockStats);
            expect(result.effectValue).toBe(-5);
            expect(result.effectText).toBe('-5');
        });

        test('delegates to calculateStatEffectValue for dynamic adjustments', () => {
            const result = calculateDerivedAttributeEffectValue('power', mockStats);
            expect(result.effectValue).toBe(-11);
            expect(result.effectText).toBe('-11');
        });
    });
});

