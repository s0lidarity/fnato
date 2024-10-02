import h from 'preact';
import styled from 'styled-components';
import { GroupBox } from 'react95';
import Accordion from '../../components/Accordion/Accordion';

const GroupBoxContainer = styled.div`
    margin: 1rem;
    minWidth: 250px;
    maxWidth: 90%;
`;

const Panel = styled.div`
    padding: 2rem;
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
        content: <>Take a peek behind the curtain.</>,
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
        content: <>Andrew Sobiesiak is a Software Engineer that has played TTRPGs online weekly since 2017.\n He would make a terrible field agent but is prepared to fight the sisyphean cosmic war. \nHe Lives in <Spoiler>Seattle, WA</Spoiler> with his <Spoiler>wife, 5 cats, and a dog</Spoiler></>
    },
    {
        id: 'coffee',
        label: 'Ko-fi',
        icon: <>☕</>,
        href: "https://ko-fi.com/sobiesapps",
        content: <>If you want to support his work, you can buy him <Spoiler>Happiness</Spoiler></>,
    }
];

const dgConfig = [
    {
        id: 'learnMore',
        label: 'What is Delta Green?',
        href: "https://www.delta-green.com/what-is-delta-green/",
        icon: <>👽</>,
        content: <>If the intelligence community was a family, Delta Green would be the uncle nobody talks about.</>, 
    },
    {
        id: 'publisher',
        label: 'Arc Dream Publishing',
        href: "https://arcdream.com/home/",
        icon: <>📚</>,
        content: <>The publisher behind Delta Green.</>,
    },
    {
        id: 'drivethru',
        label: 'DriveThruRPG',
        href: "https://www.drivethrurpg.com/en/product/181674/delta-green-agent-s-handbook",
        icon: <>🚗</>,
        content: <>Visit DriveThruRPG to purchase Delta Green source materials and learn more.</>,
    }
];

export function About() {
	return (
        <Panel>
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
        </Panel>
    )
};

export default About;