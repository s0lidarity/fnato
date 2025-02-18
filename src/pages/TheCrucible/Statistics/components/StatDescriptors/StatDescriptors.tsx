import { Button, TextInput } from "react95";
import styled from "styled-components";
import { Trans } from '@lingui/react/macro';
import { useLingui } from '@lingui/react';

import { useStats } from "../../../../../providers/StatisticsContext";
import { DISTINGUISHING_FEATURES } from "../../.../../../../../types/characterTypes";


const StyledStatDescriptorContainer = styled.div.attrs<any>({
    'data-component': 'StatDescriptors/StyledStatDescriptorContainer',
    'data-testid': 'styled-stat-descriptor-container',
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.25rem;
`;

const StyledInputContainer = styled.div.attrs<any>({
    'data-component': 'StatDescriptors/StyledInputContainer',
    'data-testid': 'styled-input-container',
})`
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-left: 0.5rem;
`;

const StyledTextInput = styled(TextInput).attrs<any>({
    'data-component': 'StatDescriptors/StyledTextInput',
    'data-testid': 'styled-text-input',
})`
    flex-grow: 1;
    margin-right: 0.5rem;
`;

const StyledButtonContainer = styled.div.attrs<any>({
    'data-component': 'StatDescriptors/StyledButtonContainer',
    'data-testid': 'styled-button-container',
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
`;

const StyledHeading = styled.h2.attrs<any>({
    'data-component': 'StatDescriptors/StyledHeading',
    'data-testid': 'styled-heading',
})`
    margin-bottom: 1rem;
    text-align: center;
`;


function StatDescriptors() {
    const { stats, setStats } = useStats();
    const { i18n } = useLingui();
    const handleChange = (e, statKey) => {
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: e.target.value}})
    };

    const handleClear = (e, statKey) => {
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: e.target.value}})
    };

    const handleClearAll = () => {
        const tempStats = {...stats};
        Object.keys(tempStats).forEach(key => {
            tempStats[key].distinguishingFeature = '';
        });
        setStats(tempStats);
    };

    // need to limit this to the relevant statkey
    const assignSuggested = (statKey) => {
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: DISTINGUISHING_FEATURES[statKey][stats[statKey].score]}})
    };

    const assignAllSuggested = () => {
        const tempStats = JSON.parse(JSON.stringify(stats));
        Object.keys(tempStats).forEach(key => {
            const statKey = key as keyof typeof DISTINGUISHING_FEATURES;
            const score = tempStats[statKey].score;
            const suggestedFeature = DISTINGUISHING_FEATURES[statKey][score];

            if(suggestedFeature){
                tempStats[statKey].distinguishingFeature = suggestedFeature;
            } else {
                console.warn(`No suggested feature for ${statKey} with score ${score}`);
            }
        });
        setStats(tempStats);
    };

    const statDescriptor = (statKey: string) => {
        const placeholderDescriptor = DISTINGUISHING_FEATURES[statKey][stats[statKey].score];
        const placeholder = i18n._(placeholderDescriptor);
        
        return (
            <StyledStatDescriptorContainer key={`${statKey}-container`}>
                <StyledInputContainer>
                    <StyledTextInput
                        key={`${statKey}-input`}
                        type="text" 
                        id={`${statKey}-descriptor`} 
                        placeholder={placeholder}
                        value={stats[statKey].distinguishingFeature} 
                        onChange={(e) => handleChange(e, statKey)}
                    />
                    <Button onClick={(e) => handleClear(e, statKey)}><Trans>Clear</Trans></Button>
                    <Button onClick={() => assignSuggested(statKey)}><Trans>Use Suggested</Trans></Button>
                </StyledInputContainer>
            </StyledStatDescriptorContainer>
        );
    };

    // needs a description and label for each stat
    return (
        <div>
            <StyledHeading><Trans>Distinguishing Features</Trans></StyledHeading>
            {Object.keys(stats).map(statKey => statDescriptor(statKey))}
            <StyledButtonContainer>
                <Button onClick={handleClearAll}><Trans>Clear Descriptors</Trans></Button>
                <Button onClick={assignAllSuggested}><Trans>Use All Suggestions</Trans></Button>
            </StyledButtonContainer>
        </div>
    );
}

export default StatDescriptors;