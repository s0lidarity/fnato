// src/components/Accordion.tsx
import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import { Anchor } from 'react95';
import { i18n, MessageDescriptor } from '@lingui/core';

export type AccordionConfigItem = {
    id: string;
    label: string;
    labelMsg?: MessageDescriptor;
    icon: JSX.Element;
    href?: string;
    content?: JSX.Element;
};

export type AccordionConfig = AccordionConfigItem[];

const AccordionWrapper = styled.div`
    display: block;
    align-items: center;
    position: relative;
    padding: 1rem;
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: ${({ theme }) => theme.flatDark};
    border-bottom: ${({ theme }) => theme.border};
    cursor: pointer;
    box-sizing: border-box;
    
    &.accordion-item {
        cursor: url('/assets/cursors/VerticalExpand.cur'), pointer;
    }
`;

const IconWrapper = styled.span`
    margin-right: 0.5rem;
`;

const ContentContainer = styled.div`
    padding-left: 1rem;
    background: ${({ theme }) => theme.canvas};
    box-sizing: border-box;
    border-color: ${({ theme }) => theme.flatDark};
    border-style: solid;
    border-width: 0.25rem;
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

    const getItemLabel = (item: AccordionConfigItem) => {
        if(item.labelMsg) {
            return i18n._(item.labelMsg.id)
        }
        return item.label;
    };

    const renderedItems = items.map((item, index) => {
        const isExpandable = !!item.content;
        return (
            <div key={index}>
                <ItemContainer onClick={() => isExpandable && handleClick(index)} className="accordion-item">
                    <span style={{ marginRight: '0.5rem' }}>
                        <IconWrapper>{item.icon}</IconWrapper>
                        {item.href ? (<Anchor href={item.href}> {getItemLabel(item)}</Anchor>) : (getItemLabel(item))}
                    </span>
                    {isExpandable && <div>{expandedIndex === index ? '-' : '+'}</div>}
                </ItemContainer>
                <ContentContainer>
                    {expandedIndex === index && isExpandable && item.content}
                </ContentContainer>
            </div>
        );
    });

    return (
        <AccordionWrapper>{renderedItems}</AccordionWrapper>
    );
};

export default Accordion;