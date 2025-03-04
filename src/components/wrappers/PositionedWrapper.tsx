import { h } from 'preact';
import styled from 'styled-components';

// Create a styled div that handles the position and fixed props
const StyledPositionedDiv = styled.div.attrs<any>({
  'data-testid': 'positioned-wrapper',
  'data-component': 'wrappers/PositionedWrapper'
})`
  position: ${props => props.$position || 'relative'};
  ${props => props.$fixed ? 'position: fixed;' : ''}
`;

// Props interface for our wrapper
interface PositionedWrapperProps {
  position?: string;
  fixed?: boolean;
  [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts position and fixed to $ prefixed props
function PositionedWrapper({ position, fixed, ...props }: PositionedWrapperProps) {
  return <StyledPositionedDiv $position={position} $fixed={fixed} {...props} />;
}

export default PositionedWrapper; 