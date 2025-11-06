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

    // AJS TODO, don't maintain derivedAttributes in state, just calculate on demand
    useEffect(() => {
        const newDerivedAttributes = calculateDerivedAttributes(stats);
        setDerivedAttributes(newDerivedAttributes);
    }, [stats]);

    const resetStats = () => {
        setStats(defaultStats);
        setDerivedAttributeAdjustments({});
    };

    const getEffectiveStatValue = (statName: string) => {
        if (!isBaseStat(statName)) return 0;
        return getCurrentStatValue(statName, stats);
    };

    const getEffectiveDerivedAttribute = (daName: string) => {
        if (!isDerivedAttribute(daName)) return 0;
        return getCurrentDerivedAttributeValue(daName, derivedAttributes, derivedAttributeAdjustments);
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

        setDerivedAttributeAdjustments(prev => ({
            ...prev,
            [daName]: (prev[daName] || 0) + adjustment
        }));
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