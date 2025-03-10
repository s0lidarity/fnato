import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { DamagedVeteranAdjustment, EXTREME_VIOLENCE, CAPTIVITY_OR_IMPRISONMENT, HARD_EXPERIENCE, THINGS_MAN_WAS_NOT_MEANT_TO_KNOW } from '../types/characterTypes';
import { useStats } from './StatisticsContext';
import { useSkills } from './SkillsContext';
import { useBonds } from './BondsContext';

type DamagedVeteranContextType = {
    // State values (alphabetically ordered)
    activeTemplates: string[];
    selectedSkills: { [templateId: string]: string[] };

    // Functions (alphabetically ordered)
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
    const { stats, updateStatAdjustment } = useStats();
    const { updateSkillAdjustment } = useSkills();
    const { updateBondAdjustments } = useBonds();

    // State
    const [activeTemplates, setActiveTemplates] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<{ [templateId: string]: string[] }>({});

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

        // Apply stat adjustments
        Object.entries(template.statAdjustment).forEach(([statName, adjustment]) => {
            if (typeof adjustment === 'number') {
                updateStatAdjustment(statName, adjustment);
            } else {
                // For dynamic adjustments (e.g., 'power' for sanity reduction)
                const sourceStatName = adjustment;
                const sourceStat = stats[sourceStatName];
                if (sourceStat) {
                    updateStatAdjustment(statName, -sourceStat.score); // Negative because it's a reduction
                }
            }
        });

        // Apply skill adjustments
        Object.entries(template.skillAdjustment).forEach(([skillName, adjustment]) => {
            updateSkillAdjustment(skillName, adjustment);
        });

        // Apply bond adjustments if any
        if (template.bondAdjustment) {
            updateBondAdjustments(template.bondAdjustment);
        }

        setActiveTemplates(prev => [...prev, templateId]);
    };

    const deactivateTemplate = (templateId: string) => {
        const template = getTemplateById(templateId);
        if (!template) return;

        // Remove stat adjustments
        Object.entries(template.statAdjustment).forEach(([statName, adjustment]) => {
            if (typeof adjustment === 'number') {
                updateStatAdjustment(statName, -adjustment); // Reverse the adjustment
            } else {
                // For dynamic adjustments (e.g., 'power' for sanity reduction)
                const sourceStatName = adjustment;
                const sourceStat = stats[sourceStatName];
                if (sourceStat) {
                    updateStatAdjustment(statName, sourceStat.score); // Positive because we're reversing
                }
            }
        });

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
        
        // Clean up selected skills
        const { [templateId]: _, ...rest } = selectedSkills;
        setSelectedSkills(rest);
    };

    const selectSkillsForTemplate = (templateId: string, skills: string[]) => {
        const template = getTemplateById(templateId);
        if (!template || !template.skillSelectionRules) return;

        // Validate skill count
        if (skills.length !== template.skillSelectionRules.count) return;

        // Remove previous skill selections if any
        const previousSkills = selectedSkills[templateId] || [];
        previousSkills.forEach(skillName => {
            updateSkillAdjustment(skillName, -template.skillSelectionRules!.bonus);
        });

        // Apply new skill selections
        skills.forEach(skillName => {
            updateSkillAdjustment(skillName, template.skillSelectionRules!.bonus);
        });

        setSelectedSkills(prev => ({
            ...prev,
            [templateId]: skills
        }));
    };

    return (
        <DamagedVeteranContext.Provider
            value={{
                // State
                activeTemplates,
                selectedSkills,

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