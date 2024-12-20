import { PageWrapper } from '../../components/SharedStyles';
import { useStats } from '../../providers/StatisticsContext';
import { useSkills } from '../../providers/SkillsContext';
import { useBonds } from '../../providers/BondsContext';
import { usePersonalDetails } from '../../providers/PersonalDetailsContext';
import styled from 'styled-components';

const CharacterSheet = styled.div`
    max-width: 800px;
    border: 2px solid black;
    padding: 20px;
    background: white;
`;

const Header = styled.h1`
    text-align: center;
    font-size: 2em;
    margin: 0 0 20px 0;
    text-transform: uppercase;
`;

const Section = styled.div`
    margin-bottom: 20px;
    border: 1px solid black;
    padding: 10px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`;

const PersonalDataGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;

const FormRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`;

const FormField = styled.div`
    flex: 1;
    
    label {
        display: block;
        font-size: 0.8em;
        text-transform: uppercase;
        margin-bottom: 4px;
    }

    input {
        width: 100%;
        padding: 4px;
        border: 1px solid black;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const StatRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 10px;
    align-items: center;
    
    label {
        text-transform: uppercase;
        font-size: 0.9em;
    }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
`;

const SkillItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    
    input[type="checkbox"] {
        width: 16px;
        height: 16px;
    }
`;

export function Summary() {
    const { stats } = useStats();
    const { skills } = useSkills();
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
                            <input type="text" value={personalDetails.profession} />
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