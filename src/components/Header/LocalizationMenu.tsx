import { useTranslation } from "preact-i18next";
import { Button, MenuList, MenuListItem } from "react95";
import styled from 'styled-components';

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

// ajs start here, bring in l10n from provider
const localizations = [
    { name: 'English', emoji: '🇺🇸' },
    { name: 'French', emoji: '🇫🇷' },
    { name: 'German', emoji: '🇩🇪' },
];

function LocalizationMenu({ onClose }: ThemeMenuProps) {
    const { t } = useTranslation();

    const handleLocalizationSelect = (l: any) => {
        console.log('localization selected', l.name);
        if (onClose) onClose();
    };

    const renderButtons = () => {
        return localizations.map((l) => (
            <StyledMenuListItem key={l.name}>
                <StyledButton
                    active={false}
                    disabled={false}
                    onClick={() => handleLocalizationSelect(l.name)}
                >
                    {l.emoji} {l.name}
                </StyledButton>
            </StyledMenuListItem>
        ));
    };

    return (
        <StyledSubMenuList>
            {renderButtons()}
        </StyledSubMenuList>
    );
}

export default LocalizationMenu;
