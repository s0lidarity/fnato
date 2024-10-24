import styled from 'styled-components';

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
            <VersionText>v{import.meta.env.VITE_APP_VERSION}</VersionText>
        </FooterWrapper>
    );
}

export default Footer;