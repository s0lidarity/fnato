import { h } from 'preact';
import { GroupBox } from 'react95';
import styled from 'styled-components';

// Create a styled wrapper for GroupBox that handles the variant prop
const StyledGroupBox = styled(GroupBox).attrs<any>({
  'data-testid': 'group-box-wrapper',
  'data-component': 'wrappers/GroupBoxWrapper'
})`
  /* Any additional styling based on $variant can go here */
`;

// Props interface for our wrapper
interface GroupBoxWrapperProps {
  variant?: string;
  [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts variant to $variant
function GroupBoxWrapper({ variant, ...props }: GroupBoxWrapperProps) {
  return <StyledGroupBox $variant={variant} {...props} />;
}

export default GroupBoxWrapper; 