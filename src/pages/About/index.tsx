import h from 'preact';
import styled from 'styled-components';
import { Anchor, GroupBox } from 'react95';
import Accordion from '../../components/Accordion/Accordion';
import { PageWrapper } from '../../components/SharedStyles';

const GroupBoxContainer = styled.div`
    margin: 1rem;
    width: clamp(500px, 80%, 800px);
    margin: 0.5rem;
`;

const Content = styled.div`
    padding: 0.5rem;
    background: ${({ theme }) => theme.canvas};
    border: ${({ theme }) => theme.border};
    white-space: pre-wrap;
    overflow-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    li {
        padding-left: 1rem;
    }
`;

const Spoiler = styled.span`
    background-color: black;
    color: black;
    cursor: pointer;
    &:hover {
        color: white;
    }
`;

const authorConfig = [
    {
        id: 'gitHub',
        label: 'GitHub',
        href: "https://github.com/s0lidarity/fnato",
        icon: <>🐙</>,
        content: <Content>Take a peek behind the curtain. Feel free to:
            <ul>
                <li>report an <Anchor href="https://github.com/s0lidarity/fnato/issues/new">issue </Anchor></li>
                <li>leave <Anchor href="https://github.com/s0lidarity/fnato/discussions">feedback/feature requests</Anchor></li>
                <li>or ⭐️ Star the project to give my ego a boost.</li>
            </ul>
        </Content>
    },
    {
        id: 'linkedIn',
        label: 'LinkedIn',
        href: "https://www.linkedin.com/in/andrew-sobiesiak/",
        icon: <>🔗</>,
    },
    {
        id: 'bio',
        label: 'Declassified Record',
        icon: <>📓</>,
        content: <Content>Andrew Sobiesiak is a Software Engineer that has played TTRPGs online weekly since
            2017.<br /> He would make a terrible field agent but is prepared to fight the sisyphean cosmic war.
            He Lives in <Spoiler>Seattle, WA</Spoiler> with his <Spoiler>wife, 5 cats, and a dog</Spoiler></Content>
    },
    {
        id: 'coffee',
        label: 'Support',
        icon: <>☕</>,
        href: "https://ko-fi.com/sobiesapps",
        content: <Content>If you want to support this work, you can buy the developer <Spoiler>Happiness</Spoiler>
            by with financial contributions through Ko-fi.</Content>
    }
];

const dgConfig = [
    {
        id: 'learnMore',
        label: 'What is Delta Green?',
        href: "https://www.delta-green.com/what-is-delta-green/",
        icon: <>👽</>,
        content: <Content>If the intelligence community was a family, Delta Green would be the uncle nobody talks about.
            <br />Delta Green is a Table Top Role Playing Game that uses a D100 system. Handlers run operations for
            their agents, other players, where a grey government operation works to protect the world from unkown
            cosmic horrors.</Content>,
    },
    {
        id: 'publisher',
        label: 'Arc Dream Publishing',
        href: "https://arcdream.com/home/",
        icon: <>📚</>,
        content: <Content>Arc Dream Publishing is a small-press publisher that produces high-quality games, including
            roleplaying games, a horror gaming magazine, and card games. Some of their popular works include Delta
            Green, Swords & Sorceries, and The Black Company RPG.</Content>,
    },
    {
        id: 'drivethru',
        label: 'DriveThruRPG',
        href: "https://www.drivethrurpg.com/en/product/181674/delta-green-agent-s-handbook",
        icon: <>🚗</>,
        content: <Content>Visit DriveThruRPG to purchase Delta Green source materials and learn more.</Content>,
    }
];

export function About() {
    return (
        <>
            <PageWrapper>
                <GroupBoxContainer>
                    <GroupBox label='About the Author'>
                        <Accordion items={authorConfig} />
                    </GroupBox>
                </GroupBoxContainer>
                <GroupBoxContainer>
                    <GroupBox label='About the Game'>
                        <Accordion items={dgConfig} />
                    </GroupBox>
                </GroupBoxContainer>
            </PageWrapper>
        </>
    )
};

export default About;