import { Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

import { ProfessionConfigOptions } from '../../../../types/componentTypes';
import { useSkills } from '../../../../providers/SkillsContext';
const StyledWindow = styled(Window)`
    width: 90%;
`;

const renderedSkillInputs = 
    <div>
        <label>Skill</label>
        <input type="text" />
    </div>  
;

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
                {renderedSkillInputs}
            </WindowContent>
        </StyledWindow>
    );
};

export default SkillForm;