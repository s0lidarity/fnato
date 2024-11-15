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

const SkillForm = () => {
    const { skills, bonusPointsRemaining } = useSkills();
    // AJS, currently only flashes when you first run out of points
    // should flash when you try to spend points you don't have
    const [showNoPointsWarning, setShowNoPointsWarning] = useState(false);


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
            <PointsCounter value={bonusPointsRemaining} showNoPointsWarning={showNoPointsWarning} />
        </div>
    );
};

export default SkillForm;