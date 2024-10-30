import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import SkillInput from './SkillInput';

const SkillFormContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem;
    column-gap: 1rem;
    width: 95%;
    justify-content: space-between;
`;

const handleBonusChange = (skillKey: string) => {
    return (value: number) => {
        console.log(skillKey, value);
    };
    // we'll apply the bonus to the skill value and record both
};

const renderSkillInputs = (skills: Skills, professionConfig: ProfessionConfigOptions) => {
    return Object.keys(skills).map((skillKey) => {
        return (
            <SkillInput 
                config={professionConfig}
                skillKey={skillKey} 
                handleBonusChange={handleBonusChange} 
            />
        );
    });
};

type SkillFormProps = {
    professionConfig: ProfessionConfigOptions;
};
const SkillForm = ({ professionConfig }: SkillFormProps) => {
    const { skills, setSkills, setSkillByKey } = useSkills();

    return (
        <SkillFormContainer>
            {renderSkillInputs(skills, professionConfig)}
        </SkillFormContainer>
    );
};

export default SkillForm;