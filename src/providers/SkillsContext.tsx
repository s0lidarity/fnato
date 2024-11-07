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

    // AJS refactor needed, update skill by using skills.findIndex
    const setSkillByKey = (skillKey: string, skillUpdate: Partial<Skill>):boolean => {
        const si = skills.findIndex(s => s.id === skillKey);
        if(si !== -1){
            const newSkills = [...skills];
            newSkills[si] = {
                ...newSkills[si],
                ...skillUpdate,
            };
            setSkills(newSkills);
            return true;
        }
        return false;
    };
    
    // AJS refactor opportunity, move this to a util function
    const calculateRemainingBonusPoints = () => {
        const total = skills.reduce((acc, s) => {
            if(s.bonus){
                acc += s.bonus;
            }
            return acc;
        }, 0);
        return MAX_BONUS_POINTS - total;
    };

    const incrementBonusPoint = (skillKey: string): boolean => {
        if(bonusPointsRemaining > 0){
            if(setSkillByKey(skillKey, { bonus: skills[skillKey].bonus + 1 })){
                setBonusPointsRemaining(bonusPointsRemaining - 1);
                return true;
            }
        }
        return false;
    };

    // AJS pick up here, adjust the logic to match the increment
    const decrementBonusPoint = (skillKey: string): boolean => {
        if(bonusPointsRemaining < MAX_BONUS_POINTS){
            if(setSkillByKey(skillKey, { bonus: skills[skillKey].bonus - 1 })){
                setBonusPointsRemaining(bonusPointsRemaining + 1);
                return true;
            }
        }
        return false;
    };

    const resetSkills = () => {
        setSkills(defaultSkills);
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