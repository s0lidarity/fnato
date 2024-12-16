import styled from 'styled-components';

const PersonalMotivationsContainer = styled.div.attrs<any>({
    'data-testid': 'personal-motivations-container',
    'data-component': 'PersonalDetails/PersonalMotivationsContainer',
})`
    display: flex;
    flex-direction: column;
`;

function PersonalMotivations() {
    return (
        <PersonalMotivationsContainer>
            <p>Personal Motivations</p>
        </PersonalMotivationsContainer>
    );
}

export default PersonalMotivations;