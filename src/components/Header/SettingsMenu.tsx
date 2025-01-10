import { MenuList, MenuListItem, Button } from "react95";
import styled from 'styled-components'; 
import { IoMdSettings, IoMdColorFill } from "react-icons/io";

import { useState } from "preact/hooks";
import { MdLanguage } from "react-icons/md";
import ThemeMenu from './ThemeMenu';

const StyledButton = styled(Button).attrs<any>({
    'data-testid': 'settings-button',
    'data-component': 'Header/SettingsButton',
})`
    align-items: center;
    font-weight: bold;
`;

const StyledMenuList = styled(MenuList).attrs<any>({
    'data-testid': 'menu-list',
    'data-component': 'Header/MenuList',
})`
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
`;

const StyledMenuListItem = styled(MenuListItem)`
    padding: 0.5rem 1rem;
    cursor: pointer;
    justify-content: flex-start;
    gap: 0.5rem;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.hoverBackground};
    }
`;

const StyledSettingsIcon = styled(IoMdSettings)`
    margin-right: 0.25rem;
    height: 1.25rem;
`;

function SettingsMenu(){
    const [open, setOpen] = useState(false);
    const [showThemeMenu, setShowThemeMenu] = useState(false);

    const handleThemeSelect = (theme: string) => {
        // Implement theme switching logic here
        console.log('Selected theme:', theme);
        setOpen(false);
        setShowThemeMenu(false);
    };

    return (
        <div>
            <StyledButton onClick={() => setOpen(!open)}>
                <StyledSettingsIcon /> Settings
            </StyledButton>
            {open && (
                <StyledMenuList>
                    <StyledMenuListItem 
                        onMouseEnter={() => setShowThemeMenu(true)}
                        onMouseLeave={() => setShowThemeMenu(false)}
                    >
                        <IoMdColorFill /> Select Theme
                        {showThemeMenu && <ThemeMenu onThemeSelect={handleThemeSelect} />}
                    </StyledMenuListItem>
                    <StyledMenuListItem>
                        <MdLanguage /> Regional Settings
                    </StyledMenuListItem>
                </StyledMenuList>
            )}
        </div>
    );
}

export default SettingsMenu;