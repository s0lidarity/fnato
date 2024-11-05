import { Tooltip } from 'react95';
import styled from 'styled-components';

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

const StyledQuestionmark = styled.span`
    display: flex;
    margin-left: 0.25rem;
    font-size: 0.75rem;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.materialDark};
    color: ${({ theme }) => theme.materialLight};
    padding: 0.1rem;
    cursor: help;
`;

interface ReminderTooltipProps {
    itemKey: string;
    labelText: string;
    // AJS rework reminder to look at the value from the skill instead of the hard-look up
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
            <StyledLabel>{labelText}<StyledQuestionmark>?</StyledQuestionmark></StyledLabel>
        </Tooltip>
    );
};

export default ReminderTooltip;