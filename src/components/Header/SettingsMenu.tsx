import { MenuList, MenuListItem, Button } from "react95";
import styled from 'styled-components'; 
import { IoMdSettings, IoMdColorFill } from "react-icons/io";
import { BiFontFamily } from "react-icons/bi";
import { Trans } from '@lingui/react/macro';

import { useState } from "preact/hooks";
import { MdLanguage } from "react-icons/md";
import ThemeMenu from './ThemeMenu';
import LocalizationMenu from "./LocalizationMenu";
import FontMenu from "./FontMenu";

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

const StyledMenuListItem = styled(MenuListItem).attrs<any>({
    'data-testid': 'menu-list-item',
    'data-component': 'Header/MenuListItem',
})`
    padding: 0.5rem 1rem;
    cursor: pointer;
    justify-content: flex-start;
    gap: 0.5rem;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.hoverBackground};
    }
`;

const StyledSettingsIcon = styled(IoMdSettings).attrs<any>({
    'data-testid': 'settings-icon',
    'data-component': 'Header/SettingsIcon',
})`
    margin-right: 0.25rem;
    height: 1.25rem;
`;

function SettingsMenu(){
    const [open, setOpen] = useState(false);
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [showLocalizationMenu, setShowLocalizationMenu] = useState(false);
    const [showFontMenu, setShowFontMenu] = useState(false);
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
                        <IoMdColorFill /> <Trans>Select Theme</Trans>
                        {showThemeMenu && <ThemeMenu />}
                    </StyledMenuListItem>
                    <StyledMenuListItem 
                        onMouseEnter={() => setShowFontMenu(true)}
                        onMouseLeave={() => setShowFontMenu(false)}
                    >
                        <BiFontFamily /> <Trans>Font Settings</Trans>
                        {showFontMenu && <FontMenu />}
                    </StyledMenuListItem>
                    <StyledMenuListItem 
                        onMouseEnter={() => setShowLocalizationMenu(true)}
                        onMouseLeave={() => setShowLocalizationMenu(false)}
                    >
                        <MdLanguage /> <Trans>Regional Settings</Trans>
                        {showLocalizationMenu && <LocalizationMenu />}
                    </StyledMenuListItem>
                </StyledMenuList>
            )}
        </div>
    );
}

export default SettingsMenu;