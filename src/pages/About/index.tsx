import styled from 'styled-components';
import { Anchor } from 'react95';
import { Trans } from '@lingui/react/macro';
import { t, msg } from '@lingui/core/macro';
import { GroupBox } from 'react95';

import Accordion from '../../components/Accordion/Accordion';
import { PageWrapper } from '../../components/SharedStyles';

const GroupBoxContainer = styled.div.attrs<any>({
    'data-component': 'About/GroupBoxContainer',
    'data-testid': 'group-box-container',

})`
    margin: 1rem;
    padding: 0.5rem;
    width: 95%;
`;

const Content = styled.div.attrs<any>({
    'data-component': 'About/Content',
    'data-testid': 'content',
})`
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
    a {
        cursor: pointer;
    }
    user-select: text;
    cursor: text;
`;

const Spoiler = styled.span.attrs<any>({
    'data-component': 'About/Spoiler',
    'data-testid': 'spoiler',
})`
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
        content: <Content>
            <Trans>
                Take a peek behind the curtain. Feel free to:
                <ul>
                    <li>report an <Anchor href="https://github.com/s0lidarity/fnato/issues/new">issue </Anchor></li>
                    <li>leave <Anchor href="https://github.com/s0lidarity/fnato/discussions">feedback/feature requests</Anchor></li>
                    <li>or ⭐️ Star the project to give the author ego a boost.</li>
                </ul>
            </Trans>
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
        labelMsg: msg({
            message: 'Declassified Record',
        }),
        icon: <>📓</>,
        content: <Content>
            <Trans>
                Andrew Sobiesiak is a Software Engineer that has played TTRPGs online weekly since
                2017.<br /> He would make a terrible field agent but is prepared to fight the sisyphean cosmic war.
                He Lives in <Spoiler>Seattle, WA</Spoiler> with his <Spoiler>wife, 5 cats, and a dog</Spoiler>
            </Trans>
        </Content>
    },
    {
        id: 'coffee',
        label: 'Support',
        labelMsg: msg({
            message: 'Support',
        }),
        icon: <>☕</>,
        content: <Content>
            <Trans>
                If you want to support this work, you can buy some Delta Green content through affiliate links.
            </Trans>
        </Content>
    }
];

const dgConfig = [
    {
        id: 'learnMore',
        label: 'What is Delta Green?',
        labelMsg: msg({
            message: 'What is Delta Green?',
        }),
        href: "https://www.delta-green.com/what-is-delta-green/",
        icon: <>👽</>,
        content: <Content>
            <Trans>
                If the intelligence community was a family, Delta Green would be the uncle nobody talks about.
                <br />Delta Green is a Table Top Role Playing Game that uses a D100 system. Handlers run operations for
                their agents, other players, where a grey government operation works to protect the world from unkown
                cosmic horrors.
            </Trans>
        </Content>,
    },
    {
        id: 'publisher',
        label: 'Arc Dream Publishing',
        href: "https://arcdream.com/home/",
        icon: <>📚</>,
        content: <Content>
            <Trans>
                Arc Dream Publishing is a small-press publisher that produces high-quality games, including
                roleplaying games, a horror gaming magazine, and card games. Some of their popular works include Delta
                Green, Swords & Sorceries, and The Black Company RPG.
            </Trans>
        </Content>,
    },
    {
        id: 'drivethru',
        label: 'DriveThruRPG',
        href: "https://www.drivethrurpg.com/en/product/181674/delta-green-agent-s-handbook&affiliate_id=1343326",
        icon: <>🚗</>,
        content: <Content>
            <Trans> 
                Visit</Trans> DriveThruRPG <Trans>to purchase Delta Green source materials and learn more.
            </Trans>
        </Content>,
    }
];

export function About() {

    const aboutMessage = t`About the Game`;
    const aboutAuthorMessage = t`About the Author`;
    return (
        <>
            <PageWrapper>
                <GroupBoxContainer>
                    <GroupBox label={aboutMessage}>
                        <Accordion items={dgConfig} />
                    </GroupBox>
                </GroupBoxContainer>
                <GroupBoxContainer>
                    <GroupBox label={aboutAuthorMessage}>
                        <Accordion items={authorConfig} />
                    </GroupBox>
                </GroupBoxContainer>
            </PageWrapper>
        </>
    )
};

export default About;