import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { Skill, Skills, IProfession } from '../types/characterTypes';
import { generateDefaultSkills } from './defaultValues';
import { IBonusSkillPackage } from '../utils/SkillPointPackages';
import { DEFAULT_SKILL_POINTS } from '../constants/gameRules';
import { DEFAULT_SKILLS } from '../types/characterTypes';
import { ProfessionConfigOptions } from '../types/componentTypes';


type SKillsContextType = {
    // State values
    bonusPointsRemaining: number;
    BonusSkillPackage: IBonusSkillPackage | null;
    config: ProfessionConfigOptions;
    profession: IProfession | null;
    remainingSkillChoices: number;
    selectedSkillsIds: string[];
    skills: Skills;
    skillPointsRemaining: number;

    // Functions
    adjustBonus: (skillKey: string, adjustment: number) => boolean;
    applyBonusSkillPackage: (bsp: IBonusSkillPackage) => void;
    applyProfessionSkills: (professionSkills: Skill[]) => void;
    calculateSkillValue: (skillId: string) => number;
    changeConfig: (newConfig: ProfessionConfigOptions) => void;
    changeProfession: (profession: IProfession) => void;
    clearBonusSkillPackage: () => void;
    resetSkills: () => void;
    setConfig: (config: ProfessionConfigOptions) => void;
    setProfession: (profession: IProfession) => void;
    setRemainingSkillChoices: (remainingSkillChoices: number | ((prev: number) => number)) => void;
    setSelectedSkillsIds: (selectedSkillsIds: string[] | ((prev: string[]) => string[])) => void;
    setSkills: (skills: Skills) => void;
    setSkillById: (skillKey: string, skillUpdate: Partial<Skill>) => boolean;
    setSkillPointsRemaining: (skillPointsRemaining: number) => void;
}

