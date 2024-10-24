import { useState } from 'preact/hooks';
import { AppBar, Button, Toolbar } from 'react95';
import styled from 'styled-components';
import Menu from './Menu';
import DownGreenTri from '../../assets/down-green-tri.png';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 3rem;
`;

const StyledAppBar = styled(AppBar)`
    z-index: 10;
`;

const StyledToolbar = styled(Toolbar)`
    justify-content: space-between;
`;

const ToolbarContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledButton = styled(Button)`
    font-weight: bold;
`;

const TriangleIcon = styled.img`
    height: 20px;
    margin-right: 4px;
`;

const HeaderTitle = styled.h1`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
`;

function Header() {
    const [open, setOpen] = useState(false);

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
                    </ToolbarContent>
                </StyledToolbar>
            </StyledAppBar>
        </HeaderWrapper>
    );
}

export default Header;
