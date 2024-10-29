import { Tooltip } from 'react95';
import styled from 'styled-components';

// AJS this is a shared style, put it somewhere we can share it
const StyledTooltipInnerText = styled.span`
    padding: 0.5rem;
    color: ${({ theme }) => theme.materialDark};
`;

const StyledLabel = styled.label`
    margin-left: 0.5rem;
`;

interface ReminderTooltipProps {
    itemKey: string;
    labelText: string;
    reminders: { [key: string]: string };
}

export function ReminderTooltip({ itemKey, labelText, reminders }: ReminderTooltipProps) {
    return (
        <Tooltip
            // jsx in the text param works fine, error seems wrong
            // @ts-ignore
            text={
                <StyledTooltipInnerText>
                    {reminders[itemKey]}
                </StyledTooltipInnerText>
            }
            enterDelay={100}
            leaveDelay={500}
        >
            <StyledLabel>{labelText}</StyledLabel>
        </Tooltip>
    );
};

export default ReminderTooltip;