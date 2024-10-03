import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Bond, Character, DerivedAttributes, Stat, Statistics } from '../types/characterTypes';
import { createDefaultCharacter } from '../utils/CharacterGenerator';


type StatsContextType = {
    stats: Statistics;
    setStats: (stats: Statistics) => void;
};

const defaultCharacter = createDefaultCharacter();

const CharacterContext = createContext<StatsContextType | undefined>(undefined);

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
};

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
    const [stats, setStats] = useState<Statistics>(defaultCharacter.statistics);

    return (
        <CharacterContext.Provider value={{ stats, setStats }}>
            {children}
        </CharacterContext.Provider>
    );
};