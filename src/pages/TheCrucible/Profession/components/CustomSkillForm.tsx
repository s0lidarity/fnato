import styled from 'styled-components';
import { useEffect, useState } from 'preact/hooks';

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
const DEFAULT_SKILL_POINTS = 400;
const BONDS_TO_POINTS_MULTIPLIER = 50;

function CustomSkillForm() {
    const { skills, setBonds } = useSkills();
    // AJS why are we using both the context and local state?
    const [ bonds, setLocalBonds] = useState(DEFAULT_BONDS);
    const [skillPoints, setSkillPoints] = useState(DEFAULT_SKILL_POINTS);

    const handleBondsChange = (newBonds: number) => {
        if(newBonds >=1 && newBonds <=4) {
            setLocalBonds(newBonds);
            const pointDiff = (3 - newBonds) * BONDS_TO_POINTS_MULTIPLIER;
            setSkillPoints(skillPoints + pointDiff);
            setBonds(newBonds);
        }
    };

    return (
        <div>
            <BondsContainer>
                <h3>Bonds: {bonds}</h3>
                <div>
                    {/* AJS start here, finish from claude */}
                </div>
            </BondsContainer>
        <SkillFormContainer>

        </SkillFormContainer>
        </div>
    );
};