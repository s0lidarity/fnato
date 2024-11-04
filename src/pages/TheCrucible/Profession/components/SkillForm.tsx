import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillInput from './ProfessionSkillInput';
import PointsCounter from '../../../../components/PointsCounter/PointsCounter'

const SkillFormContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 0.5rem;
    column-gap: 1rem;
    width: 95%;
    justify-items: center;
    justify-content: space-between;
`;

const SkillInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: fit-content;
    align-items: center;
`;

const renderSkillInputs = (skills: Skills, professionConfig: ProfessionConfigOptions) => {
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

type SkillFormProps = {
    professionConfig: ProfessionConfigOptions;
};
const SkillForm = ({ professionConfig }: SkillFormProps) => {
    const { skills, bonusPointsRemaining, setSkills, setSkillByKey } = useSkills();

    return (
        <div>
            <SkillFormContainer>
                {renderSkillInputs(skills, professionConfig)}
            </SkillFormContainer>
            <PointsCounter value={bonusPointsRemaining} showNoPointsWarning />
        </div>
    );
};

export default SkillForm;