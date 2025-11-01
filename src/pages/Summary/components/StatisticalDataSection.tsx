import { 
    StatisticalDataSection as StyledStatisticalDataSection,
    StatsGrid,
    StatRow,
    DerivedStatsSection,
    DerivedStatRow,
    StatsHeaderRow,
    StatHeaderLongSpan,
    PhysicalDescriptionSection
} from '../styles/StatisticalData.styles';
import { VerticalHeader } from '../styles/CharacterSheet.styles';
import { MMDTextArea } from '../styles/PersonalData.styles';
import { DerivedAttributes, DetailedDescription, Statistics } from '../../../types/characterTypes';
import { useStats } from '../../../providers/StatisticsContext';
import { Trans } from '@lingui/react';

interface StatisticalDataSectionProps {
    stats: Statistics;
    derivedAttributes: DerivedAttributes;
    personalDetails: DetailedDescription;
}


// AJS: TODO translations
export const StatisticalDataSection = ({ 
    stats, 
    derivedAttributes,
    personalDetails 
}: StatisticalDataSectionProps) => {
    const { getEffectiveStatValue} = useStats();
    return (
        <StyledStatisticalDataSection>
            <VerticalHeader>Statistical Data</VerticalHeader>
            <StatsGrid>
                <StatsHeaderRow>
                    <span>8. Statistics</span>
                    <span>Score</span>
                    <span>x5</span>
                    <StatHeaderLongSpan>Distinguishing Features</StatHeaderLongSpan>
                </StatsHeaderRow>
                {Object.entries(stats).map(([stat, value]) => (
                    <StatRow key={stat}>
                        <label>{stat}</label>
                        <input type="number" value={value.score} readOnly />
                        <input type="text" className="multiplier" value={value.x5} readOnly />
                        <input type="text" className="feature" value={value.distinguishingFeature} />
                    </StatRow>
                ))}

                {/* AJS: TODO stats need to include the damaged veteran adjustment */}
                {/* AJS refactor, make this a function that we can test separately */}
                <DerivedStatsSection>
                    <DerivedStatRow>
                        <label>9. Derived Attributes</label>
                        <label style={{ fontSize: '0.8em' }}>Current</label>
                        <label style={{ fontSize: '0.8em' }}>Max</label>
                    </DerivedStatRow>
                    {Object.entries(derivedAttributes).map(([derivedAttribute, value]) => (
                        <DerivedStatRow key={derivedAttribute}>
                            <label>{value.labelMsg ? <Trans id={value.labelMsg.id} /> : ''}</label>
                            <input type="number" value={getEffectiveStatValue(derivedAttribute) || 0} readOnly />
                            {/* // need a next breaking point instead of max */}
                            <input type="number" value={derivedAttributes[derivedAttribute as keyof DerivedAttributes]?.maxValue || 0} readOnly />
                        </DerivedStatRow>
                    ))}
                </DerivedStatsSection>
                <PhysicalDescriptionSection>
                    <label>10. Physical Description</label>
                    <MMDTextArea 
                        value={personalDetails.appearance || ""}
                        rows={3}
                        readOnly
                    />
                </PhysicalDescriptionSection>
            </StatsGrid>
        </StyledStatisticalDataSection>
    );
};

export default StatisticalDataSection;
