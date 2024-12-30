import html2pdf from 'html2pdf.js';
import styled from 'styled-components';
import { IoMdPrint } from "react-icons/io";
import { useEffect } from 'preact/hooks';

import { PageWrapper } from '../../components/SharedStyles';
import { useStats } from '../../providers/StatisticsContext';
import { useSkills } from '../../providers/SkillsContext';
import { useBonds } from '../../providers/BondsContext';
import { usePersonalDetails } from '../../providers/PersonalDetailsContext';
import { Button } from 'react95';


const CharacterSheet = styled.div.attrs<any>({
    'data-component': 'Summary/CharacterSheet',
    'data-testid': 'character-sheet',
})`
    border: 0.125rem solid black;
    background: white;
    padding: 0.3125rem;
    width: 210mm;
    height: 296mm;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
    page-break-inside: avoid;
    page-break-after: avoid;
    page-break-before: avoid;
    display: flex;
    flex-direction: column;

    @media print {
        width: 210mm;
        height: 296mm;
        margin: 0;
        padding: 0.3125rem;
        box-sizing: border-box;
        overflow: hidden;
        page-break-inside: avoid;
        page-break-after: avoid;
        page-break-before: avoid;
    }
`;

const Section = styled.div.attrs<any>({
    'data-component': 'Summary/Section',
    'data-testid': 'section',
})`
    border: 0.0625rem solid black;
`;

const Grid = styled.div.attrs<any>({
    'data-component': 'Summary/Grid',
    'data-testid': 'grid',
})`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
`;

const PersonalDataGrid = styled.div.attrs<any>({
    'data-testid': 'personal-data-grid',
    'data-component': 'Summary/PersonalDataGrid'
})`
    display: grid;
    grid-template-columns: 1fr;
`;

