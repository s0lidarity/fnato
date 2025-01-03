import styled from 'styled-components';
import { Section } from './CharacterSheet.styles';

export const StatisticalDataSection = styled(Section).attrs<any>({
    'data-testid': 'statistical-data-section',
    'data-component': 'Summary/StatisticalDataSection'
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    width: 50%;
    border: 0.0625rem solid black;
    border-bottom: none;
    padding: 0;
    margin: 0;
`;

export const StatsGrid = styled.div.attrs<any>({
    'data-component': 'Summary/StatsGrid',
    'data-testid': 'stats-grid'
})`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.125rem;
    margin: 0.125rem;
`;

export const StatRow = styled.div.attrs<any>({
    'data-testid': 'stat-row',
    'data-component': 'Summary/StatRow'
})`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 3fr;
    gap: 0.375rem;
    align-items: center;
    font-size: 0.8rem;
    
    label {
        text-transform: uppercase;
        font-size: 0.8em;
        white-space: nowrap;
    }

    input {
        height: 1.25rem;
        padding: 0 0.125rem;
        font-size: 0.8rem;
        background: black;
        border: 0.0625rem solid black;
        text-align: center;
    }

    input[type="number"] {
        width: 2.5rem;
    }

    input[type="text"].multiplier {
        width: 1.5rem;
    }
`;

export const DerivedStatsSection = styled.div.attrs<any>({
    'data-testid': 'derived-stats-section',
    'data-component': 'Summary/DerivedStatsSection'
})`
    border-top: 0.0625rem solid black;
    padding-top: 0.375rem;
    margin-top: 0.375rem;
`;

export const DerivedStatRow = styled.div.attrs<any>({
    'data-testid': 'derived-stat-row',
    'data-component': 'Summary/DerivedStatRow'
})`
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr;
    gap: 0.25rem;
    align-content: top;
    align-items: center;
    margin-bottom: 0.125rem;
    
    label {
        text-transform: uppercase;
        font-size: 0.8rem;
        white-space: nowrap;
        padding-right: 0.25rem;
    }

    input {
        width: 2.5rem;
        height: 1.25rem;
        padding: 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
        text-align: center;
    }
`;

export const HeaderRow = styled.div.attrs<any>({
    'data-testid': 'header-row',
    'data-component': 'Summary/HeaderRow'
})`
    display: grid;
    font-size: 0.8em;
    text-transform: uppercase;
    margin-bottom: 0.125rem;
`;

export const StatsHeaderRow = styled(HeaderRow)`
    grid-template-columns: 2fr 1fr 1fr 2fr;
    gap: 0.625rem;
    padding-right: 0.25rem;
    align-items: center;
`;

export const StatHeaderLongSpan = styled.span.attrs<any>({
    'data-component': 'Summary/StatHeaderLongSpan',
    'data-testid': 'stat-header-long-span'
})`
    font-size: 0.7rem;
    white-space: nowrap;
`;

export const PhysicalDescriptionSection = styled.div.attrs<any>({
    'data-testid': 'physical-description-section',
    'data-component': 'Summary/PhysicalDescriptionSection'
})`
    margin-top: 0.25rem;
    border-top: 0.0625rem solid black;
`;
