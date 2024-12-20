import styled from 'styled-components';
import { GroupBox } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
import PersonalMotivationInput from './PersonalMotivationInput';
import { MAX_PERSONAL_MOTIVATIONS } from '../../../constants/gameRules';
import Guidance from '../../../components/Guidance/Guidance';
const PersonalMotivationsContainer = styled.div.attrs<any>({
    'data-testid': 'personal-motivations-container',
    'data-component': 'PersonalDetails/PersonalMotivationsContainer',
})`
    display: flex;
    flex-direction: column;
`;

// AJS starting point
// whenever a user types in one text area, add another until there are 5 total

const reminderTextA = `Personal Motivations represent what drives your Agent beyond their Bonds. 
These can be faith, patriotism, hobbies, or even the love of a pet. While 
powerful, these motivations aren't as strong as Bonds to other humans.`;

const reminderTextB = `Your Agent can have up to five Personal Motivations. Add them during character 
creation or as your story develops. Each time your Agent experiences a Breaking 
Point, remove one motivation to represent their growing trauma.`;

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
                <Guidance title="Personal Motivations" buttonText="Personal Motivations">
                    <p>{reminderTextA}</p>
                    <p>{reminderTextB}</p>
                </Guidance>
                {renderMotivations(personalDetails.personalMotivations)}
            </GroupBox>
        </PersonalMotivationsContainer>
    );
}

export default PersonalMotivations;