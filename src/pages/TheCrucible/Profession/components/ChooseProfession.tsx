import { GroupBox, Separator } from 'react95';
import styled from 'styled-components';
import { Trans } from '@lingui/react';
import { i18n } from '@lingui/core';
import { t, msg } from '@lingui/core/macro';

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
    flex-direction: column;
    gap: 1rem;
`;

const ChooseProfessionHeader = styled.div.attrs<any>({
    'data-testid': 'choose-profession-header',
    'data-component': 'ChooseProfession/ChooseProfessionHeader'
})`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const TopSection = styled.div.attrs<any>({
    'data-testid': 'top-section',
    'data-component': 'ChooseProfession/TopSection'
})`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.5rem;
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
`;

const FlavorTextContainer = styled.div.attrs<any>({
    'data-testid': 'flavor-text-container',
    'data-component': 'ChooseProfession/FlavorTextContainer'
})`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    text-wrap: pretty;
    justify-content: flex-start;
    margin-bottom: 1rem;
    padding: 0 1rem;
`;

const StyledNativeSelect = styled.select.attrs<any>({
    'data-testid': 'select',
    'data-component': 'ChooseProfession/StyledSelect'
})`
    min-width: fit-content;
    margin-left: 0.5rem;
    padding: 0.25rem;
    background-color: ${({ theme }) => theme.canvas};
    color: ${({ theme }) => theme.materialText};
    border: 0.125rem inset ${({ theme }) => theme.borderDark};
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 0.9rem;
    
    &:focus {
        outline: 0.125rem dotted ${({ theme }) => theme.focusSecondary};
    }
    
    option {
        background-color: ${({ theme }) => theme.canvas};
        color: ${({ theme }) => theme.materialText};
    }
    
    option:disabled {
        color: ${({ theme }) => theme.materialTextDisabled};
    }
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
    const allProfessions = [...professions, ...additionalProfessions];

    const generateProfessionOptions = () => {
        return (
            <>
                <option value="" disabled>{t`--- Standard Professions ---`}</option>
                {professions.map(prof => (
                    <option key={prof.name} value={prof.name}>
                        {i18n._(prof.labelMsg)}
                    </option>
                ))}
                <option value="" disabled>──────────────</option>
                <option value="" disabled>{t`--- Additional Professions ---`}</option>
                {additionalProfessions.map(prof => (
                    <option key={prof.name} value={prof.name}>
                        {i18n._(prof.labelMsg)}
                    </option>
                ))}
            </>
        );
    };

    const handleProfessionSelect = (professionName: string) => {
        const newProfession = allProfessions.find((p) => p.name === professionName);
        changeProfession(newProfession);
        setBonusPointsRemaining(MAX_BONUS_POINTS);
        bondCountSignal.value = newProfession.bondCount;
    };

    const pbLabelTextMsg = msg({
        message: 'Professional Background'
    });

    const pbReminderTextMsg = msg({
        message: 'Apply preset skills and choose additional skills for your character.'
    });

    const keyStatsLabelTextMsg = msg({
        message: 'Key Stats'
    });

    const keyStatsReminderTextMsg = msg({
        message: 'Recommended best stats for your chosen profession.'
    });
    
    const bondsLabelTextMsg = msg({
        message: 'Bonds'
    });

    const bondsReminderTextMsg = msg({
        message: 'Number of social connections available to your character.'
    });     

    return (
        <ChooseProfessionGroupBox>
            <ChooseProfessionHeader>
                <TopSection>
                    <StyledSelectContainer>
                        <ReminderTooltip 
                            labelText={pbLabelTextMsg}
                            reminderText={pbReminderTextMsg}
                        />
                        <StyledNativeSelect
                            value={profession?.name || ''}
                            onChange={(e) => handleProfessionSelect(e.target.value)}
                        >
                            {generateProfessionOptions()}
                        </StyledNativeSelect>
                    </StyledSelectContainer>
                    <KeyStatSection>
                        <KeyStatContainer>
                            <ReminderTooltip 
                                labelText={keyStatsLabelTextMsg}
                                reminderText={keyStatsReminderTextMsg}
                            />
                            <KeyStatsLabel>
                                {profession?.recommendedStats.join(', ')}
                            </KeyStatsLabel>
                        </KeyStatContainer>
                        <KeyStatContainer>
                            <ReminderTooltip 
                                labelText={bondsLabelTextMsg}
                                reminderText={bondsReminderTextMsg}
                            />
                            <KeyStatsLabel>
                                {profession?.bondCount || 0}
                            </KeyStatsLabel>
                        </KeyStatContainer>
                    </KeyStatSection>
                </TopSection>
                <FlavorTextContainer>
                    {profession?.flavorTextMsg && <div><Trans id={profession?.flavorTextMsg.id} /></div>}
                </FlavorTextContainer>
            </ChooseProfessionHeader>
            <Separator />
            <ProfessionChoices />
            { profession && <BonusSkillPackageChoices /> }
        </ChooseProfessionGroupBox>
    )
}

export default ChooseProfession;