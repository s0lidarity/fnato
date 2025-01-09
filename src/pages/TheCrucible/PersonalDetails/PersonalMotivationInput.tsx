import styled from 'styled-components';
import { TextInput } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';

const PersonalMotivationInputContainer = styled.div.attrs<any>({
    'data-testid': 'personal-motivation-input-container',
    'data-component': 'PersonalDetails/PersonalMotivationInputContainer',
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 1rem;
    padding: 0.5rem;
`;

const StyledLabel = styled.label.attrs<any>({
    'data-testid:': 'personal-motivation-label',
    'data-component': 'PersonalDetails/PersonalMotivationLabel',
})`
    min-width: fit-content;
`;

const StyledTextInput = styled(TextInput).attrs<any>({
    'data-testid': 'personal-motivation-input',
    'data-component': 'PersonalDetails/PersonalMotivationInput',
})`
    flex: 1;
    min-width: 20rem;
`;

function PersonalMotivationInput({index}: {index: number}) {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();
    const handleChange = (e: any) => {
        const updatedMotivations = [...personalDetails.personalMotivations];
        updatedMotivations[index] = e.target.value;
        setPersonalDetails({ ...personalDetails, personalMotivations: updatedMotivations });
    };

    return (
        <PersonalMotivationInputContainer>
            <StyledLabel htmlFor={`personal-motivation-${index}`}>Personal Motivation {index + 1}</StyledLabel>
            <StyledTextInput
                type="text"
                value={personalDetails.personalMotivations[index]}
                onChange={handleChange}
                fullWidth
            />
        </PersonalMotivationInputContainer>
    )
}

export default PersonalMotivationInput;