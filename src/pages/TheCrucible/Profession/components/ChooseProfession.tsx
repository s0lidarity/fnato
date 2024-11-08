import { GroupBox,SelectNative } from 'react95';
import styled from 'styled-components';
import { useState } from 'preact/hooks';

import { Profession } from '../../../../utils/Professions';
import professions from '../../../../utils/Professions';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillPicker from './ProfessionSkillPicker';

const StyledSelectContainer = styled.div`
    display: flex;
    flex-direction: rows;
    align-items: center;
    flex: 1;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const StyledSelect = styled(SelectNative)`
    min-width: fit-content;
`;


function ChooseProfession() {
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const { applyProfessionSkills } = useSkills();

    const generateProfessionOptions = () => {
        const options = [];
        professions.forEach((profession) => {
            options.push({ label: profession.name, value: profession.name });
        });
        return options;
    };

    const handleProfessionSelect = (professionName: string) => {
        const newProfession = professions.find((p) => p.name === professionName);
        setSelectedProfession(newProfession);
        applyProfessionSkills(newProfession.professionalSkills);
    };

    // AJS, this select should live in the same groupbox as the skill picker for clarity
    return (
        <GroupBox>
            <StyledSelectContainer>
                <h3>Professional Background</h3>
                <StyledSelect 
                    options={generateProfessionOptions()}
                    value={selectedProfession?.name || ''}
                    onChange={(e: any) => handleProfessionSelect(e.value)} 
                />
            </StyledSelectContainer>
            <ProfessionSkillPicker
                profession={selectedProfession}
            />
        </GroupBox>
    )
}

export default ChooseProfession;