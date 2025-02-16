import { useLocation } from 'preact-iso';
import { useState } from 'preact/hooks';
import { MenuList, MenuListItem, StyledButton } from "react95";
import styled from 'styled-components';
import { Trans } from '@lingui/react/macro';
import { msg, t } from '@lingui/core/macro';
import { MessageDescriptor, i18n } from '@lingui/core';

import DownGreenTri from '../../assets/down-green-tri.png';

export interface MenuConfigItem {
    name: string;
    labelMsg?: MessageDescriptor;
    url: string;
    img: string;
}

export const MenuConfig: MenuConfigItem[] = [
    {
        name: t`Home`,
        labelMsg: msg({
            message: 'Home'
        }),
        url: '/',
        img: '🏠',
    },
    {
        name: t`About`,
        labelMsg: msg({
            message: 'About'
        }),
        url: '/about',
        img: '📖',
    },
    {
        name: t`The Crucible`,
        labelMsg: msg({
            message: 'The Crucible'
        }),
        url: '/crucible',
        img: '🫠',
    },
    {
        name: t`Summary`,
        labelMsg: msg({
            message: 'Summary'
        }),
        url: '/summary',
        img: '📊',
    },
];

const StyledMenuList = styled(MenuList)`
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    background: ${({ theme }) => theme.canvas};
    border: ${({ theme }) => theme.border};
    box-shadow: ${({ theme }) => theme.shadow};
`;

const StyledMenuListItem = styled(MenuListItem)`
    padding: 0.5rem 1rem;
    cursor: pointer;
    justify-content: flex-start;
    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.hoverBackground};
    }
    &.active {
        background-color: ${({ theme }) => theme.focusSecondary};
        color: ${({ theme }) => theme.progress};
    }
`;

const TriangleIcon = styled.img.attrs<any>({
    'data-testid': 'triangle-icon',
    'data-component': 'Header/TriangleIcon',
})`
    height: 1.25rem;
    margin-right: 0.25rem;
`;

const StyledMenu = styled.div.attrs<any>({
    'data-testid': 'menu',
    'data-component': 'Header/Menu',
})`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
`;

const IconWrapper = styled.span.attrs<any>({
    'data-testid': 'icon-wrapper',
    'data-component': 'Header/IconWrapper',
})`
    margin-right: 0.5rem;
`;

function NavigationMenu(){
    const [open, setOpen] = useState(false);
    const { url } = useLocation();

    return (
        <div>
            <StyledButton onClick={() => setOpen(!open)}>
                <TriangleIcon src={DownGreenTri} alt='green-triangle' /> <Trans>Start</Trans>
            </StyledButton>
            { open && (
                <StyledMenu>
                    <StyledMenuList open={open} onClick={() => setOpen(!open)}>
                        { MenuConfig.map((item) => (
                            <a href={item.url}>
                                <StyledMenuListItem onClick={()=> setOpen(false)} className={url === item.url ? 'active' : ''}>
                                        <IconWrapper role='img' aria-label={item.img}>
                                            {item.img}
                                        </IconWrapper>
                                        {item.labelMsg ? i18n._(item.labelMsg) : item.name}
                                </StyledMenuListItem>
                            </a>
                        ))}
                    </StyledMenuList>
                </StyledMenu>
            )}
        </div>
    );
};

export default NavigationMenu;