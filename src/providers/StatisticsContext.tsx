import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Statistics, DerivedAttributes, Stat } from '../types/characterTypes';
import { calculateDerivedAttributes } from '../utils/CharacterGenerator';
import { defaultStats } from './defaultValues';
import { StatsConfigOptions } from '../types/componentTypes';

type StatsContextType = {
    // State values (alphabetically ordered)
    config: StatsConfigOptions;
    derivedAttributes: DerivedAttributes;
    stats: Statistics;

    // Functions (alphabetically ordered)
    resetStats: () => void;
    setConfig: (config: StatsConfigOptions) => void;
    setStats: (stats: Statistics) => void;
    updateStatAdjustment: (statName: string, adjustment: number) => void;
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

    // AJS TODO, don't maintain derivedAttributes in state, just calculate on demand
    useEffect(() => {
        const newDerivedAttributes = calculateDerivedAttributes(stats);
        setDerivedAttributes(newDerivedAttributes);
    }, [stats]);

    const resetStats = () => {
        setStats(defaultStats);
    };

    const updateStatAdjustment = (statName: string, adjustment: number) => {
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

    return (
        <StatsContext.Provider value={{
            config,
            derivedAttributes,
            stats,
            resetStats,
            setConfig,
            setStats,
            updateStatAdjustment,
        }}>
            {children}
        </StatsContext.Provider>
    );
};