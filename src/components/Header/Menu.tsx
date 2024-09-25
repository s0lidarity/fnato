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
]

const StyledMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1001;
`;

function Menu() {
    const { url } = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <StyledMenu>
            <MenuList 
                style={{position: 'absolute', left: '0'}}
                open={open}
                onClick={() => setOpen(!open)}
            >
                { MenuConfig.map((item) => (
                    <MenuListItem>
                        <span role='img' aria-label={item.img}>
                            <a href={item.url} class={url === item.url && 'active'}>{item.name}</a>
                        </span>
                    </MenuListItem>
                ))}
            </MenuList>
        </StyledMenu>
    );
};

export default Menu;