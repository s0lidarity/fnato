// src/components/Accordion.tsx
import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { Anchor } from 'react95';

export type AccordionConfigItem = {
        id: string;
        label: string;
        icon: JSX.Element;
        href?: string;
        content?: JSX.Element;
};

export type AccordionConfig = AccordionConfigItem[];

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: ${({ theme }) => theme.material};
    border-bottom: ${({ theme }) => theme.border};
    cursor: pointer;
`;

const DescriptionContainer = styled.div`
    padding: 0.75rem;
    background: ${({ theme }) => theme.canvas};
    border: ${({ theme }) => theme.border};
    white-space: pre-wrap;
    overflow-wrap: break-word;
    width: 100%;
    box-sizing: border-box;
`;

function Accordion({ items }: { items: AccordionConfig }) {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (newIndex) => {
        setExpandedIndex((currentExpandedIndex) => {
            if(currentExpandedIndex === newIndex) {
                return -1;
            } else {
                return newIndex;
            }
        });
    };

    const renderedItems = items.map((item, index) => {
        const isExpandable = !!item.content;
        return (
            <div key={index}>
                <ItemContainer onClick={() => isExpandable && handleClick(index)}>
                    <span style={{ marginRight: '0.5rem'}}>{item.icon}<Anchor href={item.href}> {item.label}</Anchor></span>
                    {isExpandable && <div>{expandedIndex === index ? '-' : '+'}</div>}
                </ItemContainer>
                {expandedIndex === index && isExpandable && <DescriptionContainer>{item.content}</DescriptionContainer>}
            </div>
        );
    });

    return (
        <div>{renderedItems}</div>
    );
};

export default Accordion;