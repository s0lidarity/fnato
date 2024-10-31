import { Window, WindowContent, WindowHeader, Button } from 'react95';
import { IoCloseSharp } from "react-icons/io5";
import styled from 'styled-components';

type DialogueProps = {
    children: React.ReactNode;
    title: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const StyledWindow = styled(Window)`
    z-index: 1000;
    position: fixed;
    width: 20rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledWindowHeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    height: 100%;
`;

const StyledWindowHeaderTitle = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Dialogue({ 
    children, 
    title, 
    show, 
    setShow,
}: DialogueProps) {
    return (
        <>
            {show && (
                <StyledWindow>
                    <WindowHeader>
                        <StyledWindowHeaderContainer>
                            <StyledWindowHeaderTitle>
                                {title}
                            </StyledWindowHeaderTitle>
                            <Button onClick={() => setShow(false)}><IoCloseSharp /></Button>
                        </StyledWindowHeaderContainer>
                    </WindowHeader>
                    <WindowContent>
                        {children}
                    </WindowContent>
                </StyledWindow>
            )}
        </>
    );
}