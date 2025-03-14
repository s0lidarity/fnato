import html2pdf from 'html2pdf.js';
import styled from 'styled-components';
import { IoMdPrint } from "react-icons/io";
import { useEffect } from 'preact/hooks';
import { t } from '@lingui/core/macro';
import { i18n } from '@lingui/core';
import { Button } from 'react95';

import { useStats } from '../../providers/StatisticsContext';
import { useSkills } from '../../providers/SkillsContext';
import { useBonds } from '../../providers/BondsContext';
import { usePersonalDetails } from '../../providers/PersonalDetailsContext';
import { generateSkillLabel } from '../TheCrucible/Profession/components/skillLabel';


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
        margin: 0;
        padding: 0.3125rem;
        width: 210mm;
        height: 296mm;
        box-sizing: border-box;
        overflow: hidden;
        page-break-inside: avoid;
        page-break-after: avoid;
        page-break-before: avoid;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-bottom: 0.125rem;
`;

const FormField = styled.div.attrs<any>({
    'data-component': 'Summary/FormField',
    'data-testid': 'form-field',
})`
    display: grid;
    grid-template-rows: auto 1.25rem;
    gap: 0.125rem;
    
    label {
        font-size: 0.7rem;
        margin-top: 0.25rem;
        text-transform: uppercase;
        white-space: nowrap;
    }

    input {
        height: 1.25rem;
        padding: 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
    }
