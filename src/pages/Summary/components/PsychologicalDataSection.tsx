import { 
    PsychSection,
    BondsSection,
    BondRow,
    BondsHeaderRow,
    SanityTracker
} from '../styles/PsychologicalData.styles';
import { VerticalHeader } from '../styles/CharacterSheet.styles';
import { MMDTextArea } from '../styles/PersonalData.styles';
import { Bond } from '../../../types/characterTypes';

interface PsychologicalDataSectionProps {
    bonds: Bond[];
}

export const PsychologicalDataSection = ({ bonds }: PsychologicalDataSectionProps) => {
    return (
        <PsychSection>
            <VerticalHeader>Psychological Data</VerticalHeader>
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
                                readOnly
                                aria-label={`Bond ${index + 1} damaged status`}
                            />
                            <input 
                                type="text" 
                                value={bond.name}
                                readOnly
                                placeholder="Bond description"
                            />
                            <input 
                                type="number" 
                                value={bond.score}
                                readOnly
                                aria-label={`Bond ${index + 1} score`}
                            />
                        </BondRow>
                    ))}
                    <label>
                        Check a Bond's box when projecting sanity damage
                    </label>
                </BondsSection>
                <h3>12. Motivations and Mental Disorders</h3>
                <MMDTextArea 
                    placeholder="List character motivations and any mental disorders..."
                    value={""}
                    readOnly
                />
                <SanityTracker>
                    <h3>13. Incidents of San Loss Without Going Insane</h3>
                    <div className="incidents">
                        <span>Violence</span>
                        <div className="checkboxes">
                            <input type="checkbox" readOnly />
                            <input type="checkbox" readOnly />
                            <input type="checkbox" readOnly />
                        </div>
                        <span className="adapted">adapted</span>
                        
                        <span>Helplessness</span>
                        <div className="checkboxes">
                            <input type="checkbox" readOnly />
                            <input type="checkbox" readOnly />
                            <input type="checkbox" readOnly />
                        </div>
                        <span className="adapted">adapted</span>
                    </div>
                </SanityTracker>
            </div>
        </PsychSection>
    );
};

export default PsychologicalDataSection;
