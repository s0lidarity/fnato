import { NumberInput, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { Skills } from '../../../../types/characterTypes';
import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import { useSkills } from '../../../../providers/SkillsContext';
import SkillInput from './SkillInput';
const StyledWindow = styled(Window)`
    width: 90%;
`;

const handleBonusChange = (skillKey: string) => {
    return (value: number) => {
        console.log(skillKey, value);
    };
};

const renderSkillInputs = (skills: Skills) => {
    return Object.keys(skills).map((skillKey) => {
        return <SkillInput skillKey={skillKey} handleBonusChange={handleBonusChange} />
    });
};

type SkillFormProps = {
    professionConfig: ProfessionConfigOptions;
};
const SkillForm = ({ professionConfig }: SkillFormProps) => {
    const { skills, setSkills } = useSkills();

    return (
        <StyledWindow>
            <WindowHeader>
                Skills
            </WindowHeader>
            <WindowContent>
                {renderSkillInputs(skills)}
            </WindowContent>
        </StyledWindow>
    );
};

export default SkillForm;