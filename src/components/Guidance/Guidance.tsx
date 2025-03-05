import { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { Window, WindowContent, WindowHeader } from 'react95';
import styled from 'styled-components';
import { FaRegWindowMinimize } from "react-icons/fa";
import { FaWindowMaximize } from "react-icons/fa6";

import { ButtonWrapper as Button } from '../wrappers';

// AJS: TOOD Make the width stay consistent instead of shrinking when minimized
const GuidanceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1rem 0;
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    min-width: 200px;
    box-shadow: inset 1px 1px 0px 1px rgba(255, 255, 255, 0.75),
                inset -1px -1px 0px 1px rgba(0, 0, 0, 0.25);
`;

const StyledButtonText = styled.div`
    text-align: center;
`;

const StyledMaximizeIcon = styled(FaWindowMaximize)`
    color: ${({ theme }) => theme.canvasTextInvert};
    width: 16px;
    height: 16px;
`;

const ExpandedContainer = styled.div`
    width: 90%;
`;

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

const StyledMinButton = styled(Button)`
    display: flex;
    margin-top: 0.25rem;
    margin-right: 1px;
    align-items: center;
    align-self: center;
`;

interface GuidanceProps {
    title: string;
    buttonText: string;
    children: ComponentChildren;
}

function Guidance({ title, buttonText, children }: GuidanceProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <GuidanceContainer>
            {!isOpen ? (
                <StyledButton onClick={() => setIsOpen(true)}>
                    <StyledButtonText>{buttonText}</StyledButtonText>
                    <StyledMaximizeIcon />
                </StyledButton>
            ) : (
                <ExpandedContainer>
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
                </ExpandedContainer>
            )}
        </GuidanceContainer>
    );
}

export default Guidance;
