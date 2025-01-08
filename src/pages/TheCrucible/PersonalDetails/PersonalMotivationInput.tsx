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
    gap: 1rem;
    padding: 0.5rem;
    justify-content: space-between;
`;

const StyledLabel = styled.label.attrs<any>({
    'data-testid:': 'personal-motivation-label',
    'data-component': 'PersonalDetails/PersonalMotivationLabel',
})`
    width: 11rem;
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
            <TextInput
                type="text"
                value={personalDetails.personalMotivations[index]}
                onChange={handleChange}
                fullWidth
            />
        </PersonalMotivationInputContainer>
    )
}

export default PersonalMotivationInput;