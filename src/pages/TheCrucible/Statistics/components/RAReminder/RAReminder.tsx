import { useState } from 'preact/hooks';
import { Button, Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { FaRegWindowMinimize } from "react-icons/fa";
import { FaWindowMaximize } from "react-icons/fa6";


import { RECOMMENDED_ARRAYS, RecommendedArray } from '../../../../../utils/CharacterGenerator';

const StyledTableTitle = styled.h2`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const StyledWindowHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 0.5rem;
`;

const StyledWindow = styled(Window)`
    width: 100%;
`;

const StyledGuidanceButton = styled(Button)`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
`;

const StyledButtonText = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const StyledMinButton = styled(Button)`
    display: flex;
    margin-top: 0.25rem;
    margin-right: 1px;
    align-items: center;
    align-self: center;
`;

const StyledMaximizeIcon = styled(FaWindowMaximize)`
    color: ${({ theme }) => theme.canvasTextInvert};
`;


function RAReminder() {
    const [reminderIsOpen, setReminderIsOpen] = useState(false);

    const renderTableRow = (ra: RecommendedArray) => {
        return (
            <TableRow>
                <TableDataCell>{ra.label}</TableDataCell>
                <TableDataCell>{ra.stats.join(', ')}</TableDataCell>
            </TableRow>
        )
    }

    const renderRecommendedArraysTable = () => {
        return (
            <Table>
                <TableBody>
                    {RECOMMENDED_ARRAYS.map(renderTableRow)}
                </TableBody>
            </Table>
        )
    }

    return (
        <>
            {!reminderIsOpen ? (
                <StyledGuidanceButton onClick={() => setReminderIsOpen(true)}>
                    <StyledButtonText>Guidance</StyledButtonText>
                    <StyledMaximizeIcon />
                </StyledGuidanceButton>
            ) :
            (
                <StyledWindow>
                    <WindowHeader>
                        <StyledWindowHeader>
                            <StyledTableTitle>Stat Guide</StyledTableTitle>
                            <StyledMinButton onClick={() => setReminderIsOpen(false)}><FaRegWindowMinimize /></StyledMinButton>
                        </StyledWindowHeader>
                    </WindowHeader>
                    <WindowContent>
                        {renderRecommendedArraysTable()}
                    </WindowContent>
                </StyledWindow>
            )}
        </>
    )
}

export default RAReminder;