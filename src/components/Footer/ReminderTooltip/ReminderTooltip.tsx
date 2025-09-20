import { Tooltip } from 'react95';
import styled from 'styled-components';
import { i18n, MessageDescriptor } from '@lingui/core';

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

export function ReminderTooltip(props: ReminderTooltipProps) {
    // Extract props with defaults
    const { 
        labelText = "", 
        reminderText = "" 
    } = props;
    
    /**
     * Check if a value is a MessageDescriptor
     * This is a type guard function to help TypeScript understand our types
     */
    const isMessageDescriptor = (value: MessageDescriptor | string): value is MessageDescriptor => {
        return typeof value === 'object' && value !== null && 'id' in value;
    };
    
    /**
     * Process the content - if it's a MessageDescriptor, use i18n to translate it,
     * otherwise return the string content directly
     */
    const getContent = (content: MessageDescriptor | string): string => {
        if (!content) return "";
        
        if (isMessageDescriptor(content)) {
            // It's a MessageDescriptor object, so translate it
            return i18n._(content);
        }
        
        // It's already a string
        return content;
    };

    const labelContent = getContent(labelText);
    const reminderContent = getContent(reminderText);

    return (
        <Tooltip
            //@ts-ignore seems to work fine
            text={<StyledTooltipInnerText>{reminderContent}</StyledTooltipInnerText>}
            enterDelay={100}
            leaveDelay={500}
        >
            <StyledLabel>
                {labelContent}
                <TooltipIndicator />
            </StyledLabel>
        </Tooltip>
    );
}

export default ReminderTooltip;