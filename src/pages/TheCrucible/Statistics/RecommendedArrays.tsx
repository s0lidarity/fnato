import { useEffect, useState } from "preact/hooks";
import { styled } from "styled-components";
import { GroupBox, Radio, Select } from "react95";

import { RECOMMENDED_ARRAYS } from "../../../utils/CharacterGenerator";
import { useStats } from "../../../providers/StatisticsContext";

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
    const [recommendedArray, setRecommendedArray] = useState(RECOMMENDED_ARRAYS[0]);

    const toggleCheck = (e) => {
        setRecommendedArray(e.target.value);
    };

    const renderRARadios = () => {
        for(const ra of RECOMMENDED_ARRAYS) {
            return(
                <Radio 
                    key={ra.key}
                    checked={recommendedArray.key === ra.key}
                    name="recommendedArray"
                    label={ra.label}
                    value={ra.key}
                    onChange={toggleCheck}
                />
            )
        }
    };

    const renderSelects = () => {

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
                    
                    
                </StyledGroupBox>
            </div>
        </div>
    );
};