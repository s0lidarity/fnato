import styled from 'styled-components';
import { Table, TableBody, TableHead, TableRow, TableHeadCell, TableDataCell } from 'react95';

import Guidance from '../../../../components/Guidance/Guidance';
import { useStats } from '../../../../providers/StatisticsContext';

const BondGuidanceContainer = styled.div.attrs<any>({
    'data-testid': 'bond-guidance-container',
    'data-component': 'BondGuidance/BondGuidanceContainer',
})`
    display: flex;
    flex-direction: column;
`;

const BondPrimer = styled.p.attrs<any>({
    'data-testid': 'bond-primer',
    'data-component': 'BondGuidance/BondPrimer',
})`
    margin: 1rem;
`;

// AJS start here, make it pretty
function BondGuidance() {
    const { stats } = useStats();

    const bondExamples = [
        { bondType: 'Individual', example: 'Spouse or ex-spouse' },
        { bondType: 'Individual', example: 'Coworker or partner' },
        { bondType: 'Group', example: 'Colleagues in an intense job' },
        { bondType: 'Group', example: 'Church or support group' },
    ]

    const renderBondExampleRows = (bondExamples: { bondType: string, example: string }[]) => {
        return bondExamples.map((bondExample) => (
            <TableRow>
                <TableDataCell>{bondExample.bondType}</TableDataCell>
                <TableDataCell>{bondExample.example}</TableDataCell>
            </TableRow>
        ))
    }

    return (
        <BondGuidanceContainer>
            <Guidance title="Bonds Details" buttonText="Bonds Details">
                <BondPrimer>
                    {`Bonds represent your Agent's relationships with other people.
                    Each bond starts with a score equal to your Agent's Charisma (${stats.charisma.score}).
                    The score of a bond can improve if it is nurtured between operations. A bond can never have a score higher than your Agent's Charisma.
                    Any time your Agent's Charisma drops, each bond score drops by the same amount.
                    Bonds can be defined as a single person or a group of people. For example, an agent might have bonds with their spouse, their business partner, and their bowling league.
                    A Bond must be a real person or small group of people who are alive and can be interacted with.
                    `}
                </BondPrimer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Bond Type</TableHeadCell>
                            <TableHeadCell>Example</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderBondExampleRows(bondExamples)}
                    </TableBody>
                </Table>
            </Guidance>
        </BondGuidanceContainer>
    )
}

export default BondGuidance;