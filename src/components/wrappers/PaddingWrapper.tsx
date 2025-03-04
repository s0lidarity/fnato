import { h } from 'preact';
import styled from 'styled-components';

// Create a styled div that handles the noPadding prop
const StyledPaddingDiv = styled.div.attrs<any>({
  'data-testid': 'padding-wrapper',
  'data-component': 'wrappers/PaddingWrapper'
})`
  padding: ${props => props.$noPadding ? '0' : '1rem'};
`;

// Props interface for our wrapper
interface PaddingWrapperProps {
  noPadding?: boolean;
  [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts noPadding to $noPadding
function PaddingWrapper({ noPadding, ...props }: PaddingWrapperProps) {
  return <StyledPaddingDiv $noPadding={noPadding} {...props} />;
}

export default PaddingWrapper; 