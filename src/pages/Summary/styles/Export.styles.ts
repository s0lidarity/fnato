import styled from 'styled-components';
import { Button } from 'react95';

export const ExportButton = styled(Button).attrs<any>({
    'data-component': 'Summary/ExportButton',
    'data-testid': 'export-button',
})`
    position: relative;
    margin: 1.25rem;
    padding: 0.75rem 1.5rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        opacity: 0.9;
    }
`;
