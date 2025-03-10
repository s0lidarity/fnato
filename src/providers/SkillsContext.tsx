import { useContext, useState } from 'preact/hooks';
import { createContext } from 'preact';

import { Skill, Skills, IProfession } from '../types/characterTypes';
import { generateDefaultSkills } from './defaultValues';
import { IBonusSkillPackage } from '../utils/SkillPointPackages';
import { DEFAULT_SKILL_POINTS, MAX_BONUS_POINTS, DEFAULT_TOTAL_CAP, DEFAULT_BONDS, DEFAULT_BONUS_VALUE } from '../constants/gameRules';
import { DEFAULT_SKILLS } from '../types/characterTypes';
import { ProfessionConfigOptions } from '../types/componentTypes';
import { bondCountSignal } from '../signals/bondSignal';
import { createSkillId } from '../utils/Professions';

type SkillsContextType = {
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
    getSkillById: (id: string) => Skill | undefined;
    resetAllBonusPoints: () => void;
    resetProfession: () => void;
    resetSkills: () => void;
    setBonusPointsRemaining: (bonusPointsRemaining: number) => void;
    setProfession: (profession: IProfession) => void;
    setRemainingSkillChoices: (remainingSkillChoices: number | ((prev: number) => number)) => void;
    setSelectedSkillsIds: (selectedSkillsIds: string[] | ((prev: string[]) => string[])) => void;
    setSkills: (skills: Skills | ((prev: Skills) => Skills)) => void;
    setSkillById: (skillKey: string, skillUpdate: Partial<Skill>) => boolean;
    setSkillPointsRemaining: (skillPointsRemaining: number) => void;
    updateSkillAdjustment: (skillId: string, adjustment: number) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

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
    
    // Helper Functions
    const getSkillProperty = (skillId: string, property: keyof Skill): any => {
        const skill = skills.find(s => s.id === skillId);
        if (!skill) return null;
        return skill[property];
    };
    
    const setSkillById = (skillId: string, skillUpdate: Partial<Skill>): boolean => {
        const index = skills.findIndex(s => s.id === skillId);
        if(index !== -1){
            const updatedSkill = { ...skills[index], ...skillUpdate };
            const newSkills = [
                ...skills.slice(0, index),
                updatedSkill,
                ...skills.slice(index + 1)
            ];
            setSkills(newSkills);
            return true;
        }
        console.warn(`Skill with id: ${skillId} not found`);
        return false;
    };


    const changeConfig = (newConfig: ProfessionConfigOptions) => {
        setSelectedSkillsIds([]);
        applyProfessionSkills([]);
        resetAllBonusPoints();
        bondCountSignal.value = DEFAULT_BONDS;
        setConfig(newConfig);
    }

    // AJS starting point, bonus is applied wrong needs to be based off of config as well
    const calculateSkillValue = (skillId: string, currentSkills?: Skills): number => {
        const skillsToUse = currentSkills || skills;

        const skill = skillsToUse.find(s => s.id === skillId);
        if (!skill) {
            console.warn(`Skill not found for ID: ${skillId}`);
            return 0;
        }
        let total = 0;
        switch(config){
            case ProfessionConfigOptions.StandardProfessions:
                total = skill.value + (skill.bonus * DEFAULT_BONUS_VALUE);
                break;
            case ProfessionConfigOptions.CustomProfessions:
                const baseValue = DEFAULT_SKILLS.find(s => s.name === skill.name)?.value || 0;
                total = baseValue + skill.pointsAllocated + (skill.bonus * DEFAULT_BONUS_VALUE);
                break;
        }

        // Apply damaged veteran adjustment if present
        if (skill.damagedVeteranSkillAdjustment) {
            total += skill.damagedVeteranSkillAdjustment;
        }

        return Math.min(DEFAULT_TOTAL_CAP, total);
    };

    const adjustBonus = (skillId: string, newBonus: number): boolean => {
        const currentBonus = typeof getSkillProperty(skillId, 'bonus') === 'number' ? getSkillProperty(skillId, 'bonus') : 0;
        const pointDifference = Number(newBonus) - Number(currentBonus);
        
        if (pointDifference > 0 && bonusPointsRemaining - pointDifference < 0) {
            return false;
        }

        const success = setSkillById(skillId, { bonus: newBonus });
        if (success) {
            setBonusPointsRemaining(bonusPointsRemaining - pointDifference);
        }

        return success;
    };

    const resetProfession = () => {
        setProfession(null);
        setSelectedSkillsIds([]);
        setSkillPointsRemaining(DEFAULT_SKILL_POINTS);
        setRemainingSkillChoices(0);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
        setSkills(defaultSkills);
    };

    const resetSkills = () => {
        setSkills(defaultSkills);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
    };

    const applyBonusSkillPackage = (bsp: IBonusSkillPackage) => {
        setBonusSkillPackage(bsp);
        const updatedSkills = [...skills];

        bsp.skills.forEach(skill => {
            const nameMatches = updatedSkills.some(s => s.name === skill.skillName);
            const hasSubType = skill.subType !== undefined;
            const subTypeMatches = updatedSkills.some(s => s.name === skill.skillName && s.subType === skill.subType);

            if((nameMatches && !hasSubType) || subTypeMatches) {
                const skillIndex = updatedSkills.findIndex(s => s.name === skill.skillName && s.subType === skill.subType);
                if(skillIndex !== -1){
                    updatedSkills[skillIndex].bonus = 1;
                }
            }

            if(nameMatches && !subTypeMatches){
                const skillIndex = updatedSkills.findIndex(s => s.name === skill.skillName);
                if(updatedSkills[skillIndex].value !== DEFAULT_SKILLS.find(s => s.name === skill.skillName)?.value){
                    if(skillIndex !== -1){
                        updatedSkills[skillIndex].bonus = 1;
                        updatedSkills[skillIndex].subType = skill.subType;
                    }
                } else {
                    const newSkill = {
                        ...DEFAULT_SKILLS.find(s => s.name === skill.skillName),
                        bonus: 1,
                        subType: skill.subType
                    };
                    updatedSkills.push(newSkill);
                }
            }
        });

        updatedSkills.sort((a, b) => a.name.localeCompare(b.name));
        setSkills(updatedSkills);
        setBonusPointsRemaining(bsp.personalSpecialties);
    }

    const applyProfessionSkills = (professionSkills: Skill[]) => {
        // Start with default skills to ensure we have a clean base
        const updatedSkills = [...defaultSkills];
        
        professionSkills.forEach(profSkill => {
            if (profSkill.subType) {
                // For subtyped skills, we need to create a new skill entry or update existing one
                const baseSkill = defaultSkills.find(s => 
                    s.name.toLowerCase() === profSkill.name.toLowerCase()
                );
                
                if (!baseSkill) {
                    console.warn(`No base skill found for ${profSkill.name}`);
                    return;
                }

                const skillId = profSkill.id || createSkillId(profSkill.name, profSkill.subType);
                
                // Check if this subtyped skill already exists
                const existingIndex = updatedSkills.findIndex(s => 
                    (s.id === skillId) || 
                    (s.name === profSkill.name && s.subType === profSkill.subType)
                );
                
                if (existingIndex !== -1) {
                    // Update existing subtyped skill
                    updatedSkills[existingIndex] = {
                        ...updatedSkills[existingIndex],
                        value: profSkill.value,
                        bonus: 0
                    };
                } else {
                    // Add the new subtyped skill
                    updatedSkills.push({
                        ...baseSkill,
                        id: skillId,
                        subType: profSkill.subType,
                        value: profSkill.value,
                        bonus: 0
                    });
                }
            } else {
                // For regular skills, update the existing entry
                const existingIndex = updatedSkills.findIndex(s => 
                    s.id === profSkill.id || 
                    (s.name === profSkill.name && !s.subType)
                );
                
                if (existingIndex !== -1) {
                    updatedSkills[existingIndex] = {
                        ...updatedSkills[existingIndex],
                        value: profSkill.value,
                        bonus: 0
                    };
                } else {
                    // If somehow the skill doesn't exist in default skills, add it
                    updatedSkills.push({
                        ...profSkill,
                        bonus: 0
                    });
                }
            }
        });

        // Sort skills
        const sortedSkills = updatedSkills.sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            if (nameCompare !== 0) return nameCompare;
            
            if (!a.subType && !b.subType) return 0;
            if (!a.subType) return -1;
            if (!b.subType) return 1;
            return a.subType.localeCompare(b.subType);
        });

        setSkills(sortedSkills);
        return sortedSkills;
    };

    const changeProfession = (profession: IProfession) => {
        setSelectedSkillsIds([]);
        setProfession(profession);
        setSkillPointsRemaining(DEFAULT_SKILL_POINTS);
        setRemainingSkillChoices(profession.chosenSkillCount);
        
        // Apply new profession skills
        const newSkills = applyProfessionSkills(profession.professionalSkills);
        
        return newSkills;
    };

    const clearBonusSkillPackage = () => {
        const updatedSkills = skills.filter(skill => {
            const defaultSkillWithSubtype = DEFAULT_SKILLS.find(ds => 
                ds.name === skill.name && ds.subType === skill.subType
            );

            const defaultSkill = DEFAULT_SKILLS.find(ds => ds.name === skill.name);
            const isDefaultValue = skill.value === defaultSkill?.value;

            return defaultSkillWithSubtype || !skill.subType || !isDefaultValue;
        }).map(skill => ({
            ...skill,
            bonus: 0
        }));
        
        setSkills(updatedSkills);
        setBonusSkillPackage(null);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
    };

    const resetAllBonusPoints = () => {
        const newSkills = skills.map(skill => ({
            ...skill,
            bonus: 0
        }));
        setSkills(newSkills);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
        setBonusSkillPackage(null);
    };

    const getSkillById = (id: string): Skill | undefined => {
        return skills.find(s => s.id === id);
    };

    const updateSkillAdjustment = (skillId: string, adjustment: number) => {
        setSkills(prevSkills => {
            return prevSkills.map(skill => {
                if (skill.id === skillId) {
                    return {
                        ...skill,
                        damagedVeteranSkillAdjustment: (skill.damagedVeteranSkillAdjustment || 0) + adjustment
                    };
                }
                return skill;
            });
        });
    };

    return (
        <SkillsContext.Provider
            value={{
                // State values
                bonusPointsRemaining,
                BonusSkillPackage,
                config,
                profession,
                remainingSkillChoices,
                selectedSkillsIds,
                skills,
                skillPointsRemaining,

                // Functions
                adjustBonus,
                applyBonusSkillPackage,
                applyProfessionSkills,
                calculateSkillValue,
                changeConfig,
                changeProfession,
                clearBonusSkillPackage,
                getSkillById,
                resetAllBonusPoints,
                resetProfession,
                resetSkills,
                setBonusPointsRemaining,
                setProfession,
                setRemainingSkillChoices,
                setSelectedSkillsIds,
                setSkills,
                setSkillById,
                setSkillPointsRemaining,
                updateSkillAdjustment,
            }}>
            {children}
        </SkillsContext.Provider>
    );
};