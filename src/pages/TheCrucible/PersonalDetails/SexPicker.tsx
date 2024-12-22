import styled from "styled-components";
import { JSX } from "react";
import { GroupBox, Radio, TextInput } from "react95";

import { usePersonalDetails } from "../../../providers/PersonalDetailsContext";

const RadioButtons = styled.div.attrs<any>({
    'data-component': 'PersonalDetails/RadioButtons',
    'data-testid': 'personal-details-radio-buttons',
})`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 1rem;
`;

const StyledTextInput = styled(TextInput).attrs<any>({
    'data-component': 'PersonalDetails/StyledTextInput',
    'data-testid': 'personal-details-styled-text-input',
})`
    margin-top: 0.5rem;
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
        <GroupBox>
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
        </GroupBox>
    );
}

export default SexPicker;