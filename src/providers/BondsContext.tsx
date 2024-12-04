import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Bond } from '../types/characterTypes';

type BondsContextType = {
    bonds: Bond[];
    setBonds: (bonds: Bond[]) => void;
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

    return (
        <BondsContext.Provider value={{ bonds, setBonds }}>{children}</BondsContext.Provider>
    );
};