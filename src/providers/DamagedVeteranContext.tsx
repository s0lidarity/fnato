import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { DamagedVeteranAdjustment } from '../types/characterTypes';
import { useSkills } from './SkillsContext';
import { useStats } from './StatisticsContext';

type DamagedVeteranContextType = {
    // State values
    activeAdjustments: DamagedVeteranAdjustment[];
    isEnabled: boolean;

    // Functions
    addAdjustment: (adjustment: DamagedVeteranAdjustment) => void;
    applyAdjustments: () => void;
    clearAdjustments: () => void;
    getActiveAdjustmentById: (id: string) => DamagedVeteranAdjustment | undefined;
    removeAdjustment: (adjustmentId: string) => void;
    setIsEnabled: (isEnabled: boolean) => void;
    toggleAdjustment: (adjustment: DamagedVeteranAdjustment) => void;
};

const DamagedVeteranContext = createContext<DamagedVeteranContextType | undefined>(undefined);

export const useDamagedVeteran = () => {
    const context = useContext(DamagedVeteranContext);
    if (!context) {
        throw new Error('useDamagedVeteran must be used within a DamagedVeteranProvider');
    }
    return context;
};

export const DamagedVeteranProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeAdjustments, setActiveAdjustments] = useState<DamagedVeteranAdjustment[]>([]);
    const [isEnabled, setIsEnabled] = useState(false);
    
    const { skills, setSkills } = useSkills();
    const { stats, setStats } = useStats();

    // Apply adjustments whenever activeAdjustments or isEnabled changes
    useEffect(() => {
        if (isEnabled) {
            applyAdjustments();
        } else {
            // Reset any adjustments if disabled
            resetAdjustments();
        }
    }, [isEnabled, activeAdjustments]);

    const addAdjustment = (adjustment: DamagedVeteranAdjustment) => {
        // Check if adjustment already exists
        if (!activeAdjustments.some(adj => adj.id === adjustment.id)) {
            setActiveAdjustments([...activeAdjustments, adjustment]);
        }
    };

    const removeAdjustment = (adjustmentId: string) => {
        setActiveAdjustments(activeAdjustments.filter(adj => adj.id !== adjustmentId));
    };

    const toggleAdjustment = (adjustment: DamagedVeteranAdjustment) => {
        const exists = activeAdjustments.some(adj => adj.id === adjustment.id);
        if (exists) {
            removeAdjustment(adjustment.id);
        } else {
            addAdjustment(adjustment);
        }
    };

    const getActiveAdjustmentById = (id: string): DamagedVeteranAdjustment | undefined => {
        return activeAdjustments.find(adj => adj.id === id);
    };

    const clearAdjustments = () => {
        setActiveAdjustments([]);
    };

    // Apply all active adjustments to skills and stats
    const applyAdjustments = () => {
        if (!isEnabled || activeAdjustments.length === 0) {
            return;
        }

        // Apply skill adjustments
        const updatedSkills = [...skills];
        
        // Reset any previous damaged veteran adjustments
        updatedSkills.forEach(skill => {
            skill.damagedVeteranSkillAdjustment = 0;
        });

        // Apply new adjustments
        activeAdjustments.forEach(adjustment => {
            Object.entries(adjustment.skillAdjustment).forEach(([skillName, value]) => {
                const skillIndex = updatedSkills.findIndex(s => 
                    s.name.toLowerCase() === skillName.toLowerCase()
                );
                
                if (skillIndex !== -1) {
                    const currentAdjustment = updatedSkills[skillIndex].damagedVeteranSkillAdjustment || 0;
                    updatedSkills[skillIndex].damagedVeteranSkillAdjustment = currentAdjustment + value;
                }
            });
        });

        setSkills(updatedSkills);

        // Apply stat adjustments
        const updatedStats = { ...stats };
        
        // Reset any previous damaged veteran adjustments
        Object.keys(updatedStats).forEach(statKey => {
            updatedStats[statKey].damagedVeteranStatAdjustment = 0;
        });

        // Apply new adjustments
        activeAdjustments.forEach(adjustment => {
            Object.entries(adjustment.statAdjustment).forEach(([statName, value]) => {
                if (updatedStats[statName]) {
                    const currentAdjustment = updatedStats[statName].damagedVeteranStatAdjustment || 0;
                    updatedStats[statName].damagedVeteranStatAdjustment = currentAdjustment + value;
                }
            });
        });

        setStats(updatedStats);
    };

    // Reset all adjustments
    const resetAdjustments = () => {
        // Reset skill adjustments
        const updatedSkills = [...skills];
        updatedSkills.forEach(skill => {
            skill.damagedVeteranSkillAdjustment = 0;
        });
        setSkills(updatedSkills);

        // Reset stat adjustments
        const updatedStats = { ...stats };
        Object.keys(updatedStats).forEach(statKey => {
            updatedStats[statKey].damagedVeteranStatAdjustment = 0;
        });
        setStats(updatedStats);
    };

    return (
        <DamagedVeteranContext.Provider
            value={{
                // State values
                activeAdjustments,
                isEnabled,

                // Functions
                addAdjustment,
                applyAdjustments,
                clearAdjustments,
                getActiveAdjustmentById,
                removeAdjustment,
                setIsEnabled,
                toggleAdjustment,
            }}
        >
            {children}
        </DamagedVeteranContext.Provider>
    );
}; 