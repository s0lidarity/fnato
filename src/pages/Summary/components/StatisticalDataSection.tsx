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
import { DerivedAttributes, DetailedDescription, Stat } from '../../../types/characterTypes';

interface StatisticalDataSectionProps {
    stats: Stat[];
    derivedAttributes: DerivedAttributes;
    personalDetails: DetailedDescription;
}

export const StatisticalDataSection = ({ 
    stats, 
    derivedAttributes,
    personalDetails 
}: StatisticalDataSectionProps) => {
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

                <DerivedStatsSection>
                    <DerivedStatRow>
                        <label>9. Derived Attributes</label>
                        <label style={{ fontSize: '0.8em' }}>Current</label>
                        <label style={{ fontSize: '0.8em' }}>Max</label>
                    </DerivedStatRow>
                    <DerivedStatRow>
                        <label>Hit Points</label>
                        <input type="number" value={derivedAttributes?.hitPoints?.currentValue || 0} readOnly />
                        <input type="number" value={derivedAttributes?.hitPoints?.maxValue || 0} readOnly />
                    </DerivedStatRow>
                    <DerivedStatRow>
                        <label>Willpower</label>
                        <input type="number" value={derivedAttributes?.willPower?.currentValue || 0} readOnly />
                        <input type="number" value={derivedAttributes?.willPower?.maxValue || 0} readOnly />
                    </DerivedStatRow>
                    <DerivedStatRow>
                        <label>Sanity</label>
                        <input type="number" value={derivedAttributes?.sanity?.currentValue || 0} readOnly />
                        <input type="number" value={derivedAttributes?.sanity?.maxValue || 0} readOnly />
                    </DerivedStatRow>
                    <DerivedStatRow>
                        <label>Breaking Point</label>
                        <input type="number" value={derivedAttributes?.breakingPoint?.currentValue || 0} readOnly />
                        <input type="number" value={derivedAttributes?.breakingPoint?.maxValue || 0} readOnly />
                    </DerivedStatRow>
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
