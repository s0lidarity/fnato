import { Statistics, DerivedAttributes } from '../types/characterTypes';
import { defaultStats } from '../providers/defaultValues';
import { calculateDerivedAttributes } from './CharacterGenerator';

/**
 * Type helper to extract keys from Statistics interface
 */
type StatKeys = keyof Statistics;

/**
 * Type helper to extract keys from DerivedAttributes interface
 */
type DerivedAttributeKeys = keyof DerivedAttributes;

/**
 * Runtime array of all base stat names, inferred from the defaultStats object
 * This automatically stays in sync with the Statistics interface
 */
const BASE_STAT_NAMES = Object.keys(defaultStats) as StatKeys[];

/**
 * Runtime array of all derived attribute names, inferred from calculated derived attributes
 * This automatically stays in sync with the DerivedAttributes interface
 */
const DERIVED_ATTRIBUTE_NAMES = Object.keys(calculateDerivedAttributes(defaultStats)) as DerivedAttributeKeys[];

/**
 * Checks if a name refers to a base stat (not a derived attribute)
 */
export function isBaseStat(statName: string): statName is StatKeys {
    return (BASE_STAT_NAMES as readonly string[]).includes(statName);
}

/**
 * Checks if a name refers to a derived attribute
 */
export function isDerivedAttribute(statName: string): statName is DerivedAttributeKeys {
    return (DERIVED_ATTRIBUTE_NAMES as readonly string[]).includes(statName);
}

/**
 * Gets the label for a stat or derived attribute
 */
export function getStatOrDerivedAttributeLabel(
    statName: string,
    stats: Statistics,
    derivedAttributes: DerivedAttributes
): string {
    if (isBaseStat(statName)) {
        const stat = stats[statName as keyof Statistics];
        return stat?.label || statName.charAt(0).toUpperCase() + statName.slice(1);
    } else if (isDerivedAttribute(statName)) {
        const derivedAttr = derivedAttributes[statName as keyof DerivedAttributes];
        if (derivedAttr?.labelMsg) {
            // For now, return a capitalized version. In the future, this could use i18n
            return statName === 'hitPoints' ? 'Hit Points' :
                   statName === 'willPower' ? 'Will Power' :
                   statName === 'breakingPoint' ? 'Breaking Point' :
                   statName.charAt(0).toUpperCase() + statName.slice(1);
        }
        return statName.charAt(0).toUpperCase() + statName.slice(1);
    }
    return statName.charAt(0).toUpperCase() + statName.slice(1);
}

/**
 * Gets the current value of a stat (including adjustments)
 */
export function getCurrentStatValue(
    statName: string,
    stats: Statistics
): number {
    if (!isBaseStat(statName)) return 0;
    const stat = stats[statName as keyof Statistics];
    if (!stat) return 0;
    return stat.score + (stat.damagedVeteranStatAdjustment || 0);
}

/**
 * Gets the current value of a derived attribute (including adjustments)
 */
export function getCurrentDerivedAttributeValue(
    statName: string,
    derivedAttributes: DerivedAttributes,
    derivedAttributeAdjustments?: { [key: string]: number }
): number {
    if (!isDerivedAttribute(statName)) return 0;
    const derivedAttr = derivedAttributes[statName as keyof DerivedAttributes];
    if (!derivedAttr) return 0;
    const adjustment = derivedAttributeAdjustments?.[statName] || 0;
    return derivedAttr.currentValue + adjustment;
}

/**
 * Calculates the effect value for a stat adjustment
 * Handles both numeric adjustments and dynamic adjustments (e.g., 'power' for sanity reduction)
 */
export function calculateStatEffectValue(
    adjustment: number | keyof Statistics,
    stats: Statistics
): { effectValue: number; effectText: string } {
    if (typeof adjustment === 'number') {
        return {
            effectValue: adjustment,
            effectText: `${adjustment > 0 ? '+' : ''}${adjustment}`
        };
    } else {
        // Dynamic adjustment based on another stat
        const sourceStat = stats[adjustment];
        const effectValue = sourceStat ? -sourceStat.score : 0;
        return {
            effectValue,
            effectText: `-${sourceStat?.score || 0}`
        };
    }
}

/**
 * Calculates the effect value for a derived attribute adjustment
 */
export function calculateDerivedAttributeEffectValue(
    adjustment: number | keyof Statistics,
    stats: Statistics
): { effectValue: number; effectText: string } {
    // Derived attributes can have numeric adjustments or dynamic adjustments
    return calculateStatEffectValue(adjustment, stats);
}

