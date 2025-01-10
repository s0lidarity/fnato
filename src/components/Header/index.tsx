import { AppBar, Toolbar } from 'react95';
import styled from 'styled-components';
import NavigationMenu from './NavigationMenu';
import SettingsMenu from './SettingsMenu';

const HeaderWrapper = styled.div.attrs<any>({
    'data-testid': 'header-wrapper',
    'data-component': 'Header/HeaderWrapper',
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 3rem;
`;

const StyledAppBar = styled(AppBar).attrs<any>({
    'data-testid': 'app-bar',
    'data-component': 'Header/AppBar',
})`
    z-index: 10;
`;

const StyledToolbar = styled(Toolbar).attrs<any>({
    'data-testid': 'toolbar',
    'data-component': 'Header/Toolbar',
})`
    justify-content: space-between;
`;

const ToolbarContent = styled.div.attrs<any>({
    'data-testid': 'toolbar-content',
    'data-component': 'Header/ToolbarContent',
})`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const HeaderTitle = styled.h1.attrs<any>({
    'data-testid': 'header-title',
    'data-component': 'Header/HeaderTitle',
})`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
`;

function Header() {
    return (
        <HeaderWrapper>
            <StyledAppBar>
                <StyledToolbar>
                    <ToolbarContent>
                        <NavigationMenu />
                        <HeaderTitle>First Night at the Opera?</HeaderTitle>
                        <SettingsMenu />
                    </ToolbarContent>
                </StyledToolbar>
            </StyledAppBar>
        </HeaderWrapper>
    );
}

export default Header;
