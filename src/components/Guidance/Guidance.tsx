import { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { Button, Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { FaRegWindowMinimize } from "react-icons/fa";
import { FaWindowMaximize } from "react-icons/fa6";

const StyledWindow = styled(Window)`
    width: 100%;
`;

const StyledWindowHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 0.5rem;
`;

const StyledTitle = styled.h2`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    min-width: 200px;
    padding: 0.5rem;
`;

const StyledButtonText = styled.div`
    flex: 1;
    text-align: center;
    margin-right: 1.5rem;
`;

const StyledMinButton = styled(Button)`
    display: flex;
    margin-top: 0.25rem;
    margin-right: 1px;
    align-items: center;
    align-self: center;
`;

const StyledMaximizeIcon = styled(FaWindowMaximize)`
    color: ${({ theme }) => theme.canvasTextInvert};
    position: absolute;
    right: 0.5rem;
`;

interface GuidanceProps {
    title: string;
    buttonText: string;
    children: ComponentChildren;
}

function Guidance({ title, buttonText, children }: GuidanceProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen ? (
                <StyledButton onClick={() => setIsOpen(true)}>
                    <StyledButtonText>{buttonText}</StyledButtonText>
                    <StyledMaximizeIcon />
                </StyledButton>
            ) : (
                <StyledWindow>
                    <WindowHeader>
                        <StyledWindowHeader>
                            <StyledTitle>{title}</StyledTitle>
                            <StyledMinButton onClick={() => setIsOpen(false)}>
                                <FaRegWindowMinimize />
                            </StyledMinButton>
                        </StyledWindowHeader>
                    </WindowHeader>
                    <WindowContent>
                        {children}
                    </WindowContent>
                </StyledWindow>
            )}
        </>
    );
}

export default Guidance;
