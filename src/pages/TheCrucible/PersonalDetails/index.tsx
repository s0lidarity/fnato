import styled from 'styled-components';
import { JSX } from 'preact';
import { t } from '@lingui/core/macro';
import { Button } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext'
import PersonalMotivations from './PersonalMotivations';
import DamagedVeteranTemplates from './DamagedVeteranTemplates';
import PersonalDetailsGuidance from './PersonalDetailsGuidance';
import SexPicker from './SexPicker';
import { ButtonsContainer } from '../../Summary';
import PersonalDetailsInput from './PersonalDetailsInput';
import DateOfBirthPicker from './DateOfBirthPicker';

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
    justify-self: center;

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
`;


// AJS start here: add tiny numbers indicating the character sheet page number that the field will be on
function PersonalDetails() {
    const { personalDetails, resetPersonalDetails, setPersonalDetails } = usePersonalDetails();

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
                <PersonalDetailsInput
                    label={t`First Name`}
                    htmlFor="firstName"
                    pageNumber={1}
                    value={personalDetails.lastName}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Last Name`}
                    htmlFor="lastName"
                    pageNumber={1}
                    value={personalDetails.lastName}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Middle Initial`}
                    htmlFor="middleInitial"
                    pageNumber={1}
                    value={personalDetails.middleInitial}
                    onChange={handleChange}
                />
                
                <PersonalDetailsInput
                    label={t`Alias`}
                    htmlFor="alias"
                    pageNumber={3}
                    value={personalDetails.alias}
                    onChange={handleChange}
                />

                <DateOfBirthPicker />

                <InputContainer>
                    <SexPicker />
                </InputContainer>

                <PersonalDetailsInput
                    label={t`Appearance`}
                    htmlFor="appearance"
                    rows={3}
                    pageNumber={3}
                    value={personalDetails.appearance || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput 
                    label={t`Employer`}
                    htmlFor="employer"
                    pageNumber={1}
                    value={personalDetails.employer || ''}
                    onChange={handleChange}
                />
                
                <PersonalDetailsInput
                    label={t`Nationality`}
                    htmlFor="nationality"
                    pageNumber={1}
                    value={personalDetails.nationality || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Education`}
                    htmlFor="education"
                    pageNumber={1}
                    value={personalDetails.education || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Personality`}
                    htmlFor="personality"
                    pageNumber={1}
                    rows={3}
                    value={personalDetails.personality || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Beliefs`}
                    htmlFor="beliefs"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.beliefs || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Hobbies`}
                    htmlFor="hobbies"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.hobbies || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Obsessions`}
                    htmlFor="obsessions"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.obsessions || ''}
                    onChange={handleChange}
                />


                <PersonalDetailsInput
                    label={t`Motivations`}
                    htmlFor="motivations"
                    pageNumber={1}
                    rows={3}
                    value={personalDetails.motivations || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Admire`}
                    htmlFor="admire"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.admire || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Dislike`}
                    htmlFor="dislike"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.dislike || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Trust in Delta Green`}
                    htmlFor="trustInDeltaGreen"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.trustInDeltaGreen || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Why does Delta Green trust this agent?`}
                    htmlFor="deltaGreenAgreement"
                    pageNumber={3}
                    rows={3}
                    value={personalDetails.deltaGreenAgreement || ''}
                    onChange={handleChange}
                />
                <DamagedVeteranTemplates />
                <PersonalMotivations />
            </FormContainer>
            <ButtonsContainer>
                <Button onClick={resetPersonalDetails}>{t`Reset Personal Details`}</Button>
            </ButtonsContainer>
        </div>
    );
}

export default PersonalDetails;