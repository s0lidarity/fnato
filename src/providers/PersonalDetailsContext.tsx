import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { DetailedDescription } from '../types/characterTypes';
import { DEFAULT_DETAILED_DESCRIPTION } from '../constants/personalDetailsDefaults';
type PersonalDetailsContextType = {
    personalDetails: DetailedDescription;
    resetPersonalDetails: () => void;
    setPersonalDetails: (details: DetailedDescription) => void;
};

export const PersonalDetailsContext = createContext<PersonalDetailsContextType | undefined>(undefined);

export const usePersonalDetails = () => {
    const context = useContext(PersonalDetailsContext);
    if (!context) {
        throw new Error('usePersonalDetails must be used within a PersonalDetailsProvider');
    }
    return context;
};

export const PersonalDetailsProvider = ({ children }: { children: React.ReactNode }) => {
    const [personalDetails, setPersonalDetails] = useState<DetailedDescription>(DEFAULT_DETAILED_DESCRIPTION);

    const resetPersonalDetails = () => {
        setPersonalDetails(DEFAULT_DETAILED_DESCRIPTION);
    };

    return (
        <PersonalDetailsContext.Provider 
            value={{ personalDetails, resetPersonalDetails, setPersonalDetails }}>
            {children}
        </PersonalDetailsContext.Provider>
    );
};