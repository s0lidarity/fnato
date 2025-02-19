import styled from 'styled-components';
import { version } from '../../../package.json';
import DriveThruBanner from '../DriveThruBanner/DriveThruBanner';

const FooterWrapper = styled.div.attrs<any>({
    'data-testid': 'footer-wrapper',
    'data-component': 'Footer/Wrapper'
})`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    color: ${({ theme }) => theme.headerText};
`;

const VersionText = styled.span.attrs<any>({
    'data-testid': 'footer-version',
    'data-component': 'Footer/VersionText'
})`
    font-size: 0.8rem;
    margin-bottom: 1rem;
`;

function Footer() {
    return (
        <FooterWrapper>
            <DriveThruBanner />
            <VersionText>v{version}</VersionText>
        </FooterWrapper>
    );
}

export default Footer;