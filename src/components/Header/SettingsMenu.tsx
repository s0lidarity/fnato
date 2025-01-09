import { MenuList, MenuListItem } from "react95";
import styled from 'styled-components'; 
import { IoMdSettings } from "react-icons/io";

const StyledMenuList = styled(MenuList).attrs<any>({
    'data-testid': 'menu-list',
    'data-component': 'Header/MenuList',
})`
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
`;

function SettingsMenu({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
    return (
        <StyledMenuList>
            <MenuListItem>
                <IoMdSettings />
                Settings
            </MenuListItem>
        </StyledMenuList>
    );
}

export default SettingsMenu;