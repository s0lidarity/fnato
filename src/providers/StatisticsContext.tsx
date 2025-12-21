import { createContext } from 'preact';
import { useContext, useMemo, useState } from 'preact/hooks';
import { Statistics, DerivedAttributes, DamagedVeteranAdjustment, EXTREME_VIOLENCE, CAPTIVITY_OR_IMPRISONMENT, HARD_EXPERIENCE, THINGS_MAN_WAS_NOT_MEANT_TO_KNOW } from '../types/characterTypes';
import { calculateDerivedAttributes } from '../utils/CharacterGenerator';
import { defaultStats } from './defaultValues';
import { StatsConfigOptions } from '../types/componentTypes';
import { 
    isBaseStat, 
    isDerivedAttribute, 
    calculateDerivedAttributeEffectValue
} from '../utils/statHelpers';

type StatsContextType = {
    // State values
    config: StatsConfigOptions;
    derivedAttributes: DerivedAttributes;
    stats: Statistics;

    // Functions
    getEffectiveDerivedAttribute: (daName: string, activeTemplates?: string[]) => number;
    getEffectiveStatValue:(statName: string, activeTemplates?: string[]) => number;
    resetStats: () => void;
    setConfig: (config: StatsConfigOptions) => void;
    setStats: (stats: Statistics) => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

// AJS TODO: clean up Stats vs Statistics consistency across app
export const useStats = () => {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
};

// Helper to get all templates
const getAllTemplates = (): { [key: string]: DamagedVeteranAdjustment } => {
    return {
        'extreme-violence': EXTREME_VIOLENCE,
        'captivity-or-imprisonment': CAPTIVITY_OR_IMPRISONMENT,
        'hard-experience': HARD_EXPERIENCE,
        'things-man-was-not-meant-to-know': THINGS_MAN_WAS_NOT_MEANT_TO_KNOW,
    };
};

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [stats, setStats] = useState<Statistics>(defaultStats);
    const [config, setConfig] = useState<StatsConfigOptions>(StatsConfigOptions.ManualInput);

    const derivedAttributes = useMemo(() => calculateDerivedAttributes(stats), [stats]);

    const resetStats = () => {
        setStats(defaultStats);
    };

    const getEffectiveStatValue = (statName: string, activeTemplates: string[] = []): number => {
        if (!isBaseStat(statName)) return 0;
        
        // Start with base stat value (without any adjustments)
        const baseValue = stats[statName as keyof Statistics].score;
        
        // Calculate total adjustment from all active templates
        const templates = getAllTemplates();
        let totalAdjustment = 0;
        
        activeTemplates.forEach(templateId => {
            const template = templates[templateId];
            if (!template) return;
            
            const adjustment = template.statAdjustment[statName];
            if (adjustment !== undefined) {
                if (typeof adjustment === 'number') {
                    totalAdjustment += adjustment;
                } else {
                    // Dynamic adjustment based on another stat
                    const sourceStatEffectiveValue = getEffectiveStatValue(adjustment, activeTemplates);
                    totalAdjustment += -sourceStatEffectiveValue; // Negative because it's a reduction
                }
            }
        });
        
        return baseValue + totalAdjustment;
    };

    const getEffectiveDerivedAttribute = (daName: string, activeTemplates: string[] = []) => {
        if (!isDerivedAttribute(daName)) return 0;
        
        // Start with the base derived attribute value (calculated from base stats)
        const baseValue = derivedAttributes[daName as keyof DerivedAttributes]?.currentValue || 0;
        
        // Calculate total direct adjustment to this derived attribute from all active templates
        const templates = getAllTemplates();
        let totalAdjustment = 0;
        
        activeTemplates.forEach(templateId => {
            const template = templates[templateId];
            if (!template) return;
            
            const adjustment = template.statAdjustment[daName];
            if (adjustment !== undefined) {
                // Use base stats for dynamic adjustments to avoid double-dipping
                const { effectValue } = calculateDerivedAttributeEffectValue(adjustment, stats);
                totalAdjustment += effectValue;
            }
        });
        
        return baseValue + totalAdjustment;
    };

    return (
        <StatsContext.Provider value={{
            config,
            derivedAttributes,
            stats,
            getEffectiveDerivedAttribute,
            getEffectiveStatValue,
            resetStats,
            setConfig,
            setStats,
        }}>
            {children}
        </StatsContext.Provider>
    );
};