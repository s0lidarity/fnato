import { Table, TableBody, TableDataCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { Trans } from '@lingui/react/macro';

import { useStats } from '../../../../../providers/StatisticsContext';

const StyledTableTitle = styled.h2.attrs<any>({
    'data-component': 'DerivedAttributes/StyledTableTitle',
    'data-testid': 'styled-table-title',
})`
    text-align: center;
`;

const StyledWindow = styled(Window).attrs<any>({
    'data-component': 'DerivedAttributes/StyledWindow',
    'data-testid': 'styled-window',
})`
    width: 90%;
    margin-right: 2rem;
`;

const DerivedAttributes = () => {
    const { derivedAttributes } = useStats();

    const renderedDAs = Object.keys(derivedAttributes).map((key) => {
        return (
            <TableRow>
                {/* AJS TODO: add a label to this object and use it instead of the key */}
                <TableDataCell>{key}</TableDataCell>
                <TableDataCell>{derivedAttributes[key].maxValue}</TableDataCell>
            </TableRow>
        )
    });

    return (
        <StyledWindow>
            <WindowHeader>
                <StyledTableTitle><Trans>Derived Attributes</Trans></StyledTableTitle>
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