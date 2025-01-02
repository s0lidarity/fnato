import styled from 'styled-components';
import { Section } from './CharacterSheet.styles';

export const PersonalDataGrid = styled.div.attrs<any>({
    'data-testid': 'personal-data-grid',
    'data-component': 'Summary/PersonalDataGrid'
})`
    display: grid;
    grid-template-columns: 1fr;
`;

export const PersonalDataSection = styled(Section).attrs<any>({
    'data-testid': 'personal-data-section',
    'data-component': 'Summary/PersonalDataSection'
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    margin-bottom: 0;
    padding: 0;
    border: 0.0625rem solid black;
    border-bottom: none;

    > ${PersonalDataGrid} {
        padding: 0.125rem;
    }
`;

export const FormRow = styled.div.attrs<any>({
    'data-component': 'Summary/FormRow',
    'data-testid': 'form-row',
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-bottom: 0.125rem;
`;

export const FormField = styled.div.attrs<any>({
    'data-component': 'Summary/FormField',
    'data-testid': 'form-field',
})`
    display: grid;
    grid-template-rows: auto 1.25rem;
    gap: 0.125rem;
    
    label {
        font-size: 0.7rem;
        margin-top: 0.25rem;
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

export const SingleFieldRow = styled(FormRow)`
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
    'data-component': 'Summary/TextArea',
    'data-testid': 'text-area',
})`
    width: 100%;
    min-height: 5rem;
    padding: 0.25rem;
    border: 0.0625rem solid black;
    resize: vertical;
`;

export const MMDTextArea = styled(TextArea).attrs<any>({
    'data-component': 'Summary/MMDTextArea',
    'data-testid': 'mmd-text-area',
})`
    width: calc(100% - 0.75rem);
    min-height: 3rem;
    border: 0.0625rem solid black;
    resize: vertical;
`;
