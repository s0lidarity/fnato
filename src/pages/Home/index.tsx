import h from 'preact';
import styled from 'styled-components';
import { Frame } from 'react95';
import DGLogo from '../../assets/DG_logo.webp';

const Wrapper = styled.div`
7  padding: 5rem;
8  background: ${({ theme }) => theme.material};
9  #default-buttons button {
10    margin-bottom: 1rem;
11    margin-right: 1rem;
12  }
13
14  #cutout {
15    background: ${({ theme }) => theme.canvas};
16    padding: 1rem;
17    width: 300px;
18  }
19`;

const Logo = styled.img`
    width: 200px;
    height: auto;
    margin-bottom: 2rem;
`;

const Description = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
`;

export function Home() {
	return (
        <Wrapper>
            <Frame 
                variant="outside"
                shadow
                style={{ padding: '0.5rem', lineHeight: '1.5', minWidth: 600, maxWidth: '90%' }}>
                <Description>
                    Memento Mori.
                </Description>
                <Logo src={DGLogo} alt="Scienta Mors Est" />
                <Description>
                    We all must die. We're fighting a war against the inevitable. And it's a war we're going to lose. But we're going to win the battles. We're going to make the bastards work for it. We're going to make them take ground inch by inch. And we're going to make them bleed for every inch they take.
                </Description>
                <Description>
                    Do you close your eyes to what you’ve seen and go back to sleep? Or do you come with this psycho burnout and do the impossible against the unbelievable and keep the future at bay for another day?
                </Description>
                <Description>
                    Tell me a little bit about yourself, agent. What's your deal?
                </Description>
                <Frame
                    variant='well'
                    style={{ marginTop: '1rem', padding: '0.25rem 0.25rem', width: '100%' }}>
                        What happens at the opera stays here. Not that anyone would believe you though. 
                </Frame>
            </Frame>
        </Wrapper>
    )
};

export default Home;