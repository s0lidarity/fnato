import { h } from 'preact';
import { Tooltip } from 'react95';
import styled from 'styled-components';

import { STAT_REMINDERS } from '../../../../../types/characterTypes';

// AJS this is a shared style, put it somewhere we can share it
const StyledTooltipInnerText = styled.span`
    padding: 0.5rem;
    color: ${({ theme }) => theme.materialDark};
`;

const StyledLabel = styled.label`
    margin-left: 0.5rem;
`;

interface StatTooltipProps {
    statKey: string;
    labelText: string;
}

export function StatTooltip({ statKey, labelText }: StatTooltipProps) {
    return (
        <Tooltip
            // jsx in the text param works fine, error seems wrong
            // @ts-ignore
            text={
                <StyledTooltipInnerText>
                    {STAT_REMINDERS[statKey]}
                </StyledTooltipInnerText>
            }
            enterDelay={100}
            leaveDelay={500}
        >
            <StyledLabel>{labelText}</StyledLabel>
        </Tooltip>
    );
};

export default StatTooltip;