import { Tooltip } from 'react95';
import styled from 'styled-components';
import { Trans } from '@lingui/react';
import { MessageDescriptor } from '@lingui/core';

import TooltipIndicator from '../../TooltipIndicator/TooltipIndicator';
// AJS TODO: move this folder out of Footer

// AJS this is a shared style, put it somewhere we can share it
// AJS need to verify styling across themes
const StyledTooltipInnerText = styled.span.attrs<any>({
    'data-testid': 'reminder-tooltip-inner-text',
    'data-component': 'ReminderTooltip/StyledTooltipInnerText',
})`
    padding: 0.5rem;
    color: ${({ theme }) => theme.materialDark};
`;

const StyledLabel = styled.label.attrs<any>({
    'data-testid': 'reminder-tooltip-label',
    'data-component': 'ReminderTooltip/StyledLabel',
})`
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    cursor: help;
`;

interface ReminderTooltipProps {
    labelText: MessageDescriptor;
    reminderText: MessageDescriptor;
}

export function ReminderTooltip({ labelText, reminderText }: ReminderTooltipProps) {

    console.log("ReminderTooltip labelText:", labelText);
    console.log("ReminderTooltip reminderText:", reminderText);

    return (
        <Tooltip
            text={
                <StyledTooltipInnerText>
                    <Trans id={reminderText.id} />
                </StyledTooltipInnerText>
            }
            enterDelay={100}
            leaveDelay={500}
        >
            <StyledLabel>
                <Trans id={labelText.id} values={ labelText.values } />
                <TooltipIndicator />
            </StyledLabel>
        </Tooltip>
    );
};

export default ReminderTooltip;