const PersonalDataSection = styled(Section).attrs<any>({
    'data-testid': 'personal-data-section',
    'data-component': 'Summary/PersonalDataSection'
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    margin-bottom: 0;
    padding: 0;
    border: 0.0625rem solid black;
    border-bottom: none;

    > ${PersonalDataGrid} {
        padding: 0.125rem;
    }
`;

// AJS might have to rethink the vertical header
const VerticalHeader = styled.div.attrs<any>({
    'data-testid': 'vertical-header',
    'data-component': 'Summary/VerticalHeader'
})`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-align: end;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    color: white;
    padding: 0;
    font-size: 0.8rem;
    height: 100%;
    min-height: 0;
    margin-right: 0.25rem;

    @media print {
        writing-mode: vertical-lr;
    }
`;

const FormRow = styled.div.attrs<any>({
    'data-component': 'Summary/FormRow',
    'data-testid': 'form-row',
})`
    display: flex;
    gap: 0.625rem;
    margin-bottom: 0.125rem;
`;

const FormField = styled.div.attrs<any>({
    'data-component': 'Summary/FormField',
    'data-testid': 'form-field',
})`
    flex: 1;
    padding: 0 0.5rem;
    
    label {
        display: block;
        font-size: 0.7rem;
        text-transform: uppercase;
        margin-bottom: 0.125rem;
    }

    input {
        width: calc(100% - 0.5rem);
        padding: 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
    }

    textarea {
        width: calc(100% - 0.5rem); 
        padding: 0.125rem;
        border: 0.0625rem solid black;
        min-height: 3rem;
        font-size: 0.8rem;
    }

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;
    }
`;

const SingleFieldRow = styled(FormRow).attrs<any>({
    'data-component': 'Summary/SingleFieldRow',
    'data-testid': 'single-field-row',
})`
    padding: 0;
    
    > ${FormField} {
        padding: 0 0.5rem;

        &:first-child {
            padding-left: 0.0rem;
        }

        &:last-child {
            padding-right: 0.5rem;
        }

        textarea {
            width: 100%;
        }
    }
`;

const StatsGrid = styled.div.attrs<any>({
    'data-component': 'Summary/StatsGrid',
    'data-testid': 'stats-grid'
})`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.125rem;
    margin: 0.125rem;
`;

const StatRow = styled.div.attrs<any>({
    'data-testid': 'stat-row',
    'data-component': 'Summary/StatRow'
})`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 3fr;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.8rem;
    
    label {
        text-transform: uppercase;
        font-size: 0.8em;
    }

    input {
        height: 1.25rem;
        padding: 0 0.125rem;
        font-size: 0.8rem;
        background: black;
        border: 0.0625rem solid black;
    }

    input[type="number"] {
        width: 2.5rem;
    }

    input[type="text"].multiplier {
        width: 1.5rem;
    }
`;

const SkillsGrid = styled.div.attrs<any>({
    'data-component': 'Summary/SkillsGrid',
    'data-testid': 'skills-grid',
})`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: ${props => `repeat(${Math.ceil(props.skillCount / 3)}, auto)`};
    grid-template-columns: repeat(3, 1fr);
    gap: 0.25rem;
    font-size: 0.8rem;
`;

const SkillItem = styled.div.attrs<any>({
    'data-component': 'Summary/SkillItem',
    'data-testid': 'skill-item',
})`
    display: flex;
    align-items: center;
    border: 0.0625rem solid black;
    gap: 0.375rem;
    padding: 0.125rem;
    
    input[type="checkbox"] {
        width: 0.8rem;
        height: 0.8rem;
    }

    span {
        font-size: 0.8rem;
    }
`;

const PsychSection = styled(Section).attrs<any>({
    'data-component': 'Summary/PsychSection',
    'data-testid': 'psych-section',
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    width: 50%;
    border: 0.0625rem solid black;
    border-bottom: none;
    padding: 0;
    margin: 0;

    h3 {
        font-size: 0.7rem;
        text-transform: uppercase;
        margin-bottom: 0.375rem;
    }
`;

const SkillsSection = styled(Section).attrs<any>({
    'data-component': 'Summary/SkillsSection',
    'data-testid': 'skills-section',
})`
    display: grid;
    width: 100%;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    margin-bottom: 0;
    padding: 0;
    border: 0.0625rem solid black;

    > ${SkillsGrid} {
        padding: 0.5rem;
    }
`;

const TextArea = styled.textarea.attrs<any>({
    'data-component': 'Summary/TextArea',
    'data-testid': 'text-area',
})`
    width: 100%;
    min-height: 5rem;
    padding: 0.25rem;
    border: 0.0625rem solid black;
    resize: vertical;
`;

const SanityTracker = styled.div.attrs<any>({
    'data-component': 'Summary/SanityTracker',
    'data-testid': 'sanity-tracker',
})`
    margin-top: 0.75rem;
    
    h3 {
        margin-bottom: 0.375rem;
        font-size: 0.7rem;
    }
    
    .incidents {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
        font-size: 0.7rem;
    }
    
    .checkboxes {
        display: flex;
        gap: 0.25rem;
        
        input[type="checkbox"] {
            width: 0.7rem;
            height: 0.7rem;
            margin: 0;
        }
    }

    span {
        &.adapted {
            margin-left: 0.25rem;
            margin-right: 0.5rem;
        }
    }
`;

const StatisticalDataSection = styled(Section).attrs<any>({
    'data-testid': 'statistical-data-section',
    'data-component': 'Summary/StatisticalDataSection'
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0;
    width: 50%;
    border: 0.0625rem solid black;
    border-bottom: none;
    padding: 0;
    margin: 0;
`;

const PhysicalDescriptionSection = styled.div.attrs<any>({
    'data-testid': 'physical-description-section',
    'data-component': 'Summary/PhysicalDescriptionSection'
})`
    margin-top: 0.25rem;
    border-top: 0.0625rem solid black;
`;

const DataSectionsContainer = styled.div.attrs<any>({
    'data-testid': 'data-sections-container',
    'data-component': 'Summary/DataSectionsContainer'
})`
    display: flex;
    width: 100%;
    border-bottom: 0.0625rem solid black;
    margin-bottom: -0.0625rem;
    margin-top: -0.0625rem;
`;

const BondsSection = styled.div.attrs<any>({
    'data-testid': 'bonds-section',
    'data-component': 'Summary/BondsSection'
})`
    margin: 0.125rem 0;
`;

const BondRow = styled.div.attrs<any>({
    'data-testid': 'bond-row',
    'data-component': 'Summary/BondRow'
})`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.375rem;
    align-items: center;
    margin-bottom: 0.25rem;

    input[type="checkbox"] {
        width: 0.8rem;
        height: 0.8rem;
        margin: 0;
    }

    input[type="text"] {
        width: calc(100% - 0.5rem);
        border: none;
        border-bottom: 0.0625rem solid black;
        padding: 0.125rem;
        font-size: 0.8rem;
    }

    input[type="number"] {
        width: 2.5rem;
        padding: 0.125rem;
        border: 0.0625rem solid black;
        margin-right: 0.375rem;
        font-size: 0.8rem;
    }
`;

const HeaderRow = styled.div.attrs<any>({
    'data-testid': 'header-row',
    'data-component': 'Summary/HeaderRow'
})`
    display: grid;
    font-size: 0.8em;
    text-transform: uppercase;
    margin-bottom: 0.125rem;
`;

const StatsHeaderRow = styled(HeaderRow)`
    grid-template-columns: 2fr 1fr 1fr 2fr;
    gap: 0.625rem;
    padding-right: 0.25rem;
    align-items: center;
`;

const StatHeaderLongSpan = styled.span.attrs<any>({
    'data-component': 'Summary/StatHeaderLongSpan',
    'data-testid': 'stat-header-long-span'
})`
    font-size: 0.7rem;
    white-space: nowrap;
`;

const BondsHeaderRow = styled(HeaderRow)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    
    span:last-child {
        margin-right: 0.625rem;
    }
`;

const DerivedStatsSection = styled.div.attrs<any>({
    'data-testid': 'derived-stats-section',
    'data-component': 'Summary/DerivedStatsSection'
})`
    border-top: 0.0625rem solid black;
    padding-top: 0.625rem;
`;

const DerivedStatRow = styled.div.attrs<any>({
    'data-testid': 'derived-stat-row',
    'data-component': 'Summary/DerivedStatRow'
})`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0.625rem;
    align-items: center;
    
    label {
        text-transform: uppercase;
        font-size: 0.8em;
    }

    input {
        width: 3rem;
        padding: 0.25rem;
        border: 0.0625rem solid black;
    }
`;

const MMDTextArea = styled(TextArea).attrs<any>({
    'data-component': 'Summary/MMDTextArea',
    'data-testid': 'mmd-text-area',
})`
    width: calc(100% - 1.25rem);
    min-height: 3rem;
    border: 0.0625rem solid black;
    resize: vertical;
`;

const ExportButton = styled(Button).attrs<any>({
    'data-component': 'Summary/ExportButton',
    'data-testid': 'export-button',
})`
    position: relative;
    margin: 1.25rem;
    padding: 0.75rem 1.5rem;
    background: black;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        opacity: 0.9;
    }
`;

const VerticalHeaderText = ({ children }: { children: React.ReactNode }) => (
    <svg width="2rem" height="12rem">
        <text 
            x="50%"
            y="50%"
            fill="white" 
            fontSize="0.875rem"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {children}
        </text>
    </svg>
);

export function Summary() {
    const { stats, derivedAttributes } = useStats();
    const { skills, profession, calculateSkillValue } = useSkills();
    const { bonds } = useBonds();
    const { personalDetails } = usePersonalDetails();


    // I have learned that this is a pain
    const handleExport = () => {
        const pdf = document.querySelector('[data-testid="character-sheet"]');
        const opt = {
            filename: 'character-sheet.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
            },
            jsPDF: { 
                unit: 'mm', 
                format: [210, 296],
                orientation: 'portrait',
                compress: true,
                precision: 2,
                margins: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                putOnlyUsedFonts: true,
                floatPrecision: 16
            },
            pagebreak: { mode: 'avoid-all' }
        };

        html2pdf().set(opt).from(pdf).save();
    }

    useEffect(() => {
        const handlePrintCommand = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                handleExport();
            }
        };

        // Add event listener
        window.addEventListener('keydown', handlePrintCommand);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handlePrintCommand);
        };
    }, []); // Empty dependency array since handleExport is stable

    return (
        <PageWrapper>
            <CharacterSheet>
                {/* <CensoredHeader /> */}
                <PersonalDataSection>
                    <VerticalHeader>
                        <VerticalHeaderText>Personal Data</VerticalHeaderText>
                    </VerticalHeader>
                    <PersonalDataGrid>
                        <FormRow>
                            <FormField>
                                <label>1. Last Name, First Name, Middle Initial</label>
                                <input type="text" value={`${personalDetails.lastName || ''} ${personalDetails.firstName || ''} ${personalDetails.middleInitial || ''}`} />
                            </FormField>
                            <FormField>
                                <label>2. Profession (Rank if Applicable)</label>
                                <input type="text" value={profession?.name || ''} />
                            </FormField>
                        </FormRow>
                        <FormRow>
                            <FormField>
                                <label>3. Employer</label>
                                <input type="text" value={personalDetails.employer} />
                            </FormField>
                            <FormField>
                                <label>4. Nationality</label>
                                <input type="text" value={personalDetails.nationality} />
                            </FormField>
                        </FormRow>
                        <FormRow>
                            <FormField>
                                <label>5. Sex</label>
                                <input type="text" value={personalDetails.sex} />
                            </FormField>
                            <FormField>
                                <label>6. Age and D.O.B.</label>
                                <input type="text" value={personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toLocaleDateString() : ''} />
                            </FormField>
                        </FormRow>
                        <SingleFieldRow>
                            <FormField>
                                <label>7. Education and Occupational History</label>
                                <MMDTextArea 
                                    value={personalDetails.education}
                                    rows={3}
                                />
                            </FormField>
                        </SingleFieldRow>
                    </PersonalDataGrid>
                </PersonalDataSection>

                <DataSectionsContainer>
                    <StatisticalDataSection>
                        <VerticalHeader>
                            <VerticalHeaderText>Statistical Data</VerticalHeaderText>
                        </VerticalHeader>
                        <StatsGrid>
                            <StatsHeaderRow>
                                <span>8. Statistics</span>
                                <span>Score</span>
                                <span>x5</span>
                                {/* AJS start here, make this header smaller */}
                                <StatHeaderLongSpan>Distinguishing Features</StatHeaderLongSpan>
                            </StatsHeaderRow>
                            {Object.entries(stats).map(([stat, value]) => (
                                <StatRow key={stat}>
                                    <label>{stat}</label>
                                    <input type="number" value={value.score} />
                                    <input type="text" className="multiplier" value={value.x5} />
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
                                    <input type="number" value={derivedAttributes?.hitPoints?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.hitPoints?.maxValue || 0} />
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>Willpower</label>
                                    <input type="number" value={derivedAttributes?.willPower?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.willPower?.maxValue || 0} />
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>Sanity</label>
                                    <input type="number" value={derivedAttributes?.sanity?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.sanity?.maxValue || 0} />
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>Breaking Point</label>
                                    <input type="number" value={derivedAttributes?.breakingPoint?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.breakingPoint?.maxValue || 0} />
                                </DerivedStatRow>
                            </DerivedStatsSection>
                            <PhysicalDescriptionSection>
                                <label>10. Physical Description</label>
                                <MMDTextArea 
                                    value={""}
                                    rows={3}
                                />
                            </PhysicalDescriptionSection>
                        </StatsGrid>
                    </StatisticalDataSection>

                    <PsychSection>
                        <VerticalHeader>
                            <VerticalHeaderText>Psychological Data</VerticalHeaderText>
                        </VerticalHeader>
                        <div>
                            <BondsSection>
                                <BondsHeaderRow>
                                    <span>11. Bonds</span>
                                    <span>Score</span>
                                </BondsHeaderRow>
                                {bonds.map((bond, index) => (
                                    <BondRow key={index}>
                                        <input 
                                            type="checkbox" 
                                            checked={false}
                                            aria-label={`Bond ${index + 1} damaged status`}
                                        />
                                        <input 
                                            type="text" 
                                            value={bond.name}
                                            placeholder="Bond description"
                                        />
                                        <input 
                                            type="number" 
                                            value={bond.score}
                                            aria-label={`Bond ${index + 1} score`}
                                        />
                                    </BondRow>
                                ))}
                            </BondsSection>
                            <h3>12. Motivations and Mental Disorders</h3>
                            <MMDTextArea 
                                placeholder="List character motivations and any mental disorders..."
                                value={""}
                            />
                            <SanityTracker>
                                <h3>13. Incidents of San Loss Without Going Insane</h3>
                                <div className="incidents">
                                    <span>Violence</span>
                                    <div className="checkboxes">
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                    </div>
                                    <span className="adapted">adapted</span>
                                    
                                    <span>Helplessness</span>
                                    <div className="checkboxes">
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                    </div>
                                    <span className="adapted">adapted</span>
                                </div>
                            </SanityTracker>
                        </div>
                    </PsychSection>
                </DataSectionsContainer>

                <DataSectionsContainer>
                    <SkillsSection>
                        <VerticalHeader>
                            <VerticalHeaderText>Applicable Skill Sets</VerticalHeaderText>
                        </VerticalHeader>
                        <SkillsGrid skillCount={skills.length}>
                            
                            {skills.map((skill) => (
                                <SkillItem key={`${skill.id}-${skill.name}-${skill.subType}`}>
                                    <input type="checkbox" checked={false} />
                                    <span>{`${skill.name}${skill.subType ? ` (${skill.subType})` : ''}`} ({calculateSkillValue(skill.id)}%)</span>
                                </SkillItem>
                            ))}
                        </SkillsGrid>
                        </SkillsSection>
                    </DataSectionsContainer>
                
            </CharacterSheet>
            <ExportButton 
                onClick={handleExport}>
                    Export as PDF <IoMdPrint />
            </ExportButton>
        </PageWrapper>
    );
}

export default Summary;