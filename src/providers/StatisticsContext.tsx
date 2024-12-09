import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Statistics, DerivedAttributes } from '../types/characterTypes';
import { calculateDerivedAttributes } from '../utils/CharacterGenerator';
import { defaultStats } from './defaultValues';
import { StatsConfigOptions } from '../types/componentTypes';

type StatsContextType = {
    config: StatsConfigOptions;
    derivedAttributes: DerivedAttributes;
    stats: Statistics;
    resetStats: () => void;
    setConfig: (config: StatsConfigOptions) => void;
    setStats: (stats: Statistics) => void;
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
    useEffect(() => {
        const newDerivedAttributes = calculateDerivedAttributes(stats);
        setDerivedAttributes(newDerivedAttributes);
    }, [stats]);

    const resetStats = () => {
        setStats(defaultStats);
    };

    return (
        <StatsContext.Provider value={{
            config,
            derivedAttributes,
            stats,
            resetStats,
            setConfig,
            setStats,
        }}>
            {children}
        </StatsContext.Provider>
    );
};