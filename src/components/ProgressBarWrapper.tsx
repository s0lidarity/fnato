import { h } from 'preact';
import { ProgressBar } from 'react95';
import styled from 'styled-components';

// Create a styled wrapper for ProgressBar that handles the variant prop
const StyledProgressBar = styled(ProgressBar).attrs<any>({
    'data-testid': 'progress-bar-wrapper',
    'data-component': 'ProgressBarWrapper'
})`
  /* Any additional styling based on $variant can go here */
`;

// Props interface for our wrapper
interface ProgressBarWrapperProps {
    variant?: string;
    [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts variant to $variant
function ProgressBarWrapper({ variant, ...props }: ProgressBarWrapperProps) {
    return <StyledProgressBar $variant={variant} {...props} />;
}

export default ProgressBarWrapper; 