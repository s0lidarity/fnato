import { useState } from 'preact/hooks';
import { Button, TextInput, Tooltip } from "react95";
import styled from "styled-components";

import { useStats } from "../../../../../providers/StatisticsContext";
import { DISTINGUISHING_FEATURES } from "../../.../../../../../types/characterTypes";


const StyledTooltipInnerText = styled.span`
    padding: 0.5rem;
    color: ${({ theme }) => theme.materialDark};
`;

const StyledStatDescriptorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.25rem;
`;

const StyledLabel = styled.label`
    width: 4rem;
    display: flex;
    align-items: center;
`;

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-left: 0.5rem;
`;

const StyledTextInput = styled(TextInput)`
    flex-grow: 1;
    margin-right: 0.5rem;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
`;

const StyledHeading = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
`;


function StatDescriptors() {
    const { stats, setStats } = useStats();

    // function to render a label and text input for each stat
    // have placeholder text mapped from DISTINGUISHING_FEATURES
    // button to insert placeholder text into input
    // button to clear individual inputs

    // save value of input to stat.key.distinguishingFeature onChange
    const handleChange = (e, statKey) => {
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: e.target.value}})
    };

    const handleClear = (e, statKey) => {
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: e.target.value}})
    };

    // need to limit this to the relevant statkey
    const handleClearAll = () => {
        const tempStats = {...stats};
        Object.keys(tempStats).forEach(key => {
            tempStats[key].distinguishingFeature = '';
        });
        setStats(tempStats);
    };

    // need to limit this to the relevant statkey
    const assignSuggested = (e, statKey) => {
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: DISTINGUISHING_FEATURES[statKey][stats[statKey].score]}})
    };

    const assignAllSuggested = () => {
        let tempStats = {...stats};
        Object.keys(tempStats).forEach(key => {
            console.log(key);
            console.log(DISTINGUISHING_FEATURES[key][stats[key].score]);
            tempStats[key].distinguishingFeature = DISTINGUISHING_FEATURES[key][stats[key].score];
        });
        setStats(tempStats);
    };

    // StatKey should be an enum
    interface statDescriptorProps {
        statKey: string;
    };

    const statDescriptor = (statKey) => {
        return (
            <StyledStatDescriptorContainer>
                <StyledInputContainer>
                    <StyledTextInput 
                        type="text" 
                        id={`${statKey}-descriptor`} 
                        placeholder={DISTINGUISHING_FEATURES[statKey][stats[statKey].score]}
                        value={stats[statKey].distinguishingFeature} 
                        onChange={(e) => handleChange(e, statKey)}
                    />
                    <Button onClick={(e) => handleClear(e, statKey)}>Clear</Button>
                    <Button onClick={(e) => assignSuggested(e, statKey)}>Use Suggested</Button>
                </StyledInputContainer>
            </StyledStatDescriptorContainer>
        );
    };

    // needs a description and label for each stat
    return (
        <div>
            <StyledHeading>Distinguishing Features</StyledHeading>
            {Object.keys(stats).map(statKey => statDescriptor(statKey))}
            <StyledButtonContainer>
                <Button onClick={handleClearAll}>Clear Descriptors</Button>
                <Button onClick={assignAllSuggested}>Use All Suggestions</Button>
            </StyledButtonContainer>
        </div>
    );
}

export default StatDescriptors;