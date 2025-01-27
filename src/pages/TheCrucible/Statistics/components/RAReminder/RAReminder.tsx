import { Table, TableBody, TableDataCell, TableRow } from 'react95';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

import { RECOMMENDED_ARRAYS, RecommendedArray } from '../../../../../utils/CharacterGenerator';
import Guidance from '../../../../../components/Guidance/Guidance';

function RAReminder() {
    const renderTableRow = (ra: RecommendedArray) => {
        return (
            <TableRow>
                <TableDataCell><Trans>{ra.label}</Trans></TableDataCell>
                <TableDataCell><Trans>{ra.stats.join(', ')}</Trans></TableDataCell>
            </TableRow>
        )
    }

    return (
        <Guidance title={t`Statistics Details`} buttonText={t`Statistics Details`}>
            <Table>
                <TableBody>
                    {RECOMMENDED_ARRAYS.map(renderTableRow)}
                </TableBody>
            </Table>
        </Guidance>
    );
}

export default RAReminder;