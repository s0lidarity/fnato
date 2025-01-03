import styled from 'styled-components';

export const CharacterSheet = styled.div.attrs<any>({
    'data-component': 'Summary/CharacterSheet',
    'data-testid': 'character-sheet',
})`
    border: 0.125rem solid black;
    color: black;
    background: white;
    padding: 0.3125rem;
    width: 210mm;
    height: 296mm;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
    page-break-inside: avoid;
    page-break-after: avoid;
    page-break-before: avoid;
    display: flex;
    flex-direction: column;

    @media print {
        margin: 0;
        padding: 0.3125rem;
        width: 210mm;
        height: 296mm;
        box-sizing: border-box;
        overflow: hidden;
        page-break-inside: avoid;
        page-break-after: avoid;
        page-break-before: avoid;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
`;

export const Section = styled.div.attrs<any>({
    'data-component': 'Summary/Section',
    'data-testid': 'section',
})`
    border: 0.0625rem solid black;
`;

export const Grid = styled.div.attrs<any>({
    'data-component': 'Summary/Grid',
    'data-testid': 'grid',
})`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
`;

export const VerticalHeader = styled.div.attrs<any>({
    'data-testid': 'vertical-header',
    'data-component': 'Summary/VerticalHeader'
})`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-align: end;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    color: white;
    padding: 0;
    font-size: 0.8rem;
    height: 100%;
    min-height: 0;
    margin-right: 0.25rem;

    @media print {
        writing-mode: vertical-lr;
    }
`;
