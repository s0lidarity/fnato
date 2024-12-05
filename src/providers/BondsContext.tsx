import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { bondCountSignal } from '../signals/bondSignal';

import { Bond } from '../types/characterTypes';

type BondsContextType = {
    // state
    bonds: Bond[];
    bondCount: number;

    // functions
    setBonds: (bonds: Bond[]) => void;
    setBondCount: (count: number) => void;
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
    const setBondCount = (count: number) => {
        bondCountSignal.value = count;
    };

    return (
        <BondsContext.Provider 
            value={{ 
                bonds, 
                setBonds, 
                bondCount: bondCountSignal.value, 
                setBondCount 
            }}>
                {children}
        </BondsContext.Provider>
    );
};