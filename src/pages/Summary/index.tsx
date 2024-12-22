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
    
    label {
        display: block;
        font-size: 0.8em;
        text-transform: uppercase;
        margin-bottom: 0.25rem;
    }

    input {
        width: 100%;
        padding: 0.25rem;
        border: 0.0625rem solid black;
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
    gap: 0.5rem;
    
    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
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
    margin-top: 1.25rem;
    
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

export function Summary() {
    const { stats } = useStats();
    const { skills, profession } = useSkills();
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
                                <input type="text" value={`${personalDetails.lastName}, ${personalDetails.firstName} ${personalDetails.middleInitial}`} />
                            </FormField>
                            <FormField>
                                <label>2. Profession (Rank if Applicable)</label>
                                <input type="text" value={personalDetails.profession} />
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
                        <FormField>
                            <label>7. Education and Occupational History</label>
                            <TextArea 
                                value={personalDetails.education}
                                rows={3}
                            />
                        </FormField>
                    </PersonalDataGrid>
                </PersonalDataSection>

                <DataSectionsContainer>
                    <StatisticalDataSection>
                        <VerticalHeader>Statistical Data</VerticalHeader>
                        <StatsGrid>
                            {Object.entries(stats).map(([stat, value]) => (
                                <StatRow key={stat}>
                                    <label>{stat}</label>
                                    <input type="number" value={value.score} />
                                    <input 
                                        type="text" 
                                        className="multiplier"
                                        value={value.multiplier} 
                                        placeholder="×5" 
                                    />
                                    <input 
                                        type="text" 
                                        className="feature"
                                        value={value.distinguishingFeature || ''}
                                        placeholder="Distinguishing Feature"
                                    />
                                </StatRow>
                            ))}
                        </StatsGrid>
                    </StatisticalDataSection>

                    <PsychSection>
                        <VerticalHeader>Psychological Data</VerticalHeader>
                        <div>
                            <h3>Motivations and Mental Disorders</h3>
                            <TextArea 
                                placeholder="List character motivations and any mental disorders..."
                                value={personalDetails.mentalDisorders}
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

                <Section>
                    <h2>Bonds</h2>
                    {bonds.map((bond, index) => (
                        <FormRow key={index}>
                            <FormField>
                                <input type="checkbox" checked={false} />
                                <input type="text" value={bond?.name} />
                                <input type="number" value={bond?.score} />
                            </FormField>
                        </FormRow>
                    ))}
                </Section>

                <SkillsGrid>
                    {Object.entries(skills).map(([skill, value]) => (
                        <SkillItem key={skill}>
                            <input type="checkbox" checked={false} />
                            <span>{skill} ({value.base}%)</span>
                        </SkillItem>
                    ))}
                </SkillsGrid>
            </CharacterSheet>
        </PageWrapper>
    );
}

export default Summary;