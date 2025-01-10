import { MenuList, MenuListItem, Button } from "react95";
import styled from 'styled-components'; 
import { IoMdSettings } from "react-icons/io";
import { useState } from "preact/hooks";

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

const StyledSettingsIcon = styled(IoMdSettings)`
    margin-right: 0.25rem;
    height: 1.25rem;
`;

function SettingsMenu(){
    const [open, setOpen] = useState(false);

    return (
        <div>
            <StyledButton onClick={() => setOpen(!open)}>
                <StyledSettingsIcon /> Settings
            </StyledButton>
            {open && (
                <StyledMenuList>
                    <MenuListItem>
                        
                    </MenuListItem>
                </StyledMenuList>
            )}
        </div>
    );
}

export default SettingsMenu;