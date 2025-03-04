import { h } from 'preact';
import { MenuListItem } from 'react95';
import styled from 'styled-components';

// Create a styled wrapper for MenuListItem that handles the active prop
const StyledMenuListItem = styled(MenuListItem).attrs<any>({
  'data-testid': 'menu-list-item-wrapper',
  'data-component': 'wrappers/MenuListItemWrapper'
})`
  /* Any additional styling based on $active can go here */
`;

// Props interface for our wrapper
interface MenuListItemWrapperProps {
  active?: boolean;
  [key: string]: any; // Allow any other props to pass through
}

// The wrapper component that converts active to $active
function MenuListItemWrapper({ active, ...props }: MenuListItemWrapperProps) {
  return <StyledMenuListItem $active={active} {...props} />;
}

export default MenuListItemWrapper; 