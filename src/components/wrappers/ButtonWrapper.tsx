import { h } from 'preact';
import { Button } from 'react95';
import styled from 'styled-components';

// Create a styled wrapper for Button that handles the primary and square props
const StyledButton = styled(Button).attrs<any>({
  'data-testid': 'button-wrapper',
  'data-component': 'wrappers/ButtonWrapper'
})`
  ${props => props.$primary ? 'font-weight: bold;' : ''}
  ${props => props.$square ? 'aspect-ratio: 1;' : ''}
`;

// Props interface for our wrapper
interface ButtonWrapperProps {
  primary?: boolean;
  square?: boolean;
  [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts props to $ prefixed props
function ButtonWrapper({ primary, square, ...props }: ButtonWrapperProps) {
  return <StyledButton $primary={primary} $square={square} {...props} />;
}

export default ButtonWrapper; 