const MAX_BONUS_POINTS = 8;
const SKILL_CAP = 80;

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
    const [BonusSkillPackage, setBonusSkillPackage] = useState<IBonusSkillPackage | null>(null);
    const [profession, setProfession] = useState<IProfession | null>(null);
    const [selectedSkillsIds, setSelectedSkillsIds] = useState<string[]>([]);
    const [skillPointsRemaining, setSkillPointsRemaining] = useState(DEFAULT_SKILL_POINTS);
    const [config, setConfig] = useState<ProfessionConfigOptions>(ProfessionConfigOptions.StandardProfessions);
    const [remainingSkillChoices, setRemainingSkillChoices] = useState(profession?.chosenSkillCount || 0);
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
        console.warn(`Skill with id: ${skillId} not found`);
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

    const changeConfig = (newConfig: ProfessionConfigOptions) => {
        if(newConfig === ProfessionConfigOptions.CustomProfessions){
            setSelectedSkillsIds([]);
            applyProfessionSkills([]);
        }
        setConfig(newConfig);
    }

    // AJS refactor move this to a util function for testing convenience
    const calculateSkillValue = (skillId: string): number => {
        const skillValue = Number(getSkillProperty(skillId, 'value'));
        const bonusValue = Number(getSkillProperty(skillId, 'bonus')) * 20;
        const calculatedValue = skillValue + bonusValue;
        return SKILL_CAP < calculatedValue ? SKILL_CAP : calculatedValue;
    }

    const applyBonusSkillPackage = (bsp: IBonusSkillPackage) => {
        setBonusSkillPackage(bsp);
        const updatedSkills = [...skills];

        // AJS start here, subtyped skills are not being applied
        bsp.skills.forEach(skill => {
            // need branching logic here, update if name matches but no subType, or if name and subType match
            console.log('bsp skill', skill);
            const nameMatches = updatedSkills.some(s => s.name === skill.skillName);
            const hasSubType = skill.subType !== undefined;
            const subTypeMatches = updatedSkills.some(s => s.name === skill.skillName && s.subType === skill.subType);

            if(nameMatches && !hasSubType || (subTypeMatches)) {
                console.log('name matches and subtype matches', nameMatches, hasSubType);
                const skillIndex = updatedSkills.findIndex(s => s.name === skill.skillName && s.subType === skill.subType);
                if(skillIndex !== -1){
                    updatedSkills[skillIndex].bonus = 1;
                }
            }

            // if name matches, but subtype doesn't match, check the skill value of the name matching skill
            if(nameMatches && !subTypeMatches){
                const skillIndex = updatedSkills.findIndex(s => s.name === skill.skillName);
                // if no points are allocated there, update the subtype of the skill in context to match the one from the bonus package
                if(updatedSkills[skillIndex].value !== DEFAULT_SKILLS.find(s => s.name === skill.skillName)?.value){
                    if(skillIndex !== -1){
                        console.log('updating skill with new subtype', skill.skillName, skill.subType);
                        updatedSkills[skillIndex].bonus = 1;
                        updatedSkills[skillIndex].subType = skill.subType;
                    }
                // if points are allocated there, add another skill with the name and subtype from the bonus package
                } else {
                    console.log('adding new skill', skill.skillName, skill.subType);
                    const newSkill = {
                        ...DEFAULT_SKILLS.find(s => s.name === skill.skillName),
                        bonus: 1,
                        subType: skill.subType
                    };
                    updatedSkills.push(newSkill);
                }
            }
        });

        const sortedSkills = updatedSkills.sort((a, b) => a.name.localeCompare(b.name));
        setSkills(sortedSkills);
        setBonusPointsRemaining(bsp.personalSpecialties);
    }

    const adjustBonus = (skillId: string, newBonus: number): boolean => {
        const currentBonus = typeof getSkillProperty(skillId, 'bonus') === 'number' ? getSkillProperty(skillId, 'bonus') : 0;
        const pointDifference = Number(newBonus) - Number(currentBonus);
        
        // Check if we have enough points
        if (bonusPointsRemaining - pointDifference < 0) {
            return false;
        }

        // Update the bonus
        const success = setSkillById(skillId, { bonus: newBonus });
        // Update remaining points & update skill values if successful
        if (success) {
            setBonusPointsRemaining(bonusPointsRemaining - pointDifference);
        }

        return success;
    };

    const resetSkills = () => {
        setSkills(defaultSkills);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
    };

    
    const applyProfessionSkills = (professionSkills: Skill[]) => {
        // Start with default skills that don't match any profession skills
        const newSkills = defaultSkills.filter(defaultSkill => 
            !professionSkills.some(ps => ps.name === defaultSkill.name)
        );

        // First add all profession skills
        professionSkills.forEach(profSkill => {
            // Check if we already added this exact skill (same name and subtype)
            const alreadyAdded = newSkills.some(s => 
                s.name === profSkill.name && 
                s.subType === profSkill.subType
            );
            
            if (!alreadyAdded) {
                newSkills.push(profSkill);
            }
        });

        // Then add any chosen skills that have different subtypes
        skills.forEach(chosenSkill => {
            const isChosen = chosenSkill.value !== DEFAULT_SKILLS.find(ds => ds.name === chosenSkill.name)?.value;
            const matchingProfSkill = professionSkills.find(ps => 
                ps.name === chosenSkill.name && 
                ps.subType === chosenSkill.subType
            );
            
            // If it's a chosen skill and doesn't match any profession skill exactly (name + subtype)
            if (isChosen && !matchingProfSkill) {
                const alreadyAdded = newSkills.some(s => 
                    s.name === chosenSkill.name && 
                    s.subType === chosenSkill.subType
                );
                
                if (!alreadyAdded) {
                    newSkills.push(chosenSkill);
                }
            }
        });

        const sortedSkills = newSkills.sort((a, b) => a.name.localeCompare(b.name));

        setBonusPointsRemaining(MAX_BONUS_POINTS);
        setSkills(sortedSkills);
        setBonusPointsRemaining(calculateRemainingBonusPoints());
    };

    const changeProfession = (profession: IProfession) => {
        setSelectedSkillsIds([]);
        setProfession(profession);
        applyProfessionSkills(profession.professionalSkills);
        setRemainingSkillChoices(profession.chosenSkillCount);
    };

    const clearBonusSkillPackage = () => {
        setBonusSkillPackage(null);
        // Reset all bonus values to 0
        // also need to remove skills if they are not in the default skills array
        const updatedSkills = skills.map(skill => {
            const defaultSkill = DEFAULT_SKILLS.find(s => s.name === skill.name && s.subType === skill.subType);
            return defaultSkill || { ...skill, bonus: 0 };
        });
        setSkills(updatedSkills);
        // Reset bonus points to maximum
        setBonusPointsRemaining(MAX_BONUS_POINTS);
    };

    return (
        <SkillsContext.Provider 
            value={{ 
                bonusPointsRemaining,
                BonusSkillPackage,
                config,
                profession,
                remainingSkillChoices,
                selectedSkillsIds,
                skills,
                skillPointsRemaining,
                adjustBonus,
                applyBonusSkillPackage,
                applyProfessionSkills,
                calculateSkillValue,
                changeProfession,
                changeConfig,
                clearBonusSkillPackage,
                resetSkills,
                setConfig,
                setProfession,
                setRemainingSkillChoices,
                setSelectedSkillsIds,
                setSkills,
                setSkillById,
                setSkillPointsRemaining,
            }}>
            {children}
        </SkillsContext.Provider>
    );
};