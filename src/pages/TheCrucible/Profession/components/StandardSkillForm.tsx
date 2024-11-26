import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillInput from './ProfessionSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter'
import { useEffect, useState } from 'preact/hooks';

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
    justify-content: center;
    width: 95%;
    margin-top: 1rem;
`;

const renderSkillInputs = (skills: Skills) => {
    // avoids a console error if the skills array is empty
    if(!skills.length) return null;
    return skills.map((s) => {
        return (
            <SkillInputContainer>
                <ProfessionSkillInput 
                    skill={s} 
                />
            </SkillInputContainer>
        );
    });
};

// AJS start with the advice from claude in chat
function StandardSkillForm() {
    const { bonusPointsRemaining, skills } = useSkills();
    const [showNoPointsWarning, setShowNoPointsWarning] = useState(false);

    // applies temp styling to the PointsCounter when you run out of bonus points
    useEffect(() => {
        if(bonusPointsRemaining <= 0) {
            setShowNoPointsWarning(true);
            setTimeout(() => setShowNoPointsWarning(false), 500);
        }
    }, [bonusPointsRemaining]);

    return (
        <div>
            <SkillFormContainer>
                {renderSkillInputs(skills)}
            </SkillFormContainer>
            <PointsCounterContainer>
                <PointsCounter 
                    value={bonusPointsRemaining} 
                    showNoPointsWarning={showNoPointsWarning}
                    label="Bonus Points Remaining"
                />
            </PointsCounterContainer>
        </div>
    );
};

export default StandardSkillForm;