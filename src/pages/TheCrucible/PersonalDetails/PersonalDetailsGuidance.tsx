import styled from 'styled-components';

import Guidance from '../../../components/Guidance/Guidance';

const PersonalDetailsGuidanceContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-guidance-container',
    'data-component': 'PersonalDetails/PersonalDetailsGuidanceContainer',
})`
    display: flex;
    flex-direction: column;
`;

function PersonalDetailsGuidance() {
    return (
        <PersonalDetailsGuidanceContainer>
            <Guidance title="Personal Details" buttonText="Personal Details">
                <p>Personal Details Guidance</p>
            </Guidance>
        </PersonalDetailsGuidanceContainer>
    );
}

export default PersonalDetailsGuidance;