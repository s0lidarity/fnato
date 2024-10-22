import { Button } from "react95";
import styled from "styled-components";

import { useStats } from "../../../../../providers/StatisticsContext";
import { DISTINGUISHING_FEATURES } from "../../.../../../../../types/characterTypes";

function StatDescriptors() {
    const { stats, setStats } = useStats();

    // function to render a label and text input for each stat
    // have placeholder text mapped from DISTINGUISHING_FEATURES
    // button to insert placeholder text into input
    // button to clear individual inputs

    // save value of input to stat.key.distinguishingFeature onChange

    // reset button to reset all descriptors to suggested text
    // button to use placeholder text for all descriptors

    return (
        <div>
            <form>
                <label htmlFor="strength">Strength</label>
                <input 
                    type="text" 
                    id="strength" 
                    value={stats.strength.score} 
                    onChange={() => console.log('changed')}
                />
            </form>
        </div>
    );
}

export default StatDescriptors;