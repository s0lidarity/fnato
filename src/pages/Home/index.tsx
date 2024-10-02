import h from 'preact';
import styled from 'styled-components';
import { Frame } from 'react95';
import DGLogo from '../../assets/DG_logo.png';

const Wrapper = styled.div`
    padding: 5rem;
    background: ${({ theme }) => theme.canvas};
    z-index: 5;
    #default-buttons button {
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    #cutout {
        background: ${({ theme }) => theme.canvas};
        padding: 1rem;
    width: 300px;
    }
`;

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
                    We're fighting a war against the inevitable. And it's a war we're going to lose. But we're going to win the battles. We're going to make the bastards work for it. We're going to make them take ground inch by inch. And we're going to make them bleed for every inch they take.
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
                        What happens at the opera stays here. Not that anyone outside of the organization would believe you though. 
                </Frame>
            </Frame>
        </Wrapper>
    )
};

export default Home;