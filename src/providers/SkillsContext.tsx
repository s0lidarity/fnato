import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Skill, Skills } from '../types/characterTypes';
import { generateDefaultSkills } from './defaultValues';

type SKillsContextType = {
    applyProfessionSkills: (professionSkills: Skill[]) => void;
    bonusPointsRemaining: number;
    decrementBonusPoint: (skillKey: string) => boolean;
    incrementBonusPoint: (skillKey: string) => boolean;
    resetSkills: () => void;
    skills: Skills;
    setSkills: (skills: Skills) => void;
    setSkillByKey: (skillKey: string, skillUpdate: Partial<Skill>) => void;
}

const MAX_BONUS_POINTS = 8;

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
    const [bonusPointsRemaining, setBonusPointsRemaining] = useState(MAX_BONUS_POINTS);
    
    // AJS refactor opportunity, move this to a util function
    const calculateRemainingBonusPoints = () => {
        let total = 0;
        Object.keys(skills).forEach(skillKey => {
            if(skills[skillKey].bonus){
                total += skills[skillKey].bonus;
            }
        });
        return MAX_BONUS_POINTS - total;
    };

    const incrementBonusPoint = (skillKey: string): boolean => {
        if(bonusPointsRemaining > 0){
            setBonusPointsRemaining(bonusPointsRemaining - 1);
            setSkills({
                ...skills,
                [skillKey]: { ...skills[skillKey], bonus: skills[skillKey].bonus + 1 },
            });
            return true;
        }
        return false;
    };

    const decrementBonusPoint = (skillKey: string): boolean => {
        if(skills[skillKey].bonus > 0 && bonusPointsRemaining < MAX_BONUS_POINTS){
            setBonusPointsRemaining(bonusPointsRemaining + 1);
            setSkills({
                ...skills,
                [skillKey]: { ...skills[skillKey], bonus: skills[skillKey].bonus - 1 },
            });
            return true;
        }
        return false;
    };

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
        // clear bonus points
        setBonusPointsRemaining(MAX_BONUS_POINTS);
        // apply Profession skills
        setSkills(newSkills);
        setBonusPointsRemaining(calculateRemainingBonusPoints());
    };

    return (
        <SkillsContext.Provider 
            value={{ 
                applyProfessionSkills,
                bonusPointsRemaining,
                decrementBonusPoint,
                incrementBonusPoint,
                resetSkills,
                skills,
                setSkills,
                setSkillByKey,
            }}>
            {children}
        </SkillsContext.Provider>
    );
};