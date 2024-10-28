import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Skill, Skills } from '../types/characterTypes';
import { generateDefaultSkills } from './defaultValues';

type SKillsContextType = {
    applyProfessionSkills: (professionSkills: Skills) => void;
    resetSkills: () => void;
    skills: Skills;
    setSkills: (skills: Skills) => void;
}

const SkillsContext = createContext<SKillsContextType | undefined>(undefined);

const defaultSkills = generateDefaultSkills();

export const useSkills = () => {
    const context = useContext(SkillsContext);
    if (!context) {
        throw new Error('useSkills must be used within a SkillsProvider');
    }
    return context;
};

export const SkillsProvider = ({ children }: { children: React.ReactNode }) => {
    const [skills, setSkills] = useState<Skills>(defaultSkills);

    const resetSkills = () => {
        setSkills(defaultSkills);
    };

    const applyProfessionSkills = (professionSkills: Skills) => {
        const newSkills = { ...skills, ...professionSkills };
        setSkills(newSkills);
    };

    return (
        <SkillsContext.Provider 
            value={{ 
                applyProfessionSkills,
                resetSkills,
                skills,
                setSkills,
            }}>
            {children}
        </SkillsContext.Provider>
    );
};