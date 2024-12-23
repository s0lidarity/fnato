import { PageWrapper } from '../../components/SharedStyles';
import { useStats } from '../../providers/StatisticsContext';
import { useSkills } from '../../providers/SkillsContext';
import { useBonds } from '../../providers/BondsContext';
import { usePersonalDetails } from '../../providers/PersonalDetailsContext';
import styled from 'styled-components';

const CharacterSheet = styled.div.attrs<any>({
    'data-component': 'Summary/CharacterSheet',
    'data-testid': 'character-sheet',
})`
    border: 0.125rem solid black;
    padding: 1.25rem;
    background: white;
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
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
`;

const VerticalHeader = styled.div.attrs<any>({
    'data-testid': 'vertical-header',
    'data-component': 'Summary/VerticalHeader'
})`
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    color: white;
    padding: 0.5rem 0;
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
    padding: 0 0.625rem;
    
    label {
        display: block;
        font-size: 0.8em;
        text-transform: uppercase;
        margin-bottom: 0.25rem;
    }

    input {
        width: calc(100% - 1.25rem);
        padding: 0.25rem;
        border: 0.0625rem solid black;
    }

    textarea {
        width: calc(100% - 1.25rem);
        padding: 0.25rem;
        border: 0.0625rem solid black;
        min-height: 5rem;
        resize: vertical;
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
    gap: 0.625rem;
    align-items: center;
    
    label {
        text-transform: uppercase;
        font-size: 0.9em;
    }

    input {
        height: 1.5rem;
        padding: 0 0.25rem;
    }

    input[type="number"] {
        width: 3rem;
    }

    input[type="text"].multiplier {
        width: 2rem;
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
    gap: 0.625rem;
    margin-top: 1.25rem;
`;

const SkillItem = styled.div.attrs<any>({
    'data-component': 'Summary/SkillItem',
    'data-testid': 'skill-item',
})`
    display: flex;
    align-items: center;
    border: 0.0625rem solid black;
    gap: 0.625rem;
    
    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
    }

    span {
        font-size: 0.9em;
    }
`;

const PsychSection = styled(Section).attrs<any>({
    'data-component': 'Summary/PsychSection',
    'data-testid': 'psych-section',
})`
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
    flex: 1;
    border: 0.0625rem solid black;
    padding: 0;
    margin: 0;

    > div {
        padding: 0.625rem;
    }

    h3 {
        font-size: 0.9em;
        margin-bottom: 0.625rem;
    }
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
    margin-top: 1.25rem;
    margin-right: 1.25rem;
    
    .incidents {
        display: flex;
        gap: 0.625rem;
        align-items: center;
        margin-top: 0.625rem;
    }
    
    .checkboxes {
        display: flex;
        gap: 0.25rem;
    }
`;

const StatisticalDataSection = styled(Section).attrs<any>({
    'data-testid': 'statistical-data-section',
    'data-component': 'Summary/StatisticalDataSection'
})`
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
    width: 50%;
    border: 0.0625rem solid black;
    padding: 0;
    margin: 0;
`;

const DataSectionsContainer = styled.div.attrs<any>({
    'data-testid': 'data-sections-container',
    'data-component': 'Summary/DataSectionsContainer'
})`
    display: flex;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
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
    gap: 0.625rem;
    align-items: center;
    margin-bottom: 0.5rem;

    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
    }

    input[type="text"] {
        width: calc(100% - 1.25rem);
        border: none;
        border-bottom: 0.0625rem solid black;
        padding: 0.25rem;
    }

    input[type="number"] {
        width: 3rem;
        padding: 0.25rem;
        border: 0.0625rem solid black;
        margin-right: 0.625rem;
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

export function Summary() {
    const { stats, derivedAttributes } = useStats();
    const { skills, profession, calculateSkillValue } = useSkills();
    const { bonds } = useBonds();
    const { personalDetails } = usePersonalDetails();

    return (
        <PageWrapper>
            <CharacterSheet>
                <CensoredHeader />
                
                <PersonalDataSection>
                    <VerticalHeader>Personal Data</VerticalHeader>
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
                        <VerticalHeader>Statistical Data</VerticalHeader>
                        <StatsGrid>
                            <StatsHeaderRow>
                                <span>Attribute</span>
                                <span>Score</span>
                                <span>x5</span>
                                <span>Distinguishing Feature</span>
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
                        <VerticalHeader>Psychological Data</VerticalHeader>
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
                                    <span>adapted</span>
                                    
                                    <span style={{ marginLeft: '1.25rem' }}>Helplessness</span>
                                    <div className="checkboxes">
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                        <input type="checkbox" />
                                    </div>
                                    <span>adapted</span>
                                </div>
                            </SanityTracker>
                        </div>
                    </PsychSection>
                </DataSectionsContainer>

                <SkillsGrid skillCount={skills.length}>
                    {skills.map((skill) => (
                        <SkillItem key={skill.id}>
                            <input type="checkbox" checked={false} />
                            <span>{skill.name} ({calculateSkillValue(skill.id)}%)</span>
                        </SkillItem>
                    ))}
                </SkillsGrid>
            </CharacterSheet>
        </PageWrapper>
    );
}

export default Summary;