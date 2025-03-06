import { Button, Window, WindowContent, WindowHeader } from 'react95';
import { IoCloseSharp } from "react-icons/io5";
import styled from 'styled-components';

// AJS this is a modal, not a dialogue. Should be renamed
type DialogueProps = {
    children: React.ReactNode;
    title: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const StyledWindow = styled(Window)`
    z-index: 1000;
    position: fixed;
    min-width: fit-content;
    width: auto;
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
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    margin-left: 0.5rem;
    white-space: nowrap;
    max-width: calc(100%-3rem);
    overflow: hidden;
    text-overflow: ellipsis;
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
                            <StyledButton onClick={() => setShow(false)}><IoCloseSharp /></StyledButton>
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