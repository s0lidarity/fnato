import { useState } from 'preact/hooks';
import { AppBar, Button, Toolbar } from 'react95';
import styled from 'styled-components';
import Menu from './Menu';
import DownGreenTri from '../../assets/down-green-tri.png';
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

const StyledButton = styled(Button).attrs<any>({
    'data-testid': 'button',
    'data-component': 'Header/Button',
})`
    font-weight: bold;
`;

const TriangleIcon = styled.img.attrs<any>({
    'data-testid': 'triangle-icon',
    'data-component': 'Header/TriangleIcon',
})`
    height: 1.25rem;
    margin-right: 0.25rem;
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
    const [open, setOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <HeaderWrapper>
            <StyledAppBar>
                <StyledToolbar>
                    <ToolbarContent>
                        <StyledButton
                            onClick={() => setOpen(!open)}
                            active={open}
                        >
                            <TriangleIcon
                                src={DownGreenTri}
                                alt='green-triangle'
                            />
                            Start
                        </StyledButton>
                        {open && ( <Menu open setOpen={setOpen} /> )}
                        <HeaderTitle>First Night at the Opera?</HeaderTitle>
                        <SettingsMenu />
                    </ToolbarContent>
                </StyledToolbar>
            </StyledAppBar>
        </HeaderWrapper>
    );
}

export default Header;
