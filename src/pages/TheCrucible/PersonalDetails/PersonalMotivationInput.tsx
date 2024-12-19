import styled from 'styled-components';
import { TextInput } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
const PersonalMotivationInputContainer = styled.div.attrs<any>({
    'data-testid': 'personal-motivation-input-container',
    'data-component': 'PersonalDetails/PersonalMotivationInputContainer',
})`
    display: flex;
    flex-direction: column;
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
            <TextInput
                type="text"
                value={personalDetails.personalMotivations[index]}
                onChange={handleChange}
            />
        </PersonalMotivationInputContainer>
    )
}

export default PersonalMotivationInput;