import styled from 'styled-components';

import Guidance from '../../../components/Guidance/Guidance';

const PersonalDetailsGuidanceContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-guidance-container',
    'data-component': 'PersonalDetails/PersonalDetailsGuidanceContainer',
})`
    display: flex;
    flex-direction: column;
`;

const ContentContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-guidance-content-container',
    'data-component': 'PersonalDetails/PersonalDetailsGuidanceContentContainer',
})`
    text-wrap: pretty;
`;

const content = `Use these prompts to flesh out your character. They are all optional but can help put you in the shoes of your character.`

function PersonalDetailsGuidance() {
    return (
        <PersonalDetailsGuidanceContainer>
            <Guidance title="Personal Details" buttonText="Personal Details">
                <ContentContainer>{content}</ContentContainer>
            </Guidance>
        </PersonalDetailsGuidanceContainer>
    );
}

export default PersonalDetailsGuidance;