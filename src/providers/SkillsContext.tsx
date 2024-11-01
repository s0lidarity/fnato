import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Skill, Skills } from '../types/characterTypes';
import { generateDefaultSkills } from './defaultValues';

type SKillsContextType = {
    applyProfessionSkills: (professionSkills: Skill[]) => void;
    resetSkills: () => void;
    skills: Skills;
    setSkills: (skills: Skills) => void;
    setSkillByKey: (skillKey: string, skillUpdate: Partial<Skill>) => void;
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

    const setSkillByKey = (skillKey: string, skillUpdate: Partial<Skill>) => {
        setSkills({
            ...skills,
            [skillKey]: { ...skills[skillKey], ...skillUpdate },
        });
    };

    const applyProfessionSkills = (professionSkills: Skill[]) => {
        const newSkills = { ...defaultSkills, ...professionSkills };
        console.log(newSkills);
        setSkills(newSkills);
    };

    return (
        <SkillsContext.Provider 
            value={{ 
                applyProfessionSkills,
                resetSkills,
                skills,
                setSkills,
                setSkillByKey,
            }}>
            {children}
        </SkillsContext.Provider>
    );
};