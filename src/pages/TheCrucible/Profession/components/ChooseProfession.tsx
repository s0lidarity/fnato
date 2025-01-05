import { GroupBox,SelectNative, Separator } from 'react95';
import styled from 'styled-components';

import professions, { additionalProfessions } from '../../../../utils/Professions';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionChoices from './ProfessionChoices';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import BonusSkillPackageChoices from './BonusSkillPackageChoices';
import { bondCountSignal } from '../../../../signals/bondSignal';
import { MAX_BONUS_POINTS } from '../../../../constants/gameRules';

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

const KeyStatSection = styled.div.attrs<any>({
    'data-testid': 'key-stat-section',
    'data-component': 'ChooseProfession/KeyStatSection'
})`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: flex-start;
    flex: 1;
`;

const KeyStatContainer = styled.div.attrs<any>({
    'data-testid': 'key-stats-container',
    'data-component': 'ChooseProfession/KeyStatsContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: 0 1 auto;
    min-width: 200px;
    margin-bottom: 1rem;
    padding: 0 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const KeyStatsLabel = styled.span.attrs<any>({
    'data-testid': 'key-stats-label',
    'data-component': 'ChooseProfession/KeyStatsLabel'
})`
    margin-left: 0.5rem;
`;


function ChooseProfession() {
    const { profession, changeProfession, setBonusPointsRemaining } = useSkills();

    const generateProfessionOptions = () => {
        return [
            { label: '--- Standard Professions ---', value: '', disabled: true },
            ...professions.map(profession => ({
                label: profession.name,
                value: profession.name
            })),
            { label: '──────────────', value: '', disabled: true },
            { label: '--- Additional Professions ---', value: '', disabled: true },
            ...additionalProfessions.map(profession => ({
                label: profession.name,
                value: profession.name
            }))
        ];
    };

    const handleProfessionSelect = async (professionName: string) => {
        const newProfession = professions.find((p) => p.name === professionName);
        await changeProfession(newProfession);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
        bondCountSignal.value = newProfession.bondCount;
    };

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
                        value={profession?.name || ''}
                        onChange={(e: any) => handleProfessionSelect(e.value)} 
                    />
                </StyledSelectContainer>
                <KeyStatSection>
                    <KeyStatContainer>
                        <ReminderTooltip 
                            labelText='Key Stats'
                            reminderText='Recommended best stats for your chosen profession.'
                        />
                        <KeyStatsLabel>
                            {profession?.recommendedStats.join(', ')}
                        </KeyStatsLabel>
                    </KeyStatContainer>
                    <KeyStatContainer>
                        <ReminderTooltip 
                            labelText='Bonds'
                            reminderText='Number of social connections available to your character.'
                        />
                        <KeyStatsLabel>
                            {profession?.bondCount || 0}
                        </KeyStatsLabel>
                    </KeyStatContainer>
                </KeyStatSection>
            </ChooseProfessionHeader>
            <Separator />
            <ProfessionChoices />
            { profession && <BonusSkillPackageChoices /> }
        </ChooseProfessionGroupBox>
    )
}

export default ChooseProfession;