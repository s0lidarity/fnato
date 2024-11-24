import styled from 'styled-components';
import { useEffect, useState } from 'preact/hooks';
import { NumberInput } from 'react95';

import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillInput from './ProfessionSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter';
import {Skills} from '../../../../types/characterTypes';

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
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`;

// AJS put these in a constants file
const DEFAULT_BONDS = 3;
const DEFAULT_MAX_BONDS = 4;
const DEFAULT_MIN_BONDS = 1;
const DEFAULT_SKILL_POINTS = 400;
const BONDS_TO_POINTS_MULTIPLIER = 50;
const DEFAULT_MAX_SKILL_VALUE = 60;

function CustomSkillForm() {
    const { skills, setBonds } = useSkills();
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
                <h3><PointsCounter value={bonds} minDigits={1} label={'Bonds'} /></h3>
                <div>
                    <NumberInput value={bonds} onChange={(value) => handleBondsChange(value)} />
                </div>
                <SkillFormContainer>
                    {skills.map((s) => (
                        <ProfessionSkillInput 
                            key={s.id}
                            skill={s}
                            maxValue={DEFAULT_MAX_SKILL_VALUE}
                        />
                    ))}
                </SkillFormContainer>
                <PointsCounter value={skillPoints} minDigits={3} />
            </BondsContainer>
        </div>
    );
};

export default CustomSkillForm;