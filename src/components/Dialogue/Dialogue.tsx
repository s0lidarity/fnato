import { Window, WindowContent, WindowHeader, Button } from 'react95';
import { useState } from 'preact/hooks';
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledWindowHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const StyledWindowHeaderTitle = styled.div`
    flex-grow: 1;
    justify-self: center;
`;

export default function Dialogue({ children, title, show, setShow }: DialogueProps) {
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