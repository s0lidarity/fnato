import styled from 'styled-components';
import { Tooltip } from 'react95';
import { Trans } from '@lingui/react/macro';
import { h } from 'preact';


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
    display: inline;
`;

interface PageNumberTooltipProps {
    pageNumber: number;
}

function PageNumberTooltip({ pageNumber }: PageNumberTooltipProps) {
    return (
        <StyledLabel>
            <Tooltip
                // jsx in the text param works fine, error seems wrong
                // @ts-ignore
                text={
                    <StyledTooltipInnerText>
                        <Trans>Found on page {pageNumber}</Trans>
                    </StyledTooltipInnerText>
                }
                enterDelay={100}
                leaveDelay={500}
            >
                <sup>{pageNumber}</sup>
            </Tooltip>
        </StyledLabel>
    );
}

export default PageNumberTooltip; 