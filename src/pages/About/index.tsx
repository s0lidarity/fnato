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
        content: <>Andrew Sobiesiak is a Software Engineer that has played TTRPGs online weekly since 2017.\n He would make a terrible field agent but is prepared to fight the sisyphean cosmic fight. \nHe Lives in <Spoiler>Seattle, WA</Spoiler> with his wife, 5 cats, and a dog. \nIf you want to support his work, you can buy him <Spoiler>Happiness</Spoiler></>,
    },
    {
        id: 'coffee',
        label: 'Ko-fi',
        icon: <>☕</>,
        href: "https://ko-fi.com/sobiesapps",
    }
];

const dgConfig = [
    {
        id: 'learnMore',
        label: 'What is Delta Green?',
        href: "https://www.delta-green.com/what-is-delta-green/",
        icon: <>👽</>,
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