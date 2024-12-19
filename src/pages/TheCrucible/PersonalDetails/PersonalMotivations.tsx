import styled from 'styled-components';
import { GroupBox } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
import PersonalMotivationInput from './PersonalMotivationInput';
import { MAX_PERSONAL_MOTIVATIONS } from '../../../constants/gameRules';
const PersonalMotivationsContainer = styled.div.attrs<any>({
    'data-testid': 'personal-motivations-container',
    'data-component': 'PersonalDetails/PersonalMotivationsContainer',
})`
    display: flex;
    flex-direction: column;
`;

// AJS starting point
// whenever a user types in one text area, add another until there are 5 total

const renderMotivations = (motivations: string[]) => {
    const motivationInputs = [];
    for (let i = 0; i < motivations.length; i++) {
        motivationInputs.push(<PersonalMotivationInput key={i} index={i} />);
    }
    if (motivations.length < MAX_PERSONAL_MOTIVATIONS) {
        motivationInputs.push(
            <PersonalMotivationInput key={motivations.length} index={motivations.length} />
        );
    }
    return motivationInputs;
}

function PersonalMotivations() {
    const { personalDetails } = usePersonalDetails();

    return (
        <PersonalMotivationsContainer>
            <GroupBox label="Personal Motivations">
                {renderMotivations(personalDetails.personalMotivations)}
            </GroupBox>
        </PersonalMotivationsContainer>
    );
}

export default PersonalMotivations;