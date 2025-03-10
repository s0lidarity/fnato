import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { useStats } from './StatisticsContext';
import { Bond } from '../types/characterTypes';

type BondsContextType = {
    // State values (alphabetically ordered)
    bonds: Bond[];

    // Functions (alphabetically ordered)
    resetBonds: () => void;
    setBonds: (bonds: Bond[]) => void;
    setBondByIndex: (index: number, bond: Partial<Bond>) => void;
    updateBondAdjustments: (adjustments: { remove?: number; adjustScore?: number }) => void;
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

    const updateBondAdjustments = (adjustments: { remove?: number; adjustScore?: number }) => {
        if (adjustments.remove) {
            // Remove bonds from the end
            const removeCount = Math.min(adjustments.remove, bonds.length);
            setBonds(prevBonds => prevBonds.slice(0, prevBonds.length - removeCount));
        }

        if (adjustments.adjustScore) {
            // Adjust all bond scores
            setBonds(prevBonds => prevBonds.map(bond => ({
                ...bond,
                score: bond.score + adjustments.adjustScore!
            })));
        }
    };

    return (
        <BondsContext.Provider 
            value={{ 
                // State
                bonds,

                // Functions
                resetBonds,
                setBonds,
                setBondByIndex,
                updateBondAdjustments,
            }}>
                {children}
        </BondsContext.Provider>
    );
};