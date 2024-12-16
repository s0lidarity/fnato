import { usePersonalDetails } from '../../../providers/PersonalDetailsContext'
import { DetailedDescription } from '../../../types/characterTypes';
import { TextInput, GroupBox } from 'react95';
import styled from 'styled-components';
import { JSX } from 'preact';
import PersonalMotivations from './PersonalMotivations';
import DamagedVeteranTemplates from './DamagedVeteranTemplates';

const FormContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-form-container',
    'data-component': 'PersonalDetails/FormContainer'
})`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 0.5rem;
    column-gap: 0.5rem;
    width: 95%;
    justify-items: center;
    justify-content: space-evenly;
`;

const InputContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-input-container',
    'data-component': 'PersonalDetails/InputContainer'
})`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 95%;
    min-width: fit-content;
    margin-bottom: 1rem;

    label {
        margin-bottom: 0.5rem;
    }
`;

const StyledGroupBox = styled(GroupBox)`
    padding: 1rem;
    margin: 1rem;
    width: 95%;
`;

export function PersonalDetails() {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();

    const handleChange = (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => {
        const target = e.currentTarget;
        setPersonalDetails({
            ...personalDetails,
            [target.name]: target.value,
        });
    };

    return (
        <StyledGroupBox label="Personal Details">
            {/* AJS add a guidance for the page here */}
            <FormContainer>
                <InputContainer>
                    <label htmlFor="name">Name:</label>
                    <TextInput
                        id="name"
                        name="name"
                        value={personalDetails.name}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="alias">Alias:</label>
                    <TextInput
                        id="alias"
                        name="alias"
                        value={personalDetails.alias || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="age">Age:</label>
                    <TextInput
                        type="number"
                        id="age"
                        name="age"
                        value={personalDetails.age}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="appearance">Appearance:</label>
                    <TextInput
                        id="appearance"
                        name="appearance"
                        value={personalDetails.appearance}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="education">Education:</label>
                    <TextInput
                        id="education"
                        name="education"
                        value={personalDetails.education || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="personality">Personality:</label>
                    <TextInput
                        id="personality"
                        name="personality"
                        value={personalDetails.personality || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="beliefs">Beliefs:</label>
                    <TextInput
                        id="beliefs"
                        name="beliefs"
                        value={personalDetails.beliefs || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="hobbies">Hobbies:</label>
                    <TextInput
                        id="hobbies"
                        name="hobbies"
                        value={personalDetails.hobbies || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="obsessions">Obsessions:</label>
                    <TextInput
                        id="obsessions"
                        name="obsessions"
                        value={personalDetails.obsessions || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="motivations">Motivations:</label>
                    <TextInput
                        id="motivations"
                        name="motivations"
                        value={personalDetails.motivations || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="admire">Something you admire:</label>
                    <TextInput
                        id="admire"
                        name="admire"
                        value={personalDetails.admire || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="dislike">Something you dislike:</label>
                    <TextInput
                        id="dislike"
                        name="dislike"
                        value={personalDetails.dislike || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="trustInDeltaGreen">Why does Delta Green trust this agent?</label>
                    <TextInput
                        id="trustInDeltaGreen"
                        name="trustInDeltaGreen"
                        value={personalDetails.trustInDeltaGreen || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="deltaGreenAgreement">Why does this agent serve Delta Green?</label>
                    <TextInput
                        id="deltaGreenAgreement"
                        name="deltaGreenAgreement"
                        value={personalDetails.deltaGreenAgreement || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                </InputContainer>
                <DamagedVeteranTemplates />
                <PersonalMotivations />
            </FormContainer>
        </StyledGroupBox>
    );
}

export default PersonalDetails;