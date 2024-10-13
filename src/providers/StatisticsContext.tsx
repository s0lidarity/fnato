import { createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Stat, Statistics, DerivedAttributes } from '../types/characterTypes';
import { calculateDerivedAttributes } from '../utils/CharacterGenerator';

type StatsContextType = {
    stats: Statistics;
    derivedAttributes: DerivedAttributes;
    setStats: (stats: Statistics) => void;
};
const defaultStat: Stat = {
    score: 10,
    x5: 50,
    distinguishingFeature: ''
};

const defaultStats: Statistics = {
    strength: defaultStat,
    dexterity: defaultStat,
    constitution: defaultStat,
    intelligence: defaultStat,
    power: defaultStat,
    charisma: defaultStat,
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

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

    useEffect(() => {
        const newDerivedAttributes = calculateDerivedAttributes(stats);
        setDerivedAttributes(newDerivedAttributes);
    }, [stats]);

    return (
        <StatsContext.Provider value={{ stats, derivedAttributes, setStats }}>
            {children}
        </StatsContext.Provider>
    );
};