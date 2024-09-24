import h from 'preact';
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { AppBar, Button, MenuList, MenuListItem, Toolbar } from 'react95';
import Menu from './Menu'


function Header() {
    const { url } = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <AppBar>
            <Toolbar style={{ justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                    onClick={() => setOpen(!open)}
                    active={open}
                    style={{ fontWeight: 'bold' }}
                >
                    <img
                        src="src/assets/down-green-tri.png" 
                        alt='green-triangle'
                        style={{ height: '20px', marginRight: 4 }}
                    />
                    Start
                </Button>
                {open && ( <Menu /> )}
                <h1>First Night at the Opera?</h1>
            </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;