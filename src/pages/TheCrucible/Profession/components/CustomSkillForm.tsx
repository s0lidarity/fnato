import styled from 'styled-components';
import { Button, NumberInput } from 'react95';
import { t } from '@lingui/core/macro';

import { useSkills } from '../../../../providers/SkillsContext';
import BuildProfession from './BuildProfession';
import CustomSkillInput from './CustomSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import {
    DEFAULT_MAX_BONDS,
    DEFAULT_MIN_BONDS,
    BONDS_TO_POINTS_MULTIPLIER,
    DEFAULT_MAX_SKILL_VALUE,
    DEFAULT_BONUS_VALUE,
    DEFAULT_TOTAL_CAP,
    DEFAULT_SKILL_POINTS,
    DEFAULT_BONDS
} from '../../../../constants/gameRules';
import { bondCountSignal } from '../../../../signals/bondSignal';
import { DEFAULT_SKILLS } from '../../../../types/characterTypes';
import { i18n } from '@lingui/core';

const FormWrapper = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-wrapper',
    'data-component': 'CustomSkillForm/FormWrapper',
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 95%;
    margin: auto;
`;

const HeaderContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-bonds-container',
    'data-component': 'CustomSkillForm/BondsContainer',
})`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
`;

const AllPointsContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-all-points-container',
    'data-component': 'CustomSkillForm/AllPointsContainer',
})`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
`;

const PointsContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-points-container',
    'data-component': 'CustomSkillForm/PointsContainer',
})`
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

const BonusPointsContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-bonus-points-container',
    'data-component': 'CustomSkillForm/BonusPointsContainer',
})`
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SkillFormContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-container',
    'data-component': 'CustomSkillForm/SkillFormContainer',
})`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    align-items: stretch;
`;



function CustomSkillForm() {
    const { skills, skillPointsRemaining, setSkillPointsRemaining, bonusPointsRemaining, resetAllBonusPoints, resetSkills } = useSkills();

    const handleBondsChange = (newBonds: number) => {
        if(newBonds >= DEFAULT_MIN_BONDS && newBonds <= DEFAULT_MAX_BONDS) {
            const pointDiff = (bondCountSignal.value - newBonds) * BONDS_TO_POINTS_MULTIPLIER;
            setSkillPointsRemaining(skillPointsRemaining + pointDiff);
            bondCountSignal.value = newBonds;
        }
    };

    const handleResetSkillPoints = () => {
        setSkillPointsRemaining(DEFAULT_SKILL_POINTS);
        bondCountSignal.value = DEFAULT_BONDS;
        resetSkills();
    };

    const BonusPointsReminderText = i18n._({
        id: 'custom-skill-form.bonus-points-reminder',
        message:`Adds {DEFAULT_BONUS_VALUE} to the skill total for each bonus point allocated (capped at {DEFAULT_TOTAL_CAP})`,
        values: {
            DEFAULT_BONUS_VALUE,
            DEFAULT_TOTAL_CAP
        }
    })

    return (
        <FormWrapper>
            <HeaderContainer>
                <div>
                    <BuildProfession />
                </div>
                <div>
                    <ReminderTooltip
                        labelText={t`Bonds`}
                        reminderText={t`Bonds represent meaningful relationships your agent has with non-player characters.`}
                    />
                </div>
                <div>
                    <NumberInput 
                        value={bondCountSignal.value} 
                        onChange={(value) => handleBondsChange(value)} 
                    />
                </div>
                <div>
                    <PointsCounter value={skillPointsRemaining} label={t`Skill Points`} minDigits={3} />
                </div>
                <BonusPointsContainer>
                    <ReminderTooltip 
                        labelText={t`Bonus Points`} 
                        reminderText={BonusPointsReminderText}
                    />
                    <PointsCounter value={bonusPointsRemaining} label='' minDigits={1} />
                </BonusPointsContainer>
            </HeaderContainer>
            <SkillFormContainer>
                {skills.map((s) => (
                    <CustomSkillInput
                        key={`${s.id}-${s.name}-${s.subType}`}
                        skill={s}
                        maxValue={DEFAULT_MAX_SKILL_VALUE}
                    />
                ))}
            </SkillFormContainer>
            <AllPointsContainer>
                <PointsContainer>
                    <PointsCounter value={skillPointsRemaining} label={t`Skill Points Remaining`} minDigits={3} />
                    <Button onClick={handleResetSkillPoints}>
                        {t`Reset Skill Points`}
                    </Button>
                </PointsContainer>
                <PointsContainer>
                    <PointsCounter value={bonusPointsRemaining} label={t`Bonus Points Remaining`} minDigits={1} />
                    <Button 
                        disabled={bonusPointsRemaining === DEFAULT_SKILL_POINTS}
                        onClick={resetAllBonusPoints}
                    >
                        {t`Reset Bonus Points`}
                    </Button>
                </PointsContainer>
            </AllPointsContainer>
        </FormWrapper>
    );
};

export default CustomSkillForm;