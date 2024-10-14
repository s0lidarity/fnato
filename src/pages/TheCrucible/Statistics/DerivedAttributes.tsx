import { h } from 'preact';
import { Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { useStats } from '../../../providers/StatisticsContext';

const StyledTableTitle = styled.h2`
    text-align: center;
`;

const DerivedAttributes = () => {
    const { derivedAttributes } = useStats();

    const renderedDAs = Object.keys(derivedAttributes).map((key) => {
        return (
            <TableRow>
                <TableDataCell>{key}</TableDataCell>
                <TableDataCell>{derivedAttributes[key].maxValue}</TableDataCell>
            </TableRow>
        )
    });

    return (
        <Window>
            <WindowHeader>
                <StyledTableTitle>Derived Attributes</StyledTableTitle>
            </WindowHeader>
            <WindowContent>
                <Table>
                    <TableBody>
                        {renderedDAs}
                    </TableBody>
                </Table>
            </WindowContent>
        </Window>
    );

};


export default DerivedAttributes;