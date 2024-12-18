import styled from 'styled-components';

const PersonalMotivationsContainer = styled.div.attrs<any>({
    'data-testid': 'personal-motivations-container',
    'data-component': 'PersonalDetails/PersonalMotivationsContainer',
})`
    display: flex;
    flex-direction: column;
`;


// AJS starting point
// whenever a user types in one text area, add another until there are 5 total

function PersonalMotivations() {
    return (
        <PersonalMotivationsContainer>
            <p>Personal Motivations</p>
        </PersonalMotivationsContainer>
    );
}

export default PersonalMotivations;