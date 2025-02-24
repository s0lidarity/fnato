import styled from 'styled-components';
import { t } from '@lingui/core/macro';

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



function PersonalDetailsGuidance() {
    const content = t`Use these prompts to flesh out your character. They are all optional but can help put you in the shoes of your character.`;

    return (
        <PersonalDetailsGuidanceContainer>
            <Guidance title={t`Personal Details`} buttonText={t`Personal Details`}>
                <ContentContainer>{content}</ContentContainer>
            </Guidance>
        </PersonalDetailsGuidanceContainer>
    );
}

export default PersonalDetailsGuidance;