import h from 'preact';
import styled from 'styled-components';
import { useState, useCallback } from 'preact/hooks';
import { Anchor, Frame, GroupBox, TreeLeaf, TreeView } from 'react95';

const Wrapper = styled.div`
    background: ${({ theme }) => theme.material};
    padding: 5rem;

    #cutout {
        background: ${({ theme }) => theme.canvas};
        padding: 1rem;
        width: 250px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
`;

const Panel = styled.div`
    padding: 2rem;
`;

const aboutTree = [
    {
        id: 'theAuthor',
        label: 'The Author',
        icon: <>🖊️</>,
        items: [
            {
                id: 'gitHub',
                label: 'GitHub',
                // <Anchor href="https://github.com/s0lidarity/fnato" target={'_blank'}>
                icon: <>🐙</>,
            },
            {
                id: 'linkedIn',
                label: 'LinkedIn',
                // <Anchor href="https://www.linkedin.com/in/andrew-sobiesiak/" target={'_blank'}>
                icon: <>🔗</>,
            }
        ]
    },
    {
        id: 'theGame',
        label: 'Delta Green',
        icon: <>⟁</>,
        items: [
            {
                id: 'learnMore',
                label: 'What is Delta Green?',
                // <Anchor href="https://www.delta-green.com/what-is-delta-green/" target={'_blank'}>
                icon: <>👽</>,
            }
        ]
    },
];

const allIds: string[] = [];

function getIds(item: TreeLeaf<string>) {
    allIds.push(item.id);
    item.items?.forEach(getIds);
}

aboutTree.forEach(getIds);


export function About() {
    // const [selected, setSelected] = useState(null);
    // const [expanded, setExpanded] = useState([]);

    // const handleExpandClick = useCallback(() => {
    //     setExpanded(oldExpanded => (oldExpanded.length === 0 ? allIds : []));
    // }, []);

	return (
        <Panel>
            
                <GroupBox label='About'>
                    <div style={{ minWidth: '250px', maxWidth: '90%'}}>
                        <TreeView tree={aboutTree} />
                    </div>
                </GroupBox>
        </Panel>
    )
};

export default About;