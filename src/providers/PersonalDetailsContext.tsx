import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { DetailedDescription } from '../types/characterTypes';

type PersonalDetailsContextType = {
    personalDetails: DetailedDescription;
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
    const [personalDetails, setPersonalDetails] = useState<DetailedDescription>({
        name: '',
        age: 0,
        appearance: '',
        // ... other default values
    });

    return (
        <PersonalDetailsContext.Provider 
            value={{ personalDetails, setPersonalDetails }}>
            {children}
        </PersonalDetailsContext.Provider>
    );
};