import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { NumberInput } from 'react95';

import { useSkills } from '../../../../providers/SkillsContext';
import BuildProfession from './BuildProfession';
import CustomSkillInput from './CustomSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';
import {
    DEFAULT_BONDS,
    DEFAULT_MAX_BONDS,
    DEFAULT_MIN_BONDS,
    BONDS_TO_POINTS_MULTIPLIER,
    DEFAULT_MAX_SKILL_VALUE,
    DEFAULT_BONUS_VALUE,
    DEFAULT_TOTAL_CAP
} from '../../../../constants/gameRules';

const FormWrapper = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-wrapper',
    'data-component': 'CustomSkillForm/FormWrapper',
})`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
    width: 95%;
    align-items: center;
`;



function CustomSkillForm() {
    const { skills, setBonds, bonusPointsRemaining } = useSkills();
    const [ bonds, setLocalBonds] = useState(DEFAULT_BONDS);
    const { skillPointsRemaining, setSkillPointsRemaining } = useSkills();

    const handleBondsChange = (newBonds: number) => {
        if(newBonds >= DEFAULT_MIN_BONDS && newBonds <= DEFAULT_MAX_BONDS) {
            setLocalBonds(newBonds);
            const pointDiff = (3 - newBonds) * BONDS_TO_POINTS_MULTIPLIER;
            setSkillPointsRemaining(skillPointsRemaining + pointDiff);
            setBonds(newBonds);
        }
    };

    return (
        <FormWrapper>
            <HeaderContainer>
                <div>
                    <BuildProfession />
                </div>
                <div>
                    <ReminderTooltip
                        labelText={'Bonds'}
                        reminderText={'Bonds represent meaningful relationships your agent has with non-player characters.'}
                    />
                </div>
                <div>
                    <NumberInput value={bonds} onChange={(value) => handleBondsChange(value)} />
                </div>
                <div>
                    <PointsCounter value={skillPointsRemaining} label={'Skill Points'} minDigits={3} />
                </div>
                <BonusPointsContainer>
                    <ReminderTooltip labelText='Bonus Points' reminderText={`Adds ${DEFAULT_BONUS_VALUE} to the skill total for each bonus point allocated (capped at ${DEFAULT_TOTAL_CAP})`} />
                    <PointsCounter value={bonusPointsRemaining} label='' minDigits={1} />
                </BonusPointsContainer>
            </HeaderContainer>
            <SkillFormContainer>
                {skills.map((s) => (
                    <CustomSkillInput
                        key={s.id}
                        skill={s}
                        maxValue={DEFAULT_MAX_SKILL_VALUE}
                    />
                ))}
            </SkillFormContainer>
            {/* AJS consider allowing users to add custom skills */}
            <AllPointsContainer>
                <PointsContainer>
                    <PointsCounter value={skillPointsRemaining} label={'Skill Points Remaining'} minDigits={3} />
                </PointsContainer>
                <PointsContainer>
                    <PointsCounter value={bonusPointsRemaining} label={'Bonus Points Remaining'} minDigits={1} />
                </PointsContainer>
            </AllPointsContainer>
        </FormWrapper>
    );
};

export default CustomSkillForm;