import { SelectNative } from 'react95';
import styled from 'styled-components';
import { useState } from 'preact/hooks';

import { Profession } from '../../../../utils/Professions';
import professions from '../../../../utils/Professions';
import { useSkills } from '../../../../providers/SkillsContext';

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
    const [showChosenSkillPicker, setShowChosenSkillPicker] = useState(false);

    const generateProfessionOptions = () => {
        const options = [];
        professions.forEach((profession) => {
            options.push({ label: profession.name, value: profession });
        });
        return options;
    };

    const handleProfessionSelect = (profession: Profession) => {
        setSelectedProfession(profession);
        applyProfessionSkills(profession.professionalSkills);
        setShowChosenSkillPicker(true);
    };

    return (
        <span>
            <StyledSelectContainer>
                <h3>Professional Background</h3>
                <StyledSelect 
                    options={generateProfessionOptions()}
                    value={selectedProfession?.name || ''}
                    onChange={(selectedOption: any) => handleProfessionSelect(selectedOption.value)} 
                />
            </StyledSelectContainer>
            {showChosenSkillPicker && <ChosenSkillPicker chosenSkills={selectedProfession?.choosableSkills || []} />}
        </span>
    )
}

export default ChooseProfession;