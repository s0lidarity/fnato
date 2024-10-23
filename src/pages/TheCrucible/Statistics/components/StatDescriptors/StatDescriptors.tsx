import { useState } from 'preact/hooks';
import { Button, TextInput, Tooltip } from "react95";
import styled from "styled-components";

import { useStats } from "../../../../../providers/StatisticsContext";
import { DISTINGUISHING_FEATURES } from "../../.../../../../../types/characterTypes";



function StatDescriptors() {
    const { stats, setStats } = useStats();
    const [descriptor, setDescriptor] = useState('');

    // function to render a label and text input for each stat
    // have placeholder text mapped from DISTINGUISHING_FEATURES
    // button to insert placeholder text into input
    // button to clear individual inputs

    // save value of input to stat.key.distinguishingFeature onChange
    const handleChange = (e, statKey) => {
        setDescriptor(e.target.value);
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: e.target.value}})
    }

    // need to limit this to the relevant statkey
    const handleClear = (statKey) => {
        setDescriptor('');
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: ''}})
    }

    // need to limit this to the relevant statkey
    const handleUseSuggested = (statKey) => {
        setDescriptor(DISTINGUISHING_FEATURES[statKey][stats[statKey].score]);
        setStats({...stats, [statKey]: {...stats[statKey], distinguishingFeature: DISTINGUISHING_FEATURES[statKey][stats[statKey].score]}})
    }

    const statDescriptor = (statKey) => {
        return (
            <span>
                <Tooltip text={DISTINGUISHING_FEATURES[statKey][stats[statKey].score]}>
                    {/* AJS the following should be a util */}
                    <label>{statKey.charAt(0).toUpperCase() + statKey.slice(1)}</label>
                    <TextInput 
                        type="text" 
                        id={`${statKey}-descriptor`} 
                        placeholder={DISTINGUISHING_FEATURES[statKey][stats[statKey].score]}
                        value={descriptor} 
                        onChange={(e) => handleChange(e, statKey)}
                    />
                </Tooltip>
                <Button onClick={() => handleClear(statKey)}>Clear</Button>
                <Button onClick={() => handleUseSuggested(statKey)}>Use Suggested</Button>
            </span>
        );
    };

    // needs a description and label for each stat
    return (
        <div>
            {Object.keys(stats).map(statKey => statDescriptor(statKey))}
            <div>
                <Button>Reset All</Button>
                <Button>Use All Suggestions</Button>
            </div>
        </div>
    );
}

export default StatDescriptors;