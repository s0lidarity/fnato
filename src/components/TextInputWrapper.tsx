import { h } from 'preact';
import { TextInput } from 'react95';
import styled from 'styled-components';

// Create a styled wrapper for TextInput that handles the fullWidth prop
const StyledTextInput = styled(TextInput).attrs<any>({
    'data-testid': 'text-input-wrapper',
    'data-component': 'TextInputWrapper'
})`
    width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

// Props interface for our wrapper
interface TextInputWrapperProps {
    fullWidth?: boolean;
    [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts fullWidth to $fullWidth
function TextInputWrapper({ fullWidth, ...props }: TextInputWrapperProps) {
    return <StyledTextInput $fullWidth={fullWidth} {...props} />;
}

export default TextInputWrapper; 