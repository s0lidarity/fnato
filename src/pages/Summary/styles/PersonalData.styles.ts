import styled from 'styled-components';
import { Section } from './CharacterSheet.styles';

export const PersonalDataSection = styled(Section)`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    width: 100%;
    border: 0.0625rem solid black;
    padding: 0;
    margin: 0;
`;

export const PersonalDataGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
`;

export const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
`;

export const FormField = styled.div`
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

export const SingleFieldRow = styled(FormRow)`
    grid-template-columns: 1fr;
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
