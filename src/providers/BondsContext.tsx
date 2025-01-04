import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { useStats } from './StatisticsContext';
import { Bond } from '../types/characterTypes';

type BondsContextType = {
    bonds: Bond[];
    resetBonds: () => void;
    setBonds: (bonds: Bond[]) => void;
    setBondByIndex: (index: number, bond: Partial<Bond>) => void;
};

const BondsContext = createContext<BondsContextType | undefined>(undefined);

export const useBonds = () => {
    const context = useContext(BondsContext);
    if (!context) {
        throw new Error('useBonds must be used within a BondsProvider');
    }
    return context;
};

export const BondsProvider = ({ children }: { children: React.ReactNode }) => {
    const [bonds, setBonds] = useState<Bond[]>([]);
    const { stats } = useStats();

    // Update all bond scores when charisma changes
    useEffect(() => {
        if (bonds.length > 0) {
            const updatedBonds = bonds.map(bond => ({
                ...bond,
                score: stats.charisma.score
            }));
            setBonds(updatedBonds);
        }
    }, [stats.charisma.score]);

    const setBondByIndex = (index: number, bondUpdate: Partial<Bond>) => {
        const newBonds = [...bonds];
        newBonds[index] = {
            ...newBonds[index],
            ...bondUpdate,
            score: stats.charisma.score // Ensure score is always set from charisma
        };
        setBonds(newBonds);
    };

    const resetBonds = () => {
        setBonds([]);
    };

    return (
        <BondsContext.Provider 
            value={{ 
                bonds, 
                setBonds,
                setBondByIndex,
                resetBonds,
            }}>
                {children}
        </BondsContext.Provider>
    );
};