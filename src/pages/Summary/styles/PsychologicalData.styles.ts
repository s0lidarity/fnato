import styled from 'styled-components';
import { Section } from './CharacterSheet.styles';

export const PsychSection = styled(Section).attrs<any>({
    'data-component': 'Summary/PsychSection',
    'data-testid': 'psych-section',
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    width: 50%;
    border: 0.0625rem solid black;
    border-bottom: none;
    padding: 0;
    margin: 0;

    h3 {
        font-size: 0.7rem;
        text-transform: uppercase;
        margin-bottom: 0.375rem;
    }
`;

export const BondsSection = styled.div.attrs<any>({
    'data-testid': 'bonds-section',
    'data-component': 'Summary/BondsSection'
})`
    margin: 0.125rem 0;

    label {
        font-size: 0.7rem;
        margin-bottom: 0.25rem;
    }
`;

export const BondRow = styled.div.attrs<any>({
    'data-testid': 'bond-row',
    'data-component': 'Summary/BondRow'
})`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.25rem;
    align-items: center;
    margin-bottom: 0.25rem;

    input[type="checkbox"] {
        width: 0.8rem;
        height: 0.8rem;
        margin: 0;
    }

    input[type="text"],
    input[type="number"] {
        height: 1.25rem;
        padding: 0 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
        box-sizing: border-box;
    }

    input[type="text"] {
        width: 100%;
        margin-right: 0.375rem;
    }

    input[type="number"] {
        width: 2.5rem;
        margin-right: 0.375rem;
        text-align: center;
    }
`;

export const BondsHeaderRow = styled.div.attrs<any>({
    'data-testid': 'header-row',
    'data-component': 'Summary/HeaderRow'
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.8em;
    text-transform: uppercase;
    
    span:last-child {
        margin-right: 0.625rem;
    }
`;

export const SanityTracker = styled.div.attrs<any>({
    'data-component': 'Summary/SanityTracker',
    'data-testid': 'sanity-tracker',
})`
    margin-top: 0.75rem;
    
    h3 {
        margin-bottom: 0.375rem;
        font-size: 0.7rem;
    }
    
    .incidents {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
        font-size: 0.7rem;
    }
    
    .checkboxes {
        display: flex;
        gap: 0.25rem;
        
        input[type="checkbox"] {
            width: 0.7rem;
            height: 0.7rem;
            margin: 0;
        }
    }

    span {
        &.adapted {
            margin-left: 0.25rem;
            margin-right: 0.5rem;
        }
    }
`;
