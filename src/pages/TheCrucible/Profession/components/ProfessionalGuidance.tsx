import { Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { DEFAULT_MAX_SKILL_VALUE, DEFAULT_TOTAL_CAP } from '../../../../constants/gameRules';
import Guidance from '../../../../components/Guidance/Guidance';

const GuidanceContainer = styled.div.attrs<any>({
    'data-testid': 'profession-professional-guidance-container',
    'data-component': 'Profession/ProfessionalGuidanceContainer',
})`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

const SkillCapTextContainer = styled.div`
    width: inherit%;
    margin: 0.5rem;
    padding: 0.5rem;
    text-wrap: balance;
    text-align: center;
`;

function ProfessionalGuidance() {
    const tableContent = [
        {
            rating: '01% to 19%',
            description: 'Dabbler.'
        },
        {
            rating: '20% to 29%',
            description: 'A dedicated hobbyist; with a foreign language you can have rudimentary conversations.'
        },
        {
            rating: '30% to 39%',
            description: 'College minor or basic training.'
        },
        {
            rating: '40% to 59%',
            description: 'College major or years of experience; with 50% in a foreign language you have native fluency.'
        },
        {
            rating: '60% to 79%',
            description: 'Decades of experience, or a graduate or doctoral degree.'
        },
        {
            rating: '80% to 99%',
            description: 'A lifetime’s pursuit or multiple doctorates.'
        }
    ];

    const renderTableRow = (row: { rating: string, description: string }) => {
        return (
            <TableRow>
                <TableDataCell>{row.rating}</TableDataCell>
                <TableDataCell>{row.description}</TableDataCell>
            </TableRow>
        )
    }

    const skillCapText = 
    `Skills can reach ${DEFAULT_MAX_SKILL_VALUE}% with point allocation, and hit 
    ${DEFAULT_TOTAL_CAP}% with bonus points. If your bonus points would exceed 
    ${DEFAULT_TOTAL_CAP}%, the skill will cap at ${DEFAULT_TOTAL_CAP}% and any 
    excess points will be lost. Skill values can improve beyond ${DEFAULT_TOTAL_CAP}%
    with experience gained during gameplay.`;


    return (
        <GuidanceContainer>
            <Guidance title="Profession Details" buttonText="Profession Details">
                <Window>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Skill Rating</TableHeadCell>
                            <TableHeadCell>Description</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent.map(renderTableRow)}
                    </TableBody>
                </Table>
                <SkillCapTextContainer>
                    {skillCapText}
                </SkillCapTextContainer>
                </Window>
            </Guidance>
        </GuidanceContainer>
    )
};

export default ProfessionalGuidance;