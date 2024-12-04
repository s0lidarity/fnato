import styled from 'styled-components';

import Guidance from '../../../../components/Guidance/Guidance';
import { useStats } from '../../../../providers/StatisticsContext';

function BondGuidance() {
    const { stats } = useStats();
    return (
        <Guidance title="Bond Guidance" buttonText="Bond Guidance">
            <p>
                {`Bonds represent your Agent's relationships with other people.
                Each bond starts with a score equal to your Agent's Charisma (${stats.charisma.score}).
                A Bond increases if it is cultivated between operations. A Bond can never have a score higher than your Agent's Charisma.
                Any time your Agent's Charisma drops, each Bond drops by the same amount.
                Bonds can be defined as a single person or a group of people.
                For example, a Bond could be defined as "My Wife" or "The Platoon".
                A Bond must be a real person or small group of people who are alive and can be interacted with.
                `}
                <ul>
                    <li>Spouse or ex-spouse (individual)</li>
                    <li>Coworker or partner (individual)</li>
                    <li>Colleagues in an intense job (group)</li>
                    <li>Church or support group (group)</li>
                </ul>
            </p>
        </Guidance>
    )
}

export default BondGuidance;