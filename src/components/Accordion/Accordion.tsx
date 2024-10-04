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

const AccordionWrapper = styled.div`
    width: clamp(300px, 80%, 800px);
    margin: 0 auto;
    @media (max-width: 768px) {
        width: clamp(200px, 80%, 600px);
    }
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0.75rem;
    background: ${({ theme }) => theme.material};
    border-bottom: ${({ theme }) => theme.border};
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
`;

const DescriptionContainer = styled.div`
    padding: 0.75rem;
    background: ${({ theme }) => theme.canvas};
    border: ${({ theme }) => theme.border};
    text-align: left;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    width: 100%;
    box-sizing: border-box;
`;

const IconWrapper = styled.span`
    margin-right: 0.5rem;
`;

function Accordion({ items }: { items: AccordionConfig }) {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (newIndex) => {
        setExpandedIndex((currentExpandedIndex) => {
            if (currentExpandedIndex === newIndex) {
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
                    <span style={{ marginRight: '0.5rem' }}>
                        <IconWrapper>{item.icon}</IconWrapper>
                        {item.href ? (<Anchor href={item.href}> {item.label}</Anchor>) : (item.label)}
                    </span>
                    {isExpandable && <div>{expandedIndex === index ? '-' : '+'}</div>}
                </ItemContainer>
                {expandedIndex === index && isExpandable && <DescriptionContainer>{item.content}</DescriptionContainer>}
            </div>
        );
    });

    return (
        <AccordionWrapper>{renderedItems}</AccordionWrapper>
    );
};

export default Accordion;