import styled from 'styled-components';
import { i18n } from '@lingui/core';
import { t } from '@lingui/core/macro';
import { h } from 'preact';

const StyledLabel = styled.span.attrs<any>({
    'data-testid': 'page-number-tooltip-label',
    'data-component': 'PageNumberTooltip/StyledLabel',
})`
    display: inline;
    margin-left: auto;
    display: inline-flex;
`;

const StyledPageBadge = styled.sup.attrs<any>({
    'data-testid': 'page-badge',
    'data-component': 'PageNumberTooltip/StyledPageBadge',
    tabIndex: -1,
    role: 'note',
    'aria-hidden': 'true',
})`
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    font-size: 0.85em;
    color: ${({ theme }) => theme.materialDark};
    opacity: 0.8;
`;

interface PageNumberTooltipProps {
    pageNumber: number;
}

function PageNumberTooltip({ pageNumber }: PageNumberTooltipProps) {
    return (
        <StyledLabel>
            <StyledPageBadge
                title={i18n._(t`Found on page ${pageNumber}`)}
            >
                [p. {pageNumber}]
            </StyledPageBadge>
        </StyledLabel>
    );
}

export default PageNumberTooltip; 