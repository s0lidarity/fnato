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
    labelText: MessageDescriptor | string;
    reminderText: MessageDescriptor | string;
}

export function ReminderTooltip({ labelText, reminderText }: ReminderTooltipProps) {
    const isMessageDescriptor = (value: MessageDescriptor | string): value is MessageDescriptor => {
        return typeof value === 'object' && 'id' in value;
    };

    return (
        <Tooltip
            //@ts-ignore seems to work fine
            text={
                <StyledTooltipInnerText>
                    {isMessageDescriptor(reminderText) ? (
                        <Trans id={reminderText.id} />
                    ) : (
                        reminderText
                    )}
                </StyledTooltipInnerText>
            }
            enterDelay={100}
            leaveDelay={500}
        >
            <StyledLabel>
                {isMessageDescriptor(labelText) ? (
                    <Trans id={labelText.id} />
                ) : (
                    labelText
                )}
                <TooltipIndicator />
            </StyledLabel>
        </Tooltip>
    );
}

export default ReminderTooltip;