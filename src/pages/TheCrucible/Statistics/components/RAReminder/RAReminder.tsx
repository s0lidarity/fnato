import { Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { RECOMMENDED_ARRAYS, RecommendedArray } from '../../../../../utils/CharacterGenerator';

const StyledTableTitle = styled.h2`
    text-align: center;
`;

function RAReminder() {

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
        <Window>
            <WindowHeader>
                <StyledTableTitle>Recommended Stat Arrays</StyledTableTitle>
            </WindowHeader>
            <WindowContent>
                {renderRecommendedArraysTable()}
            </WindowContent>
        </Window>
    )
}

export default RAReminder;