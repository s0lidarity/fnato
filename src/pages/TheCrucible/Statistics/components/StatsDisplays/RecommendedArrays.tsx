import { useEffect, useState } from "preact/hooks";
import { styled } from "styled-components";
import { GroupBox, Radio, Select } from "react95";

import { RECOMMENDED_ARRAYS } from "../../../../../utils/CharacterGenerator";
import { useStats } from "../../../../../providers/StatisticsContext";

// AJS unify this shared styled component
const StyledGroupBox = styled(GroupBox)`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
`;

export function RecommendedArrays() {
    const { stats, setStats } = useStats();
    const [selectedArray, setSelectedArray] = useState(RECOMMENDED_ARRAYS[0].key);
    const [usedStats, setUsedStats] = useState<number[]>([]);
    const [availableStats, setAvailableStatts] = useState<number[]>(RECOMMENDED_ARRAYS[0].stats);

    const toggleCheck = (e) => {
        setSelectedArray(e.target.value);
    };

    // needs to update usedStats, removing selected stat from array
    // might need to have a --- option to be able to deselect
    const handleSelectChange = (e) => {

    }

    // needs to update available stats when a stat is used
    useEffect(() => {

    }, [usedStats]);

    const renderRARadios = () => {
        for(const ra of RECOMMENDED_ARRAYS) {
            return(
                <Radio 
                    key={ra.key}
                    checked={selectedArray === ra.key}
                    name="recommendedArray"
                    label={ra.label}
                    value={ra.key}
                    onChange={toggleCheck}
                />
            )
        }
    };

    const renderSelects = () => {
        for(const stat of Object.keys(stats)) {
            return (
                <span>
                    <label>{stat}</label>
                    <Select
                        options={availableStats.map(stat => ({ label: stat.toString(), value: stat }))}
                        onChange={handleSelectChange}  
                    />
                </span>
            )
        }
    }

    return (
        <div>
            <div>
                <StyledGroupBox>
                    {renderRARadios()}
                </StyledGroupBox>
            </div>
            <div>
                <StyledGroupBox>
                    {renderSelects()}
                </StyledGroupBox>
            </div>
        </div>
    );
};