import styled from 'styled-components';
import { Section, VerticalHeader } from './CharacterSheet.styles';

export const SkillsSection = styled(Section).attrs<any>({
    'data-testid': 'skills-section',
    'data-component': 'Summary/SkillsSection'
})`
    display: grid;
    width: 100%;
    grid-template-columns: 2rem 1fr;
    gap: 0;
    margin: 0;
    padding: 0;
    border: 0.0625rem solid black;
    border-top: none;

    > div {
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    ${VerticalHeader} {
        height: 100%;
        width: 1.25rem;
        margin: 0;
        padding: 0;
    }
`;

export const SkillsGrid = styled.div.attrs<any>({
    'data-component': 'Summary/SkillsGrid',
    'data-testid': 'skills-grid',
})`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: ${props => `repeat(${Math.ceil(props.skillCount / 3)}, auto)`};
    grid-template-columns: repeat(3, 1fr);
    gap: 0.125rem;
    font-size: 0.8rem;
`;

export const SkillsLabel = styled.label.attrs<any>({
    'data-component': 'Summary/SkillsLabel',
    'data-testid': 'skills-label',
})`
    font-size: 0.7rem;
    margin-top: 0.25rem;
`;

export const SkillItem = styled.div.attrs<any>({
    'data-component': 'Summary/SkillItem',
    'data-testid': 'skill-item',
})`
    display: flex;
    align-items: center;
    border: 0.0625rem solid black;
    gap: 0.375rem;
    padding: 0.125rem;
    
    input[type="checkbox"] {
        width: 0.8rem;
        height: 0.8rem;
    }

    span {
        font-size: 0.8rem;
    }

    label {
        font-size: 0.7rem;
        margin: 0.25rem;
        padding: 0.25rem;
        text-wrap: pretty;
    }
`;

export const DataSectionsContainer = styled.div.attrs<any>({
    'data-testid': 'data-sections-container',
    'data-component': 'Summary/DataSectionsContainer'
})`
    display: flex;
    width: 100%;
    border-bottom: 0.0625rem solid black;
    border-top: none;
`;
