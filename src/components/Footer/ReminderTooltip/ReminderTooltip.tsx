import { Tooltip } from 'react95';
import styled from 'styled-components';

import TooltipIndicator from '../../TooltipIndicator/TooltipIndicator';

// AJS this is a shared style, put it somewhere we can share it
const StyledTooltipInnerText = styled.span`
    padding: 0.5rem;
    color: ${({ theme }) => theme.materialDark};
`;

const StyledLabel = styled.label`
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
`;

interface ReminderTooltipProps {
    labelText: string;
    reminderText: string;
}

export function ReminderTooltip({ labelText, reminderText }: ReminderTooltipProps) {
    return (
        <Tooltip
            // jsx in the text param works fine, error seems wrong
            // @ts-ignore
            text={
                <StyledTooltipInnerText>
                    {reminderText}
                </StyledTooltipInnerText>
            }
            enterDelay={100}
            leaveDelay={500}
        >
            <StyledLabel>{labelText}<TooltipIndicator /></StyledLabel>
        </Tooltip>
    );
};

export default ReminderTooltip;