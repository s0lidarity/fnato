import styled from 'styled-components';

const StyledBannerWrapper = styled.div.attrs<any>({
    'data-testid': 'drivethru-banner-wrapper',
    'data-component': 'DriveThruBanner/Wrapper'
})`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    max-width: 100%;
    overflow: hidden;
`;

const StyledBannerLink = styled.a.attrs<any>({
    'data-testid': 'drivethru-banner-link',
    'data-component': 'DriveThruBanner/Link'
})`
    display: block;
    max-width: 100%;
`;

const StyledBannerImage = styled.img.attrs<any>({
    'data-testid': 'drivethru-banner-image',
    'data-component': 'DriveThruBanner/Image'
})`
    max-width: 100%;
    height: auto;
`;

function DriveThruBanner() {
    return (
        <StyledBannerWrapper>
            <StyledBannerLink 
                href="https://legacy.drivethrurpg.com/browse.php?filters=0_0_220_0_0&src=affiliate1343326&affiliate_id=1343326"
                target="_blank"
                rel="noopener noreferrer"
            >
                <StyledBannerImage
                    src="https://legacy.drivethrurpg.com/themes/dtrpg/images/728X90Cthulhu.png"
                    alt="The best cosmic horror & Cthulhu Mythos @ DriveThruRPG.com"
                    title="The best cosmic horror & Cthulhu Mythos @ DriveThruRPG.com"
                />
            </StyledBannerLink>
        </StyledBannerWrapper>
    );
}

export default DriveThruBanner; 