import html2pdf from 'html2pdf.js';
import styled from 'styled-components';
import { IoMdPrint } from "react-icons/io";

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
    padding: 1.25rem;
    background: white;
    width: 210mm; /* A4 width */
    height: 297mm; /* A4 height */
    margin: 0 auto; /* Center the sheet */
    box-sizing: border-box;

    @media print {
        width: 210mm;
        height: 297mm;
        box-sizing: border-box;
        padding: 10mm;
        overflow: hidden;
    }
`;

const CensoredHeader = styled.div.attrs<any>({
    'data-testid': 'censored-header',
    'data-component': 'Summary/CensoredHeader'
})`
    height: 2.5rem;
    background: black;
    margin: 0 0 1.25rem 0;
    width: 20rem;
    justify-self: center;
`;

const Section = styled.div.attrs<any>({
    'data-component': 'Summary/Section',
    'data-testid': 'section',
})`
    margin-bottom: 1.25rem;
    border: 0.0625rem solid black;
    padding: 0.625rem;
`;

const Grid = styled.div.attrs<any>({
    'data-component': 'Summary/Grid',
    'data-testid': 'grid',
})`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
`;

const PersonalDataSection = styled(Section).attrs<any>({
    'data-testid': 'personal-data-section',
    'data-component': 'Summary/PersonalDataSection'
})`
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
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
    padding: 0.25rem 0;
    font-size: 0.8rem;

    @media print {
        writing-mode: vertical-lr;
    }
`;

const PersonalDataGrid = styled.div.attrs<any>({
    'data-testid': 'personal-data-grid',
    'data-component': 'Summary/PersonalDataGrid'
})`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.625rem;
`;

const FormRow = styled.div.attrs<any>({
    'data-component': 'Summary/FormRow',
    'data-testid': 'form-row',
})`
    display: flex;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
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
    padding-left: 0;
    
    > ${FormField} {
        padding-right: 0;

        textarea {
            width: calc(100% - 1.25rem);
        }
    }
`;

const StatsGrid = styled.div.attrs<any>({
    'data-component': 'Summary/StatsGrid',
    'data-testid': 'stats-grid'
})`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.625rem;
    padding: 0.625rem;
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
    gap: 0.5rem;
    margin-top: 0.75rem;
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
    gap: 0.5rem;
    width: 55%;
    border: 0.0625rem solid black;
    padding: 0;
    margin: 0;

    > div {
        padding: 0.5rem;
    }

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
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
`;

const TextArea = styled.textarea.attrs<any>({
    'data-component': 'Summary/TextArea',
    'data-testid': 'text-area',
})`
    width: calc(100% - 1.25rem);
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
    gap: 0.5rem;
    width: 45%;
    border: 0.0625rem solid black;
    padding: 0;
    margin: 0;
`;

const DataSectionsContainer = styled.div.attrs<any>({
    'data-testid': 'data-sections-container',
    'data-component': 'Summary/DataSectionsContainer'
})`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    width: 100%;
`;

const BondsSection = styled.div.attrs<any>({
    'data-testid': 'bonds-section',
    'data-component': 'Summary/BondsSection'
})`
    margin: 1.25rem 0;
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
    margin-bottom: 0.5rem;
`;

const StatsHeaderRow = styled(HeaderRow)`
    grid-template-columns: 2fr 1fr 1fr 3fr;
    gap: 0.625rem;
    padding-right: 0.25rem;
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
    margin-top: 1.25rem;
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
    
    margin-bottom: 0.25rem;
    
    label {
        text-transform: uppercase;
        font-size: 0.9em;
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
    min-height: 5rem;
    padding: 0.25rem;
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
            margin: 10,
            filename: 'character-sheet.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4',
                orientation: 'portrait'
            }
        };

        html2pdf().set(opt).from(pdf).save();
    }

    return (
        <PageWrapper>
            <CharacterSheet>
                <CensoredHeader />
                
                <PersonalDataSection>
                    <VerticalHeader>
                        <VerticalHeaderText>Statistical Data</VerticalHeaderText>
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
                                <span>Attribute</span>
                                <span>Score</span>
                                <span>x5</span>
                                {/* AJS start here, make this header smaller */}
                                <span>Distinguishing Features</span>
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
                                    <span></span>
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
                        </StatsGrid>
                    </StatisticalDataSection>

                    <PsychSection>
                        <VerticalHeader>
                            <VerticalHeaderText>Psychological Data</VerticalHeaderText>
                        </VerticalHeader>
                        <div>
                            <BondsSection>
                                <BondsHeaderRow>
                                    <span>Bonds</span>
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
                            <h3>Motivations and Mental Disorders</h3>
                            <MMDTextArea 
                                placeholder="List character motivations and any mental disorders..."
                                value={""}
                            />
                            <SanityTracker>
                                <h3>Incidents of San Loss Without Going Insane</h3>
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