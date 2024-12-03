import { Table, TableBody, TableDataCell, TableRow } from 'react95';
import { RECOMMENDED_ARRAYS, RecommendedArray } from '../../../../../utils/CharacterGenerator';
import Guidance from '../../../../../components/Guidance/Guidance';

function RAReminder() {
    const renderTableRow = (ra: RecommendedArray) => {
        return (
            <TableRow>
                <TableDataCell>{ra.label}</TableDataCell>
                <TableDataCell>{ra.stats.join(', ')}</TableDataCell>
            </TableRow>
        )
    }

    return (
        <Guidance title="Stat Guide" buttonText="Guidance">
            <Table>
                <TableBody>
                    {RECOMMENDED_ARRAYS.map(renderTableRow)}
                </TableBody>
            </Table>
        </Guidance>
    );
}

export default RAReminder;