import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillInput from './ProfessionSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter'
import { useEffect, useState } from 'preact/hooks';
import ChooseProfession from './ChooseProfession';
import { Button } from 'react95';
import { MAX_BONUS_POINTS } from '../../../../constants/gameRules';

const SkillFormContainer = styled.div.attrs<any>({
    'data-testid': 'skill-form-container',
    'data-component': 'SkillForm/SkillFormContainer'
})`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 0.5rem;
    column-gap: 0.5rem;
    width: 95%;
    justify-items: center;
    justify-content: space-evenly;
`;

const SkillInputContainer = styled.div.attrs<any>({
    'data-testid': 'skill-input-container',
    'data-component': 'SkillForm/SkillInputContainer'
})`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 95%;
    min-width: fit-content;
    align-items: center;
`;

const PointsCounterContainer = styled.div.attrs<any>({
    'data-testid': 'points-counter-container',
    'data-component': 'SkillForm/PointsCounterContainer'
})`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    margin-top: 1rem;
    gap: 0.5rem;
`;

const renderSkillInputs = (skills: Skills) => {
    // Avoids a console error if the skills array is empty
    if(!skills.length) return null;
    
    console.log('Rendering skills:', skills);
    
    return skills.map((s) => {
        console.log('Rendering skill:', s.id, s.name, s.value, s.subType);
        return (
            <SkillInputContainer key={s.id}>
                <ProfessionSkillInput 
                    skill={s} 
                />
            </SkillInputContainer>
        );
    });
};

function StandardSkillForm() {
    const { bonusPointsRemaining, skills, resetAllBonusPoints, profession } = useSkills();
    const [showNoPointsWarning, setShowNoPointsWarning] = useState(false);

    // Log when skills change
    useEffect(() => {
        console.log('Skills updated in StandardSkillForm:', skills);
    }, [skills]);

    const handleResetBonusPoints = () => {
        resetAllBonusPoints();
    };

    useEffect(() => {
        if(bonusPointsRemaining <= 0) {
            setShowNoPointsWarning(true);
            setTimeout(() => setShowNoPointsWarning(false), 500);
        }
    }, [bonusPointsRemaining]);

    useEffect(() => {
        if (profession) {
            console.log('Profession changed, skills count:', skills.length);
        }
    }, [profession, skills]);

    return (
        <div>
            <ChooseProfession />
            <SkillFormContainer>
                {renderSkillInputs(skills)}
            </SkillFormContainer>
            <PointsCounterContainer>
                <PointsCounter 
                    value={bonusPointsRemaining} 
                    showNoPointsWarning={showNoPointsWarning}
                    label="Bonus Points Remaining"/>
                <Button 
                    disabled={bonusPointsRemaining === MAX_BONUS_POINTS}
                    onClick={handleResetBonusPoints}>
                    Reset Bonus Points
                </Button>
            </PointsCounterContainer>
        </div>
    );
};

// AJS TODO rename to ProfessionSkillForm
export default StandardSkillForm;