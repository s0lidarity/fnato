import styled from 'styled-components';
import { version } from '../../../package.json';

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    color: ${({ theme }) => theme.headerText};
`;

const VersionText = styled.span`
    font-size: 0.8rem;
`;

function Footer() {
    return (
        <FooterWrapper>
            <VersionText>v{version}</VersionText>
        </FooterWrapper>
    );
}

export default Footer;