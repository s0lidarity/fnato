import h from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { AppBar, Button, MenuList, MenuListItem, Toolbar } from 'react95';
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

function Header() {
    const { url } = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <HeaderWrapper>
            <AppBar style={{zIndex: 10}}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Button
                        onClick={() => setOpen(!open)}
                        active={open}
                        style={{ fontWeight: 'bold' }}
                    >
                        <img
                            src={ DownGreenTri }
                            alt='green-triangle'
                            style={{ height: '20px', marginRight: 4 }}
                        />
                        Start
                    </Button>
                    {open && ( <Menu open setOpen={setOpen} /> )}
                    <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', margin: '0 auto' }}>First Night at the Opera?</h1>
                </div>
                </Toolbar>
            </AppBar>
        </HeaderWrapper>
    );
}

export default Header;