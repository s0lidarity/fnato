import styled from 'styled-components';
import { Tooltip } from 'react95';

const SuperscriptNumber = styled.sup.attrs<any>({
    'data-testid': 'page-number-tooltip-superscript-number',
    'data-component': 'PageNumberTooltip/SuperscriptNumber',
})`
    margin-left: 0.2rem;
    font-size: 0.7em;
    color: ${({ theme }) => theme.materialText};
    cursor: help;
    vertical-align: super;
`;

const StyledTooltipInnerText = styled.span.attrs<any>({
    'data-testid': 'page-number-tooltip-inner-text',
    'data-component': 'PageNumberTooltip/StyledTooltipInnerText',
})`
    padding: 0.5rem;
    color: ${({ theme }) => theme.materialDark};
`;

const StyledLabel = styled.span.attrs<any>({
    'data-testid': 'page-number-tooltip-label',
    'data-component': 'PageNumberTooltip/StyledLabel',
})`
    display: flex;
    align-items: center;
`;

interface PageNumberTooltipProps {
    pageNumber: number;
    children: React.ReactNode;
}

function PageNumberTooltip({ pageNumber, children }: PageNumberTooltipProps) {
    return (
        <StyledLabel>
            {children}
            <Tooltip
                // jsx in the text param works fine, error seems wrong
                // @ts-ignore
                text={
                    <StyledTooltipInnerText>
                        Found on page {pageNumber}
                    </StyledTooltipInnerText>
                }
                enterDelay={100}
                leaveDelay={500}
            >
                <SuperscriptNumber>{pageNumber}</SuperscriptNumber>
            </Tooltip>
        </StyledLabel>
    );
}

export default PageNumberTooltip; 