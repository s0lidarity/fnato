import styled from 'styled-components';
import { useState } from 'preact/hooks';
import { NumberInput } from 'react95';

import { useSkills } from '../../../../providers/SkillsContext';
import CustomSkillInput from './CustomSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import ReminderTooltip from '../../../../components/Footer/ReminderTooltip/ReminderTooltip';

const SkillFormContainer = styled.div.attrs<any>({
    'data-testid': 'custom-skill-form-container',
    'data-component': 'CustomSkillForm/SkillFormContainer',
})`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 0.5rem;
    column-gap: 0.5rem;
    width: 95;
    justify-items: center;
    justify-content: space-evenly;
`;

const BondsContainer = styled.div.attrs<any>({
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

// AJS put these in a constants file
const DEFAULT_BONDS = 3;
const DEFAULT_MAX_BONDS = 4;
const DEFAULT_MIN_BONDS = 1;
const DEFAULT_SKILL_POINTS = 400;
const BONDS_TO_POINTS_MULTIPLIER = 50;
const DEFAULT_MAX_SKILL_VALUE = 60;

function CustomSkillForm() {
    const { skills, setBonds, bonusPointsRemaining } = useSkills();
    // AJS why are we using both the context and local state?
    const [ bonds, setLocalBonds] = useState(DEFAULT_BONDS);
    const [skillPoints, setSkillPoints] = useState(DEFAULT_SKILL_POINTS);

    const handleBondsChange = (newBonds: number) => {
        if(newBonds >= DEFAULT_MIN_BONDS && newBonds <= DEFAULT_MAX_BONDS) {
            setLocalBonds(newBonds);
            const pointDiff = (3 - newBonds) * BONDS_TO_POINTS_MULTIPLIER;
            setSkillPoints(skillPoints + pointDiff);
            setBonds(newBonds);
        }
    };

    return (
        <div>
            <BondsContainer>
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
                <PointsCounter value={skillPoints} label={'Skill Points Remaining'} minDigits={3} />
                </div>
            </BondsContainer>
            <SkillFormContainer>
                {skills.map((s) => (
                    <CustomSkillInput
                        key={s.id}
                        skill={s}
                        maxValue={DEFAULT_MAX_SKILL_VALUE}
                    />
                ))}
            </SkillFormContainer>
            <AllPointsContainer>
                <PointsContainer>
                    <PointsCounter value={bonusPointsRemaining} label={'Bonus Points Remaining'} minDigits={1} />
                </PointsContainer>
                <PointsContainer>
                    <PointsCounter value={skillPoints} label={'Skill Points Remaining'} minDigits={3} />
                </PointsContainer>
            </AllPointsContainer>
        </div>
    );
};

export default CustomSkillForm;