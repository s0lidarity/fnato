import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import ProfessionSkillInput from './ProfessionSkillInput';

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

const handleBonusChange = (skillKey: string) => {
    return (value: number) => {
        console.log(skillKey, value);
    };
    // we'll apply the bonus to the skill value and record both
};

const renderSkillInputs = (skills: Skills, professionConfig: ProfessionConfigOptions) => {
    return Object.keys(skills).map((skillKey) => {
        return (
            <SkillInputContainer>
                <ProfessionSkillInput 
                    config={professionConfig}
                    skillKey={skillKey} 
                    handleBonusChange={handleBonusChange} 
                />
            </SkillInputContainer>
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