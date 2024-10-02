import h from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { AppBar, Button, MenuList, MenuListItem, Toolbar } from 'react95';
import Menu from './Menu';
import DownGreenTri from '../../assets/down-green-tri.png';


function Header() {
    const { url } = useLocation();
    const [open, setOpen] = useState(false);

    return (
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
                {open && ( <Menu /> )}
                <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', margin: '0 auto' }}>First Night at the Opera?</h1>
            </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;