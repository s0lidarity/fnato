import styled from 'styled-components';
import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { t } from '@lingui/core/macro';
import { Button } from 'react95';

import { usePersonalDetails } from '../../../providers/PersonalDetailsContext'
import PersonalMotivations from './PersonalMotivations';
import DamagedVeteranTemplates from './DamagedVeteranTemplates';
import PersonalDetailsGuidance from './PersonalDetailsGuidance';
import StyledCalendar from '../../../components/RetroDatePicker';
import Dialogue from '../../../components/Dialogue/Dialogue';
import SexPicker from './SexPicker';
import { ButtonsContainer } from '../../Summary';
import PageNumberTooltip from '../../../components/PageNumberTooltip/PageNumberTooltip';
import PersonalDetailsInput from './PersonalDetailsInput';

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
                {/* AJS:TODO make this a component */}
                <InputContainer>
                    <label htmlFor="dateOfBirth" tabIndex={-1}>
                        {t`Date of Birth`}
                    </label>
                    <PageNumberTooltip pageNumber={1} />
                    <Button onClick={() => setShowDateOfBirth(true)}>
                        {personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toLocaleDateString() : t`Select Date of Birth`}
                    </Button>
                    <Dialogue
                        title={t`Date of Birth`}
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

                <PersonalDetailsInput
                    label={t`Appearance`}
                    htmlFor="appearance"
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
                    value={personalDetails.personality || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Beliefs`}
                    htmlFor="beliefs"
                    pageNumber={3}
                    value={personalDetails.beliefs || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Hobbies`}
                    htmlFor="hobbies"
                    pageNumber={3}
                    value={personalDetails.hobbies || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Obsessions`}
                    htmlFor="obsessions"
                    pageNumber={3}
                    value={personalDetails.obsessions || ''}
                    onChange={handleChange}
                />


                <PersonalDetailsInput
                    label={t`Motivations`}
                    htmlFor="motivations"
                    pageNumber={1}
                    value={personalDetails.motivations || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Admire`}
                    htmlFor="admire"
                    pageNumber={3}
                    value={personalDetails.admire || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Dislike`}
                    htmlFor="dislike"
                    pageNumber={3}
                    value={personalDetails.dislike || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Trust in Delta Green`}
                    htmlFor="trustInDeltaGreen"
                    pageNumber={3}
                    value={personalDetails.trustInDeltaGreen || ''}
                    onChange={handleChange}
                />

                <PersonalDetailsInput
                    label={t`Why does Delta Green trust this agent?`}
                    htmlFor="deltaGreenAgreement"
                    pageNumber={3}
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