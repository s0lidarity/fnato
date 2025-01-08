import styled from 'styled-components';
import { JSX } from 'preact';
import { TextInput, Button } from 'react95';
import { useState } from 'preact/hooks';
import { IoCheckmarkSharp } from 'react-icons/io5';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext'
import PersonalMotivations from './PersonalMotivations';
import DamagedVeteranTemplates from './DamagedVeteranTemplates';
import PersonalDetailsGuidance from './PersonalDetailsGuidance';
import StyledCalendar from '../../../components/RetroDatePicker';
import Dialogue from '../../../components/Dialogue/Dialogue';
import SexPicker from './SexPicker';
import { ButtonsContainer } from '../../Summary';
import PageNumberTooltip from '../../../components/PageNumberTooltip/PageNumberTooltip';

const FormContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-form-container',
    'data-component': 'PersonalDetails/FormContainer'
})`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    column-gap: 0.5rem;
    width: 95%;
    justify-items: center;
    justify-content: space-evenly;

    & > *:nth-last-child(-n+1) {
        grid-column: span 2;
    }
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
`;


// AJS start here: add tiny numbers indicating the character sheet page number that the field will be on
function PersonalDetails() {
    const { personalDetails, resetPersonalDetails, setPersonalDetails } = usePersonalDetails();
    const [showDateOfBirth, setShowDateOfBirth] = useState(false);

    // AJS todo apply this JSX event to change event handlers where e: any is applied
    const handleChange = (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => {
        const target = e.currentTarget;
        setPersonalDetails({
            ...personalDetails,
            [target.name]: target.value,
        });
    };

    return (
        <div>
            <PersonalDetailsGuidance />
            <FormContainer>
                <InputContainer>
                    <label htmlFor="firstName">
                        <PageNumberTooltip pageNumber={1}>First Name:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="firstName"
                        name="firstName"
                        value={personalDetails.firstName}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="lastName">
                        <PageNumberTooltip pageNumber={1}>Last Name:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="lastName"
                        name="lastName"
                        value={personalDetails.lastName}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="middleInitial">
                        <PageNumberTooltip pageNumber={1}>Middle Initial:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="middleInitial"
                        name="middleInitial"
                        value={personalDetails.middleInitial || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="alias">
                        <PageNumberTooltip pageNumber={3}>Alias:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="alias"
                        name="alias"
                        value={personalDetails.alias || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="dateOfBirth">
                        <PageNumberTooltip pageNumber={1}>Date of Birth:</PageNumberTooltip>
                    </label>
                    <Button onClick={() => setShowDateOfBirth(true)}>
                        {personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toLocaleDateString() : 'Select Date of Birth'}
                    </Button>
                    <Dialogue
                        title="Date of Birth"
                        show={showDateOfBirth}
                        setShow={setShowDateOfBirth}
                    >
                        <StyledCalendar
                            value={personalDetails.dateOfBirth ? new Date(personalDetails.dateOfBirth) : null}
                            onChange={(date) => {
                                setPersonalDetails({
                                    ...personalDetails,
                                    dateOfBirth: date ? (date as Date) : null,
                                });
                            }}
                        />
                        <ButtonContainer>
                            <Button onClick={() => setShowDateOfBirth(false)}><IoCheckmarkSharp /></Button>
                        </ButtonContainer>
                    </Dialogue>
                </InputContainer>

                <InputContainer>
                    <SexPicker />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="appearance">
                        <PageNumberTooltip pageNumber={3}>Appearance:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="employer">
                        <PageNumberTooltip pageNumber={1}>Employer:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="employer"
                        name="employer"
                        value={personalDetails.employer || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="nationality">
                        <PageNumberTooltip pageNumber={1}>Nationality:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="nationality"
                        name="nationality"
                        value={personalDetails.nationality || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="education">
                        <PageNumberTooltip pageNumber={1}>Education:</PageNumberTooltip>
                    </label>
                    <TextInput
                        id="education"
                        name="education"
                        value={personalDetails.education || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                </InputContainer>

                <InputContainer>
                    <label htmlFor="personality">
                        <PageNumberTooltip pageNumber={3}>Personality:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="beliefs">
                        <PageNumberTooltip pageNumber={3}>Beliefs:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="hobbies">
                        <PageNumberTooltip pageNumber={3}>Hobbies:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="obsessions">
                        <PageNumberTooltip pageNumber={3}>Obsessions:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="motivations">
                        <PageNumberTooltip pageNumber={3}>Motivations:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="admire">
                        <PageNumberTooltip pageNumber={3}>Something you admire:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="dislike">
                        <PageNumberTooltip pageNumber={3}>Something you dislike:</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="trustInDeltaGreen">
                        <PageNumberTooltip pageNumber={3}>Why does Delta Green trust this agent?</PageNumberTooltip>
                    </label>
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
                    <label htmlFor="deltaGreenAgreement">
                        <PageNumberTooltip pageNumber={3}>Why does this agent serve Delta Green?</PageNumberTooltip>
                    </label>
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
            <ButtonsContainer>
                <Button onClick={resetPersonalDetails}>Reset Personal Details</Button>
            </ButtonsContainer>
        </div>
    );
}

export default PersonalDetails;