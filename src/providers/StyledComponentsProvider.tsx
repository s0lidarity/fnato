import { h } from 'preact';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import type { ComponentChildren } from 'preact';

// List of custom props that should not be forwarded to DOM elements
const customProps = [
    'fixed',
    'position',
    'noPadding',
    'active',
    'fullWidth',
    'primary',
    'square',
    'variant',
    'shadow',
    'skillCount',
    'isMultiRow',
    'show',
    'invert'
];

// Custom shouldForwardProp function that filters out our custom props
const shouldForwardProp = (prop: string) => {
  // First check if it's a valid DOM prop
    if (!isPropValid(prop)) {
        return false;
    }

  // Then check if it's one of our custom props
    if (customProps.includes(prop)) {
        return false;
    }

  // Otherwise, forward the prop
    return true;
};

interface StyledComponentsProviderProps {
    children: ComponentChildren;
}

function StyledComponentsProvider({ children }: StyledComponentsProviderProps) {
    return (
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            {children}
        </StyleSheetManager>
    );
}

export default StyledComponentsProvider; 