import styled from 'styled-components';
import { Section } from './CharacterSheet.styles';

export const PersonalDataGrid = styled.div.attrs<any>({
    'data-component': 'Summary/PersonalDataGrid',
    'data-testid': 'personal-data-grid',
})`
    display: grid;
    grid-template-columns: 1fr;
`;

export const PersonalDataSection = styled(Section).attrs<any>({
    'data-component': 'Summary/PersonalDataSection',
    'data-testid': 'personal-data-section',
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    margin-bottom: 0;
    border: 0.0625rem solid black;
    padding: 0;
    margin: 0;

    > ${PersonalDataGrid} {
        padding: 0.125rem;
    }
`;

export const FormRow = styled.div.attrs<any>({
    'data-component': 'Summary/PersonalDataSection/FormRow',
    'data-testid': 'form-row',
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-bottom: 0.125rem;
`;

export const FormField = styled.div.attrs<any>({
    'data-component': 'Summary/PersonalDataSection/FormField',
    'data-testid': 'form-field',
})`
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    
    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        white-space: nowrap;
    }

    input {
        height: 1.25rem;
        padding: 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
    }
`;

export const SingleFieldRow = styled(FormRow).attrs<any>({
    'data-component': 'Summary/PersonalDataSection/SingleFieldRow',
    'data-testid': 'single-field-row',
})`
    grid-template-columns: 1fr;

    ${FormField} {
        grid-template-rows: auto 1fr;
    
        textarea {
            height: 1.25rem;
            width: calc(100% - 0.375rem);
            padding: 0.125rem;
            border: 0.0625rem solid black;
            font-size: 0.8rem;
            align-self: start;
        }
    }
`;

export const TextArea = styled.textarea.attrs<any>({
    'data-component': 'Summary/PersonalDataSection/TextArea',
    'data-testid': 'text-area',
})`
    width: 100%;
    min-height: 5rem;
    padding: 0.25rem;
    border: 0.0625rem solid black;
    resize: vertical;
    background: white;
    color: black;
`;

export const MMDTextArea = styled(TextArea).attrs<any>({
    'data-component': 'Summary/PersonalDataSection/MMDTextArea',
    'data-testid': 'mmd-text-area',
})`
    width: calc(100% - 0.75rem);
    min-height: 3rem;
    border: 0.0625rem solid black;
    resize: vertical;
    height: fit-content;
`;
