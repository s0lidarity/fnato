import { GroupBox,SelectNative, Separator } from 'react95';
import styled from 'styled-components';
import { useState } from 'preact/hooks';

import { Profession } from '../../../../utils/Professions';
import professions from '../../../../utils/Professions';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillPicker from './ProfessionSkillPicker';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';

const ChooseProfessionGroupBox = styled(GroupBox).attrs<any>({
    'data-testid': 'choose-profession-group-box',
    'data-component': 'ChooseProfession/ChooseProfessionGroupBox'
})`
    width: 95%;
    margin-bottom: 1rem;
`;

const ChooseProfessionHeader = styled.div.attrs<any>({
    'data-testid': 'choose-profession-header',
    'data-component': 'ChooseProfession/ChooseProfessionHeader'
})`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const StyledSelectContainer = styled.div.attrs<any>({
    'data-testid': 'select-container',
    'data-component': 'ChooseProfession/StyledSelectContainer'
})`
    display: flex;
    flex-direction: rows;
    align-items: center;
    flex: 1;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

// using a SelectNative because the standard kept putting the dropdown arrow in ugly spots
const StyledSelect = styled(SelectNative).attrs<any>({
    'data-testid': 'select',
    'data-component': 'ChooseProfession/StyledSelect'
})`
    min-width: fit-content;
`;

const KeyStatsContainer = styled.div.attrs<any>({
    'data-testid': 'key-stats-container',
    'data-component': 'ChooseProfession/KeyStatsContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    margin-bottom: 1rem;
`;

const KeyStatsLabel = styled.span.attrs<any>({
    'data-testid': 'key-stats-label',
    'data-component': 'ChooseProfession/KeyStatsLabel'
})`
    margin-left: 0.5rem;
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

    // AJS, pick up here, skills not updating when additional skills are chosen
    return (
        <ChooseProfessionGroupBox>
            <ChooseProfessionHeader>
                <StyledSelectContainer>
                    <ReminderTooltip 
                        labelText='Professional Background'
                        reminderText='Apply preset skills and choose additional skills for your character.'
                    />
                    <StyledSelect 
                        options={generateProfessionOptions()}
                        value={selectedProfession?.name || ''}
                        onChange={(e: any) => handleProfessionSelect(e.value)} 
                    />
                </StyledSelectContainer>
                <KeyStatsContainer>
                    <ReminderTooltip 
                        labelText='Key Stats'
                        reminderText='Recommended best stats for your chosen profession.'
                    />
                    <KeyStatsLabel>
                        {selectedProfession?.recommendedStats.join(', ')}
                    </KeyStatsLabel>
                </KeyStatsContainer>
            </ChooseProfessionHeader>
            <Separator />
            <ProfessionSkillPicker
                profession={selectedProfession}
            />
        </ChooseProfessionGroupBox>
    )
}

export default ChooseProfession;