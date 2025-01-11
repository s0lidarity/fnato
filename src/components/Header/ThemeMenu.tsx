import { MenuList, MenuListItem } from "react95";
import styled from 'styled-components';
import tokyoDark from 'react95/dist/themes/tokyoDark';
import windows1 from 'react95/dist/themes/windows1';
import polarized from 'react95/dist/themes/polarized';
import highContrast from 'react95/dist/themes/highContrast';
import hotDogStand from 'react95/dist/themes/hotDogStand';
import ninjaTurtles from 'react95/dist/themes/ninjaTurtles';
import matrix from 'react95/dist/themes/matrix';

import { useTheme } from '../../providers/Providers';


const StyledSubMenuList = styled(MenuList)`
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

const StyledMenuListItem = styled(MenuListItem)`
    padding: 0.5rem 1rem;
    cursor: pointer;
    justify-content: flex-start;
    gap: 0.5rem;
    width: 100%;
    display: flex;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.hoverBackground};
    }
`;

interface ThemeMenuProps {
    onClose?: () => void; // Optional prop to close parent menu
}

// ajs start here, set theme properly

function ThemeMenu({ onClose }: ThemeMenuProps) {
    const { theme, setTheme } = useTheme();

    const handleThemeSelect = (selectedTheme: typeof tokyoDark) => {
        setTheme(selectedTheme);
        if (onClose) onClose();
    };

    // AJS start here, make these themes a collection an dmap over them
    return (
        <StyledSubMenuList>
            <StyledMenuListItem 
                onClick={() => handleThemeSelect(tokyoDark)}
                style={{ fontWeight: theme === tokyoDark ? 'bold' : 'normal' }}
            >
                Tokyo Dark
            </StyledMenuListItem>
            <StyledMenuListItem onClick={() => handleThemeSelect(windows1)}>
                Windows
            </StyledMenuListItem>
            <StyledMenuListItem onClick={() => handleThemeSelect(polarized)}>
                Polarized
            </StyledMenuListItem>
            <StyledMenuListItem onClick={() => handleThemeSelect(highContrast)}>
                High Contrast
            </StyledMenuListItem>
            <StyledMenuListItem onClick={() => handleThemeSelect(hotDogStand)}>
                Hot Dog Stand
            </StyledMenuListItem>
            <StyledMenuListItem onClick={() => handleThemeSelect(ninjaTurtles)}>
                Ninja Turtles
            </StyledMenuListItem>
            <StyledMenuListItem onClick={() => handleThemeSelect(matrix)}>
                Matrix
            </StyledMenuListItem>
        </StyledSubMenuList>
    );
}

export default ThemeMenu;
