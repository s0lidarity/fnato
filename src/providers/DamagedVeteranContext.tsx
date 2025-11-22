import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { DamagedVeteranAdjustment, EXTREME_VIOLENCE, CAPTIVITY_OR_IMPRISONMENT, HARD_EXPERIENCE, THINGS_MAN_WAS_NOT_MEANT_TO_KNOW } from '../types/characterTypes';
import { useStats } from './StatisticsContext';
import { useSkills } from './SkillsContext';
import { useBonds } from './BondsContext';
import { DV_BONUS, MAX_HARDENED_VETERAN_SKILLS } from '../constants/gameRules';

type DamagedVeteranContextType = {
    // State values
    activeTemplates: string[];
    selectedHardExperienceSkills: string[];

    // Functions
    activateTemplate: (templateId: string) => void;
    deactivateTemplate: (templateId: string) => void;
    getTemplateById: (templateId: string) => DamagedVeteranAdjustment | undefined;
    selectSkillsForTemplate: (templateId: string, skills: string[]) => void;
};

export const DamagedVeteranContext = createContext<DamagedVeteranContextType | undefined>(undefined);

export const useDamagedVeteran = () => {
    const context = useContext(DamagedVeteranContext);
    if (!context) {
        throw new Error('useDamagedVeteran must be used within a DamagedVeteranProvider');
    }
    return context;
};

export const DamagedVeteranProvider = ({ children }: { children: preact.ComponentChildren }) => {
    // Dependencies
    const { updateSkillAdjustment } = useSkills();
    const { updateBondAdjustments } = useBonds();

    // State
    const [activeTemplates, setActiveTemplates] = useState<string[]>([]);
    const [selectedHardExperienceSkills, setSelectedHardExperienceSkills] = useState<string[]>([]);

    // Template Management
    const getTemplateById = (templateId: string): DamagedVeteranAdjustment | undefined => {
        const templates: { [key: string]: DamagedVeteranAdjustment } = {
            'extreme-violence': EXTREME_VIOLENCE,
            'captivity-or-imprisonment': CAPTIVITY_OR_IMPRISONMENT,
            'hard-experience': HARD_EXPERIENCE,
            'things-man-was-not-meant-to-know': THINGS_MAN_WAS_NOT_MEANT_TO_KNOW,
        };
        return templates[templateId];
    };

    const activateTemplate = (templateId: string) => {
        const template = getTemplateById(templateId);
        if (!template) return;

        // Apply skill adjustments
        Object.entries(template.skillAdjustment).forEach(([skillName, adjustment]) => {
            updateSkillAdjustment(skillName, adjustment);
        });

        // Apply bond adjustments if any
        if (template.bondAdjustment) {
            updateBondAdjustments(template.bondAdjustment);
        }

        setActiveTemplates(prev => {
            // Prevent duplicates
            if (prev.includes(templateId)) {
                return prev;
            }
            const newActiveTemplates = [...prev, templateId];
            return newActiveTemplates;
        });
    };

    const deactivateTemplate = (templateId: string) => {
        const template = getTemplateById(templateId);
        if (!template) return;

        // Remove skill adjustments
        Object.entries(template.skillAdjustment).forEach(([skillName, adjustment]) => {
            updateSkillAdjustment(skillName, -adjustment);
        });

        // Remove bond adjustments if any
        if (template.bondAdjustment) {
            updateBondAdjustments({
                remove: -template.bondAdjustment.remove,
                adjustScore: -template.bondAdjustment.adjustScore
            });
        }

        setActiveTemplates(prev => prev.filter(id => id !== templateId));
        
        // Clean up selected skills for Hard Experience template
        if (templateId === 'hard-experience') {
            // Remove all selected skills and their bonuses
            selectedHardExperienceSkills.forEach(skillId => {
                updateSkillAdjustment(skillId, -DV_BONUS);
            });
            setSelectedHardExperienceSkills([]);
        }
    };

    const selectSkillsForTemplate = (skillId: string, skills: string[]) => {
        if (!skillId || !skills){
            console.error("No Skill ID or Skills provided to selectSkillsForTemplate:", skillId, skills);
            return;
        }


        if(selectedHardExperienceSkills.includes(skillId)) {
            // Remove previous skill selections if any
            setSelectedHardExperienceSkills(prev => prev.filter(id => id !== skillId));
            updateSkillAdjustment(skillId, -DV_BONUS);
        } else if (selectedHardExperienceSkills.length < MAX_HARDENED_VETERAN_SKILLS) {
        // Apply new skill selections
            setSelectedHardExperienceSkills(prev => [...prev, skillId]);
            updateSkillAdjustment(skillId, DV_BONUS);
        }
    };

    const clearTemplate = (templateId: string) => {
        const template = getTemplateById(templateId);
        if (!template) return;

        // Remove stat adjustments
        
    }

    return (
        <DamagedVeteranContext.Provider
            value={{
                // State
                activeTemplates,
                selectedHardExperienceSkills: selectedHardExperienceSkills,

                // Functions
                activateTemplate,
                deactivateTemplate,
                getTemplateById,
                selectSkillsForTemplate,
            }}
        >
            {children}
        </DamagedVeteranContext.Provider>
    );
}; 