import styled from 'styled-components';
import { JSX } from 'preact';

import PageNumberTooltip from '../../../components/PageNumberTooltip/PageNumberTooltip';
import { TextInput } from 'react95';

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

const LabelContainer = styled.div.attrs<any>({
    'data-testid': 'personal-details-label-container',
    'data-component': 'PersonalDetails/LabelContainer',
})`
    display: flex;
    align-items: center;
`;

const Label = styled.label.attrs<any>({
    'data-testid': 'personal-details-label',
    'data-component': 'PersonalDetails/Label',
})`
    display: flex;
    margin-right: 0.2rem;
    align-items: left;
`;



interface PersonalDetailsInputProps {
    label: string;
    htmlFor: string;
    pageNumber: number;
    rows?: number;
    value: string | number | null | undefined;
    onChange: (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
// AJS:TODO styling looks bad still and number of lines are not translating into the input
function PersonalDetailsInput({ label, htmlFor, pageNumber, rows, value, onChange }: PersonalDetailsInputProps) {
    const isMultiline = rows > 1;
    
    return (
        <InputContainer>
        <LabelContainer>
            <Label htmlFor={htmlFor} tabIndex={-1}>
            {label}
            </Label>
            <PageNumberTooltip pageNumber={pageNumber} />
        </LabelContainer>
        {isMultiline ? (
            <TextInput
                id={htmlFor}
                name={htmlFor}
                value={value}
                multiline
                rows={rows}
                onChange={onChange}
                fullWidth
            />
        ) : (
            <TextInput
                id={htmlFor}
                name={htmlFor}
                value={value}
                onChange={onChange}
                fullWidth
            />
        )}
        </InputContainer>
    );
};

export default PersonalDetailsInput;