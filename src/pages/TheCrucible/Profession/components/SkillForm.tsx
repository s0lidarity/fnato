import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillInput from './ProfessionSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter'

const SkillFormContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 0.5rem;
    column-gap: 0.5rem;
    width: 95%;
    justify-items: center;
    justify-content: space-evenly;
`;

const SkillInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 95%;
    min-width: fit-content;
    align-items: center;
`;

const renderSkillInputs = (skills: Skills) => {
    return Object.keys(skills).map((skillKey) => {
        return (
            <SkillInputContainer>
                <ProfessionSkillInput 
                    skillKey={skillKey} 
                />
            </SkillInputContainer>
        );
    });
};

const SkillForm = () => {
    const { skills, bonusPointsRemaining, setSkills, setSkillByKey } = useSkills();

    return (
        <div>
            <SkillFormContainer>
                {renderSkillInputs(skills)}
            </SkillFormContainer>
            <PointsCounter value={bonusPointsRemaining} showNoPointsWarning />
        </div>
    );
};

export default SkillForm;