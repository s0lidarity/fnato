import { Button, MenuList, MenuListItem } from "react95";
import styled from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';
import windows1 from 'react95/dist/themes/windows1';
import polarized from 'react95/dist/themes/polarized';
import highContrast from 'react95/dist/themes/highContrast';
import hotDogStand from 'react95/dist/themes/hotDogStand';
import ninjaTurtles from 'react95/dist/themes/ninjaTurtles';
import matrix from 'react95/dist/themes/matrix';

import { useTheme } from '../../providers/Providers';


const StyledSubMenuList = styled(MenuList).attrs<any>({
    'data-testid': 'sub-menu-list',
    'data-component': 'Header/SubMenuList',
})`
    position: absolute;
    right: 100%;
    top: -6px;
    z-index: 1010;
    min-width: 150px;
    display: block;
    background: ${({ theme }) => theme.material};
    border: 2px solid ${({ theme }) => theme.borderDark};
    box-shadow: 1px 1px 0 1px ${({ theme }) => theme.borderLight};
`;

const StyledMenuListItem = styled(MenuListItem).attrs<any>({
    'data-testid': 'menu-list-item',
    'data-component': 'Header/MenuListItem',
})`
    cursor: pointer;
    justify-content: flex-start;
    width: 100%;
    display: flex;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.hoverBackground};
    }
`;

const StyledButton = styled(Button).attrs<any>({
    'data-testid': 'button',
    'data-component': 'Header/Button',
})`
    width: 100%;
`;

interface ThemeMenuProps {
    onClose?: () => void; // Optional prop to close parent menu
}

const themes = [
    { name: 'Tokyo Dark', theme: tokyoDark },
    { name: 'Windows', theme: windows1 },
    { name: 'Polarized', theme: polarized },
    { name: 'High Contrast', theme: highContrast },
    { name: 'Hot Dog Stand', theme: hotDogStand },
    { name: 'Ninja Turtles', theme: ninjaTurtles },
    { name: 'Matrix', theme: matrix },
];

// ajs start here, set theme properly

function ThemeMenu({ onClose }: ThemeMenuProps) {
    const { theme, setTheme } = useTheme();

    const handleThemeSelect = (selectedTheme: typeof tokyoDark) => {
        setTheme(selectedTheme);
        if (onClose) onClose();
    };

    const renderButtons = () => {
        return themes.map((t) => (
            <StyledMenuListItem key={theme.name}>
                <StyledButton
                    disabled={theme === t.theme}
                    active={theme === theme}
                    onClick={() => handleThemeSelect(t.theme)}
                >
                    {t.name}
                </StyledButton>
            </StyledMenuListItem>
        ));
    };

    // AJS start here, make these themes a collection an dmap over them
    return (
        <StyledSubMenuList>
            {renderButtons()}
        </StyledSubMenuList>
    );
}

export default ThemeMenu;
