import { h } from 'preact';
import { Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { useStats } from '../../../../../providers/StatisticsContext';

const StyledTableTitle = styled.h2`
    text-align: center;
`;

const StyledWindow = styled(Window)`
    width: 90%;
    margin-right: 2rem;
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
        <StyledWindow>
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
        </StyledWindow>
    );

};


export default DerivedAttributes;