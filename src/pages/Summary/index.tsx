import { PageWrapper } from '../../components/SharedStyles';
import { useStats } from '../../providers/StatisticsContext';
import { useSkills } from '../../providers/SkillsContext';
import { useBonds } from '../../providers/BondsContext';
import { usePersonalDetails } from '../../providers/PersonalDetailsContext';
import styled from 'styled-components';

const CharacterSheet = styled.div`
    max-width: 50rem;
    border: 0.125rem solid black;
    padding: 1.25rem;
    background: white;
`;

const Header = styled.h1`
    text-align: center;
    font-size: 2em;
    margin: 0 0 1.25rem 0;
    text-transform: uppercase;
`;

const Section = styled.div`
    margin-bottom: 1.25rem;
    border: 0.0625rem solid black;
    padding: 0.625rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
`;

const PersonalDataGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
`;

const FormRow = styled.div`
    display: flex;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
`;

const FormField = styled.div`
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

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
`;

const StatRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0.625rem;
    align-items: center;
    
    label {
        text-transform: uppercase;
        font-size: 0.9em;
    }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
    margin-top: 1.25rem;
`;

const SkillItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
    }
`;

const PsychSection = styled(Section)`
    h3 {
        font-size: 0.9em;
        text-transform: uppercase;
        margin-bottom: 0.625rem;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 5rem;
    padding: 0.25rem;
    border: 0.0625rem solid black;
    resize: vertical;
`;

const SanityTracker = styled.div`
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

export function Summary() {
    const { stats } = useStats();
    const { skills, profession } = useSkills();
    const { bonds } = useBonds();
    const { personalDetails } = usePersonalDetails();

    return (
        <PageWrapper>
            <CharacterSheet>
                <Header>Delta Green</Header>
                
                <Section>
                    <h2>Personal Data</h2>
                    <PersonalDataGrid>
                        <FormField>
                            <label>Last Name, First Name, Middle Initial</label>
                            <input type="text" value={personalDetails.name} />
                        </FormField>
                        <FormField>
                            <label>Profession (Rank if Applicable)</label>
                            <input type="text" value={profession.name} />
                        </FormField>
                        <FormField>
                            <label>Employer</label>
                            <input type="text" value={personalDetails.employer} />
                        </FormField>
                        <FormField>
                            <label>Nationality</label>
                            <input type="text" value={personalDetails.nationality} />
                        </FormField>
                    </PersonalDataGrid>
                    <FormRow>
                        <FormField>
                            <label>Sex</label>
                            <input type="text" value={personalDetails.sex} />
                        </FormField>
                        <FormField>
                            <label>Age and D.O.B.</label>
                            <input type="text" value={personalDetails.age} />
                        </FormField>
                    </FormRow>
                </Section>

                <Section>
                    <h2>Statistics</h2>
                    <StatsGrid>
                        {Object.entries(stats).map(([stat, value]) => (
                            <StatRow key={stat}>
                                <label>{stat}</label>
                                <input type="number" value={value.score} />
                                <input type="text" value={value.multiplier} placeholder="×5" />
                            </StatRow>
                        ))}
                    </StatsGrid>
                </Section>

                <Section>
                    <h2>Bonds</h2>
                    {bonds.map((bond, index) => (
                        <FormRow key={index}>
                            <FormField>
                                <input type="checkbox" checked={bond.damaged} />
                                <input type="text" value={bond.description} />
                                <input type="number" value={bond.score} />
                            </FormField>
                        </FormRow>
                    ))}
                </Section>

                <PsychSection>
                    <h2>Psychological Data</h2>
                    
                    <div>
                        <h3>Motivations and Mental Disorders</h3>
                        <TextArea 
                            placeholder="List character motivations and any mental disorders..."
                            value={personalDetails.mentalDisorders}
                        />
                    </div>

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
                </PsychSection>

                <SkillsGrid>
                    {Object.entries(skills).map(([skill, value]) => (
                        <SkillItem key={skill}>
                            <input type="checkbox" checked={value.failed} />
                            <span>{skill} ({value.base}%)</span>
                        </SkillItem>
                    ))}
                </SkillsGrid>
            </CharacterSheet>
        </PageWrapper>
    );
}

export default Summary;