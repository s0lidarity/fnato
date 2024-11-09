import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { Skill, Skills } from '../types/characterTypes';
import { generateDefaultSkills } from './defaultValues';

type SKillsContextType = {
    applyProfessionSkills: (professionSkills: Skill[]) => void;
    bonusPointsRemaining: number;
    adjustBonus: (skillKey: string, adjustment: number) => boolean;
    resetSkills: () => void;
    skills: Skills;
    setSkills: (skills: Skills) => void;
    setSkillById: (skillKey: string, skillUpdate: Partial<Skill>) => void;
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

    const getSkillProperty = (skillId: string, property: keyof Skill) => {
        return skills.find(s => s.id === skillId)?.[property];
    };
    
    const setSkillById = (skillId: string, skillUpdate: Partial<Skill>):boolean => {
        const si = skills.findIndex(s => s.id === skillId);
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
        if(!skills.length) return MAX_BONUS_POINTS;
        const total = skills.reduce((acc, s) => {
            if(s.bonus){
                acc += s.bonus;
            }
            return acc;
        }, 0);
        return MAX_BONUS_POINTS - total;
    };

    const adjustBonus = (skillId: string, adjustment: number): boolean => {
        const oldBonus = getSkillProperty(skillId, 'bonus');
        const newBonus = typeof oldBonus === 'number' ? oldBonus + adjustment : 0;
        return setSkillById(skillId, { bonus: newBonus });
    };

    const resetSkills = () => {
        setSkills(defaultSkills);
    };

    const applyProfessionSkills = (professionSkills: Skill[]) => {
        // Create new skills array by merging default skills with profession skills
        const newSkills = defaultSkills.map(defaultSkill => {
            // Find all matching profession skills (including subtypes)
            const matchingProfSkills = professionSkills.filter(ps => 
                ps.name === defaultSkill.name && 
                (!ps.subType || ps.subType === defaultSkill.subType)
            );

            // If we found a match, use the profession skill, otherwise keep default
            return matchingProfSkills[0] || defaultSkill;
        });

        // Add any profession skills that weren't in default skills (like subtyped skills)
        professionSkills.forEach(profSkill => {
            const exists = newSkills.some(s => 
                s.name === profSkill.name && 
                s.subType === profSkill.subType
            );
            
            if (!exists) {
                newSkills.push(profSkill);
            }
        });


        const sortedSkills = newSkills.sort((a, b) => a.name.localeCompare(b.name));
        
        // Reset bonus points and update skills
        setBonusPointsRemaining(MAX_BONUS_POINTS);
        setSkills(sortedSkills);
        setBonusPointsRemaining(calculateRemainingBonusPoints());
    };

    return (
        <SkillsContext.Provider 
            value={{ 
                applyProfessionSkills,
                bonusPointsRemaining,
                adjustBonus,
                resetSkills,
                skills,
                setSkills,
                setSkillById,
            }}>
            {children}
        </SkillsContext.Provider>
    );
};