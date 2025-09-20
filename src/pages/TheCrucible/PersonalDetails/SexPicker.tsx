import styled from "styled-components";
import { JSX } from "react";
import { Radio, TextInput } from "react95";
import { t } from '@lingui/core/macro';

import { usePersonalDetails } from "../../../providers/PersonalDetailsContext";
import PageNumberTooltip from "../../../components/PageNumberTooltip/PageNumberTooltip";

const RadioButtons = styled.div.attrs<any>({
    'data-component': 'PersonalDetails/RadioButtons',
    'data-testid': 'personal-details-radio-buttons',
})`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
`;

const StyledTextInput = styled(TextInput).attrs<any>({
    'data-component': 'PersonalDetails/StyledTextInput',
    'data-testid': 'personal-details-styled-text-input',
})`
    margin-top: 0.5rem;
`;

const StyledLabel = styled.label.attrs<any>({
    'data-component': 'PersonalDetails/StyledLabel',
    'data-testid': 'personal-details-styled-label',
})`
    display: flex;
    align-items: center;
    padding-top: 0.3rem;
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
`;

function SexPicker() {
    const { personalDetails, setPersonalDetails } = usePersonalDetails();

    const handleRadioChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setPersonalDetails({
            ...personalDetails,
            sex: value
        });
    };

    const handleTextChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
        setPersonalDetails({
            ...personalDetails,
            sex: e.currentTarget.value
        });
    };

    return (
        <InputContainer>
            <StyledLabel htmlFor="sex">
                {t`Gender`}
                <PageNumberTooltip pageNumber={1}></PageNumberTooltip>
            </StyledLabel>
            <RadioButtons>
                <Radio 
                    value="Male"
                    checked={personalDetails.sex === 'Male'}
                    label="Male"
                    name="sex"
                    onChange={handleRadioChange}
                />
                <Radio 
                    value="Female"
                    checked={personalDetails.sex === 'Female'}
                    label="Female"
                    name="sex"
                    onChange={handleRadioChange}
                />
                <Radio 
                    value=""
                    checked={personalDetails.sex !== 'Male' && personalDetails.sex !== 'Female'}
                    label="Other"
                    name="sex"
                    onChange={handleRadioChange}
                />
            </RadioButtons>
            
            {personalDetails.sex !== 'Male' && personalDetails.sex !== 'Female' && (
                <StyledTextInput
                    id="sex"
                    name="sex"
                    value={personalDetails.sex || ''}
                    onChange={handleTextChange}
                    fullWidth
                    placeholder="Please specify"
                />
            )}
        </InputContainer>
    );
}

export default SexPicker;