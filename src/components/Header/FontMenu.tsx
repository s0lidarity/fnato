import { MenuList, MenuListItem } from "react95";
import styled from 'styled-components';
import { useContext } from 'preact/hooks';
import { ThemeContext } from '../../providers/Providers';

const StyledSubMenu = styled(MenuList).attrs<any>({
    'data-testid': 'sub-menu-list',
    'data-component': 'Header/SubMenuList',
})`
    position: absolute;
    right: 100%;
    top: 0;
`;

const FontMenu = () => {
    const { fontFamily, setFontFamily } = useContext(ThemeContext);
    
    const fonts = [
        { label: 'MS Sans Serif', value: 'ms_sans_serif' },
        { label: 'System', value: 'system' },
        { label: 'Arial', value: 'arial' },
        { label: 'DeFonte', value: 'defonte' },
        { label: 'Upheaval', value: 'upheaval' },
        { label: 'OpenDyslexic', value: 'OpenDyslexic' },
    ];

    const handleFontChange = (value: string) => {
        setFontFamily(value as any);
    };

    return (
        <StyledSubMenu>
        {fonts.map((font) => (
            <MenuListItem
                key={font.value}
                onClick={() => handleFontChange(font.value as any)}
                style={{ 
                    fontWeight: fontFamily === font.value ? 'bold' : 'normal',
                    fontFamily: font.value
                }}
            >
                {font.label}
            </MenuListItem>
        ))}
        </StyledSubMenu>
    );
};

export default FontMenu;
