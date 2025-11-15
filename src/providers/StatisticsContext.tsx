import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Statistics, DerivedAttributes, Stat } from '../types/characterTypes';
import { calculateDerivedAttributes } from '../utils/CharacterGenerator';
import { defaultStats } from './defaultValues';
import { StatsConfigOptions } from '../types/componentTypes';
import { 
    isBaseStat, 
    isDerivedAttribute, 
    getCurrentStatValue, 
    getCurrentDerivedAttributeValue
} from '../utils/statHelpers';

type StatsContextType = {
    // State values
    config: StatsConfigOptions;
    derivedAttributes: DerivedAttributes;
    stats: Statistics;

    // Functions
    getEffectiveDerivedAttribute: (daName: string) => number;
    getEffectiveStatValue:(statName: string) => number;
    resetStats: () => void;
    setConfig: (config: StatsConfigOptions) => void;
    setStats: (stats: Statistics) => void;
    updateStatAdjustment: (statName: string, adjustment: number) => void;
    updateDerivedAttributeAdjustment: (daName: string, adjustment: number) => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

// AJS TODO: clean up Stats vs Statistics consistency across app
export const useStats = () => {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
};

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [stats, setStats] = useState<Statistics>(defaultStats);
    const [derivedAttributes, setDerivedAttributes] = useState<DerivedAttributes>(calculateDerivedAttributes(defaultStats));
    const [config, setConfig] = useState<StatsConfigOptions>(StatsConfigOptions.ManualInput);
    // Track direct adjustments to derived attributes (e.g., sanity: -5)
    const [derivedAttributeAdjustments, setDerivedAttributeAdjustments] = useState<{ [key: string]: number }>({});
    // Track the base values when adjustments were first applied, so we can recalculate correctly when base stats change
    const [derivedAttributeBaseValues, setDerivedAttributeBaseValues] = useState<{ [key: string]: number }>({});

    // AJS TODO, don't maintain derivedAttributes in state, just calculate on demand
    useEffect(() => {
        const newDerivedAttributes = calculateDerivedAttributes(stats);
        
        // Check if base values have changed for derived attributes with adjustments
        // If the base changed (e.g., power changed causing sanity to recalculate),
        // clear the adjustments since they were relative to the old base value
        setDerivedAttributeAdjustments(prevAdjustments => {
            const updatedAdjustments = { ...prevAdjustments };
            let shouldUpdateBases = false;
            
            Object.keys(prevAdjustments).forEach(daName => {
                const oldBase = derivedAttributeBaseValues[daName];
                const newBase = newDerivedAttributes[daName as keyof DerivedAttributes]?.currentValue;
                
                // If base changed, clear the adjustment (it was relative to the old base)
                if (oldBase !== undefined && newBase !== undefined && oldBase !== newBase) {
                    delete updatedAdjustments[daName];
                    shouldUpdateBases = true;
                }
            });
            
            if (shouldUpdateBases) {
                setDerivedAttributeBaseValues(prevBases => {
                    const updatedBases = { ...prevBases };
                    Object.keys(updatedAdjustments).forEach(daName => {
                        const newBase = newDerivedAttributes[daName as keyof DerivedAttributes]?.currentValue;
                        if (newBase !== undefined) {
                            updatedBases[daName] = newBase;
                        } else {
                            delete updatedBases[daName];
                        }
                    });
                    return updatedBases;
                });
            }
            
            return updatedAdjustments;
        });
        
        setDerivedAttributes(newDerivedAttributes);
    }, [stats, derivedAttributeBaseValues]);

    const resetStats = () => {
        setStats(defaultStats);
        setDerivedAttributeAdjustments({});
        setDerivedAttributeBaseValues({});
    };

    const getEffectiveStatValue = (statName: string) => {
        if (!isBaseStat(statName)) return 0;
        return getCurrentStatValue(statName, stats);
    };

    const getEffectiveDerivedAttribute = (daName: string) => {
        if (!isDerivedAttribute(daName)) return 0;
        const derivedAttr = derivedAttributes[daName as keyof DerivedAttributes];
        if (!derivedAttr) return 0;
        
        const adjustment = derivedAttributeAdjustments[daName] || 0;
        // Adjustments are always applied to the current base value
        // The stored base value is kept in sync via useEffect when derived attributes recalculate
        return derivedAttr.currentValue + adjustment;
    };

    const updateStatAdjustment = (statName: string, adjustment: number) => {
        if (!isBaseStat(statName)) {
            console.warn(`Attempted to update stat adjustment for non-base stat: ${statName}`);
            return;
        }

        setStats(prevStats => {
            const stat = prevStats[statName as keyof Statistics];
            if (!stat) return prevStats;

            const updatedStat: Stat = {
                ...stat,
                damagedVeteranStatAdjustment: (stat.damagedVeteranStatAdjustment || 0) + adjustment
            };

            return {
                ...prevStats,
                [statName]: updatedStat
            };
        });
    };

    const updateDerivedAttributeAdjustment = (daName: string, adjustment: number) => {
        if (!isDerivedAttribute(daName)) {
            console.warn(`Attempted to update derived attribute adjustment for non-derived attribute: ${daName}`);
            return;
        }

        setDerivedAttributeAdjustments(prev => {
            const hasExistingAdjustment = prev[daName] !== undefined;
            
            // If this is the first adjustment, store the current base value
            if (!hasExistingAdjustment) {
                const currentBase = derivedAttributes[daName as keyof DerivedAttributes]?.currentValue || 0;
                setDerivedAttributeBaseValues(prevBases => ({
                    ...prevBases,
                    [daName]: currentBase
                }));
            }
            
            return {
                ...prev,
                [daName]: (prev[daName] || 0) + adjustment
            };
        });
    };

    return (
        <StatsContext.Provider value={{
            config,
            derivedAttributes,
            stats,
            getEffectiveDerivedAttribute,
            getEffectiveStatValue,
            resetStats,
            setConfig,
            setStats,
            updateStatAdjustment,
            updateDerivedAttributeAdjustment,
        }}>
            {children}
        </StatsContext.Provider>
    );
};