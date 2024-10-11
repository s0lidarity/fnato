import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { MenuList, MenuListItem } from "react95";
import styled from 'styled-components';

export interface MenuConfigItem {
    name: string;
    url: string;
    img: string;
}

export const MenuConfig: MenuConfigItem[] = [
    {
        name: 'Home',
        url: '/',
        img: '🏠',
    },
    {
        name: 'About',
        url: '/about',
        img: '📖',
    },
    {
        name: 'The Crucible',
        url: '/crucible',
        img: '🫠',
    },
    {
        name: 'Summary',
        url: '/summary',
        img: '📊',
    },
];

const StyledMenuList = styled(MenuList)`
    list-style: none;
    padding: 0;
    margin: 0;
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

const StyledMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
`;

const IconWrapper = styled.span`
    margin-right: 0.5rem;
`;

function Menu({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
    const { url } = useLocation();

    return (
        <StyledMenu>
            <StyledMenuList 
                style={{position: 'absolute', left: '0'}}
                open={open}
                onClick={() => setOpen(!open)}
            >
                { MenuConfig.map((item) => (
                    <a href={item.url}>
                        <StyledMenuListItem onClick={()=> setOpen(false)} className={url === item.url ? 'active' : ''}>
                                <IconWrapper role='img' aria-label={item.img}>
                                    {item.img}
                                </IconWrapper>{item.name}
                        </StyledMenuListItem>
                    </a>
                ))}
            </StyledMenuList>
        </StyledMenu>
    );
};

export default Menu;