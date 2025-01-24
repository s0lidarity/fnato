import { Button, MenuList, MenuListItem } from "react95";
import styled from 'styled-components';
import { useLingui } from '@lingui/react';

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

const localizations = [
    { name: 'English', emoji: '🇺🇸', locale: 'en' },
    { name: 'Français', emoji: '🇫🇷', locale: 'fr' },
    { name: 'Deutsch', emoji: '🇩🇪', locale: 'de' },
];

function LocalizationMenu({ onClose }: ThemeMenuProps) {
    const { i18n } = useLingui();

    const handleLocalizationSelect = async (localization: typeof localizations[0]) => {
        try {
            const catalog = await import(`../../locales/${localization.locale}/messages.ts`);
            i18n.load(localization.locale, catalog.messages);
            i18n.activate(localization.locale);
            if (onClose) onClose();
        } catch (error) {
            console.error(`Failed to load messages for locale ${localization.locale}:`, error);
        }
    };

    const renderButtons = () => {
        return localizations.map((l) => (
            <StyledMenuListItem key={l.name}>
                <StyledButton
                    active={i18n.locale === l.locale}
                    disabled={false}
                    onClick={() => handleLocalizationSelect(l)}
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
