import { CharacterSheet as StyledCharacterSheet } from '../styles/CharacterSheet.styles';
import { DataSectionsContainer } from '../styles/Skills.styles';
import { SkillsSection } from './SkillsSection';
import { useStats } from '../../../providers/StatisticsContext';
import { useSkills } from '../../../providers/SkillsContext';
import { useBonds } from '../../../providers/BondsContext';
import { usePersonalDetails } from '../../../providers/PersonalDetailsContext';
import { PersonalDataSection } from './PersonalDataSection';
import { StatisticalDataSection } from './StatisticalDataSection';
import { PsychologicalDataSection } from './PsychologicalDataSection';

export const CharacterSheet = () => {
    const { stats, derivedAttributes } = useStats();
    const { skills, BonusSkillPackage, profession, calculateSkillValue } = useSkills();
    const { bonds } = useBonds();
    const { personalDetails } = usePersonalDetails();

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
        <StyledCharacterSheet>
            <PersonalDataSection 
                nameDisplay={nameDisplay}
                professionDisplay={professionDisplay}
                personalDetails={personalDetails}
            />
            <DataSectionsContainer>
                <StatisticalDataSection 
                    stats={stats}
                    derivedAttributes={derivedAttributes}
                    personalDetails={personalDetails}
                />
                <PsychologicalDataSection bonds={bonds} personalDetails={personalDetails} />
            </DataSectionsContainer>
            <DataSectionsContainer>
                <SkillsSection 
                    skills={skills}
                    calculateSkillValue={calculateSkillValue}
                />
            </DataSectionsContainer>
        </StyledCharacterSheet>
    );
};

export default CharacterSheet;
