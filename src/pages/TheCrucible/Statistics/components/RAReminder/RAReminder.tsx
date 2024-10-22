import { useState } from 'preact/hooks';
import { Button, Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { FaRegWindowMinimize } from "react-icons/fa";
import { FaWindowMaximize } from "react-icons/fa6";


import { RECOMMENDED_ARRAYS, RecommendedArray } from '../../../../../utils/CharacterGenerator';

const StyledTableTitle = styled.h2`
    text-align: center;
`;

const StyledWindowHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
`;

const StyledWindow = styled(Window)`
    margin-top: 1rem;
    width: 100%;
`;

const StyledGuidanceButton = styled(Button)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
`;

const StyledButton = styled(Button)`
    margin-left: 0.5rem;
`;

const StyledMaximizeIcon = styled(FaWindowMaximize)`
    color: ${({ theme }) => theme.canvasTextInvert};
    padding: 0.25rem;
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
                <StyledGuidanceButton onClick={() => setReminderIsOpen(true)}>Guidance <StyledMaximizeIcon /></StyledGuidanceButton>
            ) :
            (
                <StyledWindow>
                    <WindowHeader>
                        <StyledWindowHeader>
                            <StyledTableTitle>Stat Guide</StyledTableTitle>
                            <StyledButton onClick={() => setReminderIsOpen(false)}><FaRegWindowMinimize /></StyledButton>
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