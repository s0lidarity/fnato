import h from 'preact';
import { useLocation } from 'preact-iso';

function Header() {
    const { url } = useLocation();

    return (
        <header>
            <h1>First Night at the Opera?</h1>
            <nav>
                <a href="/" class={url == '/' && 'active'}>Home</a>
                <a href="/about">About</a>
            </nav>
        </header>
    );
}

export default Header;