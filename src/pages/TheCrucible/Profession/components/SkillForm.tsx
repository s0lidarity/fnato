import { Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';

const StyledWindow = styled(Window)`
    width: 90%;
`;

const renderedSkillInputs = 
    <div>
        <label>Skill</label>
        <input type="text" />
    </div>  
;

const SkillForm = () => {
    return (
        <StyledWindow>
            <WindowHeader>
                {renderedSkillInputs}
            </WindowHeader>
        </StyledWindow>
    );
};

export default SkillForm;