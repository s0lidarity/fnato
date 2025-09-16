import styled from 'styled-components';
import { JSX } from 'preact';
import { Button } from 'react95';
import { t } from '@lingui/core/macro';

import Dialogue from '../../../components/Dialogue/Dialogue';
import PageNumberTooltip from '../../../components/PageNumberTooltip/PageNumberTooltip';
import StyledCalendar from '../../../components/RetroDatePicker';
import { usePersonalDetails } from '../../../providers/PersonalDetailsContext'

const InputContainer = styled.div.attrs<any>({
    'data-testid': 'date-of-birth-input-container',
    'data-component': 'PersonalDetails/DateOfBirthInputContainer',
})`
    display: flex;
    flex-direction: column;
`;


function DateOfBirthPicker() {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();
    const [showDateOfBirth, setShowDateOfBirth] = useState(false);

    return (
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
    );
};

export default DateOfBirthPicker;