`;

const SingleFieldRow = styled(FormRow)`
    grid-template-columns: 1fr;
    
    ${FormField} {
        grid-template-rows: auto 1fr;
        
        textarea {
            height: 1.25rem;
            width: calc(100% - 0.375rem);
            padding: 0.125rem;
            border: 0.0625rem solid black;
            font-size: 0.8rem;
            align-self: start;
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
    gap: 0.375rem;
    align-items: center;
    font-size: 0.8rem;
    
    label {
        text-transform: uppercase;
        font-size: 0.8em;
        white-space: nowrap;
    }

    input {
        height: 1.25rem;
        padding: 0 0.125rem;
        font-size: 0.8rem;
        background: black;
        border: 0.0625rem solid black;
        text-align: center;
        color: white;
    }

    input[type="number"] {
        width: 2.5rem;
    }

    input[type="text"].multiplier {
        width: 1.5rem;
    }
`;

const SkillsSection = styled(Section).attrs<any>({
    'data-testid': 'skills-section',
    'data-component': 'Summary/SkillsSection'
})`
    display: grid;
    width: 100%;
    grid-template-columns: 2rem 1fr;
    gap: 0;
    margin: 0;
    padding: 0;
    border: 0.0625rem solid black;
    border-top: none;

    > div {
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    ${VerticalHeader} {
        height: 100%;
        width: 1.25rem;
        margin: 0;
        padding: 0;
    }
`;

const SkillsGrid = styled.div.attrs<any>({
    'data-component': 'Summary/SkillsGrid',
    'data-testid': 'skills-grid',
})`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: ${props => `repeat(${Math.ceil(props.$skillCount / 3)}, auto)`};
    grid-template-columns: repeat(3, 1fr);
    gap: 0.125rem;
    font-size: 0.8rem;
`;

const SkillsLabel = styled.label.attrs<any>({
    'data-component': 'Summary/SkillsLabel',
    'data-testid': 'skills-label',
})`
    font-size: 0.7rem;
    margin-top: 0.25rem;
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

    label {
        font-size: 0.7rem;
        margin: 0.25rem;
        padding: 0.25rem;
        text-wrap: pretty;
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
    border-top: none;
`;

const BondsSection = styled.div.attrs<any>({
    'data-testid': 'bonds-section',
    'data-component': 'Summary/BondsSection'
})`
    margin: 0.125rem 0;

    label {
        font-size: 0.7rem;
        margin-bottom: 0.25rem;
    }
`;

const BondRow = styled.div.attrs<any>({
    'data-testid': 'bond-row',
    'data-component': 'Summary/BondRow'
})`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.25rem;
    align-items: center;
    margin-bottom: 0.25rem;

    input[type="checkbox"] {
        width: 0.8rem;
        height: 0.8rem;
        margin: 0;
    }

    input[type="text"],
    input[type="number"] {
        height: 1.25rem;
        padding: 0 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
        box-sizing: border-box;
    }

    input[type="text"] {
        width: 100%;
        margin-right: 0.375rem;
    }

    input[type="number"] {
        width: 2.5rem;
        margin-right: 0.375rem;
        text-align: center;
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
    color: white;
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
    padding-top: 0.375rem;
    margin-top: 0.375rem;
`;

const DerivedStatRow = styled.div.attrs<any>({
    'data-testid': 'derived-stat-row',
    'data-component': 'Summary/DerivedStatRow'
})`
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr;
    gap: 0.25rem;
    align-content: top;
    align-items: center;
    margin-bottom: 0.125rem;
    
    label {
        text-transform: uppercase;
        font-size: 0.8rem;
        white-space: nowrap;
        padding-right: 0.25rem;
    }

    input {
        width: 2.5rem;
        height: 1.25rem;
        padding: 0.125rem;
        border: 0.0625rem solid black;
        font-size: 0.8rem;
        text-align: center;
        color: white;
    }
`;

const MMDTextArea = styled(TextArea).attrs<any>({
    'data-component': 'Summary/MMDTextArea',
    'data-testid': 'mmd-text-area',
})`
    width: calc(100% - 0.75rem);
    min-height: 3rem;
    border: 0.0625rem solid black;
    resize: vertical;
    height: fit-content;
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

export const ButtonsContainer = styled.div.attrs<any>({
    'data-component': 'Summary/ButtonsContainer',
    'data-testid': 'buttons-container',
})`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
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
    const { stats, resetStats, derivedAttributes } = useStats();
    const { skills, BonusSkillPackage, profession, resetProfession, calculateSkillValue, resetSkills } = useSkills();
    const { bonds, resetBonds } = useBonds();
    const { personalDetails, resetPersonalDetails } = usePersonalDetails();

    const handleExport = () => {
        const docName = `${personalDetails?.lastName || ''}-${personalDetails.firstName || ''}-${profession?.name || ''}.pdf`
        const pdf = document.querySelector('[data-testid="character-sheet"]');
        const opt = {
            filename: docName.length > 2 ? docName : 'character-sheet.pdf',
            margin: 0,
            image: { type: 'jpeg' },
            html2canvas: { 
                scale: 2,
                useCORS: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4',
                orientation: 'portrait'
            }
        };

        html2pdf().set(opt).from(pdf).save();
    }

    const handleReset = () => {
        resetStats();
        resetSkills();
        resetProfession();
        resetPersonalDetails();
        resetBonds();
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

    let nameDisplay = personalDetails.lastName;
    if (personalDetails.firstName) {
        nameDisplay += `, ${personalDetails.firstName}`;
        if (personalDetails.middleInitial) {
            nameDisplay += `, ${personalDetails.middleInitial}`;
        }
    }

    let professionDisplay = profession?.name;
    if(BonusSkillPackage?.name){
        professionDisplay = `${profession?.name} (${BonusSkillPackage?.name})`;
    }
    
    return (
        <div>
            <CharacterSheet>
                <PersonalDataSection>
                    <VerticalHeader>
                        <VerticalHeaderText>{t`Personal Data`}</VerticalHeaderText>
                    </VerticalHeader>
                    <PersonalDataGrid>
                        <FormRow>
                            <FormField>
                                <label>{t`1. Last Name, First Name, Middle Initial`}</label>
                                <input type="text" value={nameDisplay} />
                            </FormField>
                            <FormField>
                                <label>{t`2. Profession (Rank if Applicable)`}</label>
                                <input type="text" value={professionDisplay || ''} />
                            </FormField>
                        </FormRow>
                        <FormRow>
                            <FormField>
                                <label>{t`3. Employer`}</label>
                                <input type="text" value={personalDetails.employer} />
                            </FormField>
                            <FormField>
                                <label>{t`4. Nationality`}</label>
                                <input type="text" value={personalDetails.nationality} />
                            </FormField>
                        </FormRow>
                        <FormRow>
                            <FormField>
                                <label>{t`5. Sex`}</label>
                                <input type="text" value={personalDetails.sex} />
                            </FormField>
                            <FormField>
                                <label>{t`6. Age and D.O.B.`}</label>
                                <input type="text" value={personalDetails.dateOfBirth ? personalDetails.dateOfBirth.toLocaleDateString() : ''} />
                            </FormField>
                        </FormRow>
                        <SingleFieldRow>
                            <FormField>
                                <label>{t`7. Education and Occupational History`}</label>
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
                            <VerticalHeaderText>{t`Statistical Data`}</VerticalHeaderText>
                        </VerticalHeader>
                        <StatsGrid>
                            <StatsHeaderRow>
                                <span>{t`8. Statistics`}</span>
                                <span>{t`Score`}</span>
                                <span>{t`x5`}</span>
                                <StatHeaderLongSpan>{t`Distinguishing Features`}</StatHeaderLongSpan>
                            </StatsHeaderRow>
                            {Object.entries(stats).map(([stat, value]) => (
                                <StatRow key={stat}>
                                    <label>{i18n._(stats[stat].labelMsg)}</label>
                                    <input type="number" value={value.score} />
                                    <input type="text" className="multiplier" value={value.x5} />
                                    <input type="text" className="feature" value={value.distinguishingFeature} />
                                </StatRow>
                            ))}

                            <DerivedStatsSection>
                                <DerivedStatRow>
                                    <label>{t`9. Derived Attributes`}</label>
                                    {/* // AJS todo, ffs put this in tye styled component */}
                                    <label style={{ fontSize: '0.8em' }}>{t`Current`}</label>
                                    <label style={{ fontSize: '0.8em' }}>{t`Max`}</label>
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>{t`Hit Points`}</label>
                                    <input type="number" value={derivedAttributes?.hitPoints?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.hitPoints?.maxValue || 0} />
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>{t`Willpower`}</label>
                                    <input type="number" value={derivedAttributes?.willPower?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.willPower?.maxValue || 0} />
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>{t`Sanity`}</label>
                                    <input type="number" value={derivedAttributes?.sanity?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.sanity?.maxValue || 0} />
                                </DerivedStatRow>
                                <DerivedStatRow>
                                    <label>{t`Breaking Point`}</label>
                                    <input type="number" value={derivedAttributes?.breakingPoint?.currentValue || 0} />
                                    <input type="number" value={derivedAttributes?.breakingPoint?.maxValue || 0} />
                                </DerivedStatRow>
                            </DerivedStatsSection>
                            <PhysicalDescriptionSection>
                                <label>{t`10. Physical Description`}</label>
                                <MMDTextArea 
                                    value={personalDetails.appearance || ""}
                                    rows={3}
                                />
                            </PhysicalDescriptionSection>
                        </StatsGrid>
                    </StatisticalDataSection>

                    <PsychSection>
                        <VerticalHeader>
                            <VerticalHeaderText>{t`Psychological Data`}</VerticalHeaderText>
                        </VerticalHeader>
                        <div>
                            <BondsSection>
                                <BondsHeaderRow>
                                    <span>{t`11. Bonds`}</span>
                                    <span>{t`Score`}</span>
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
                                            placeholder={t`Bond description`}
                                        />
                                        <input 
                                            type="number" 
                                            value={bond.score}
                                            aria-label={`Bond ${index + 1} score`}
                                        />
                                    </BondRow>
                                    // AJS starting point, add reminder text about purpose of checbox
                                ))}
                                <label>
                                    {t`Check a Bond's box when projecting sanity damage`}
                                </label>
                            </BondsSection>
                            <h3>{t`12. Motivations and Mental Disorders`}</h3>
                            <MMDTextArea 
                                placeholder={t`List character motivations and any mental disorders...`}
                                value={`${personalDetails.motivations}\n${personalDetails.personalMotivations.join(', ')}`}
                            />
                            <SanityTracker>
                                <h3>{t`13. Incidents of San Loss Without Going Insane`}</h3>
                                <div className="incidents">
                                    <span>{t`Violence`}</span>
                                    <div className="checkboxes">
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                    </div>
                                    <span className="adapted">{t`adapted`}</span>
                                    
                                    <span>{t`Helplessness`}</span>
                                    <div className="checkboxes">
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                    </div>
                                    <span className="adapted">{t`adapted`}</span>
                                </div>
                            </SanityTracker>
                        </div>
                    </PsychSection>
                </DataSectionsContainer>

                <DataSectionsContainer>
                    <SkillsSection>
                        <VerticalHeader>
                            <VerticalHeaderText>{t`Applicable Skill Sets`}</VerticalHeaderText>
                        </VerticalHeader>
                        <div>
                            <SkillsGrid $skillCount={skills.length}>
                                {skills.map((skill) => (
                                    <SkillItem key={`${skill.id}-${skill.name}-${skill.subType}`}>
                                        <input type="checkbox" checked={false} />
                                        <span>{generateSkillLabel(skill)} ({calculateSkillValue(skill.id)}%)</span>
                                    </SkillItem>
                                ))}
                            </SkillsGrid>
                            <SkillsLabel>
                                {t`Check a skill when you fail a skill check. After a session, add 1d4 to each checked skill and erase the check.`}
                            </SkillsLabel>
                        </div>
                    </SkillsSection>
                </DataSectionsContainer>
            </CharacterSheet>
            <ButtonsContainer>
                <ExportButton 
                    onClick={handleExport}>
                        {t`Export as PDF`} <IoMdPrint />
                </ExportButton>
                <Button onClick={handleReset}>{t`Reset everything`}</Button>
            </ButtonsContainer>
        </div>
    );
}

export default Summary;