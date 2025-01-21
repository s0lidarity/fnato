import styled from 'styled-components';
import { Anchor, Frame } from 'react95';
import { Trans } from '@lingui/react/macro';

import ALT_DG_LOGO from "../../assets/Triangle-placeholder.jpg"
import PageWrapper from '../../components/SharedStyles/PageWrapper';

const TextWrapper = styled.div`
    padding: 1rem;
    margin: 1rem;
    background: ${({ theme }) => theme.material};
    font-size: 1.2rem;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 2rem;
`;

const Blurb = styled.p`
    text-align: left;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    text-align: center; 
    font-size: 2rem;
`;

export function Home() {

	return (
        <PageWrapper>
                <Frame 
                    variant="outside"
                    shadow>
                    <TextWrapper>
                        <Trans>
                            <Title>
                                Memento Mori.
                            </Title>
                        </Trans>
                        <LogoContainer><Logo src={ALT_DG_LOGO} alt="Scienta Mors Est" /></LogoContainer>
                        <Blurb>
                            <Trans>
                                We're fighting a war against the inevitable. And it's a war we're going to lose. 
                                But we're going to win the battles. We're going to make the bastards work for it. 
                                We're going to make them take ground inch by inch. And we're going to make them 
                                bleed for every inch they take.
                            </Trans>
                        </Blurb>
                        <Blurb>
                            <Trans>
                                Do you close your eyes to what you’ve seen and go back to sleep? Or do you come 
                                with this psycho burnout and do the impossible against the unbelievable and keep the 
                                future at bay for another day?
                            </Trans>
                        </Blurb>
                        <Blurb>
                            <Trans>
                                Meet me at <Anchor href="/crucible">The Crucible</Anchor> and tell me a little bit about yourself, agent. What's your deal?
                            </Trans>
                        </Blurb>
                        <Frame
                            variant='well'
                            style={{ marginTop: '1rem', padding: '0.25rem 0.25rem', width: '100%' }}>
                            <Trans>
                                What happens at the opera stays here. Not that anyone outside of the organization would believe you though. 
                            </Trans>
                        </Frame>
                    </TextWrapper>
                </Frame>
        </PageWrapper>
    )
};

export default Home;