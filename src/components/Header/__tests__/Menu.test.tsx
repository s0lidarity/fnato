import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';

import NavigationMenu from '../NavigationMenu'; 
import MockProvider from '../../../../test/test-utils/MockProvider';
import { MenuConfig } from '../MenuConfig';
describe('Menu Component', () => {
    beforeEach(() => {
        render(    
            <MockProvider>
                <NavigationMenu />
            </MockProvider>
        );
    });

    test('renders menu items correctly', () => {
        
        MenuConfig.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    test('each menu item has the expected href', () => {
        MenuConfig.forEach(item => {
            expect(screen.getByText(item.name).closest('a')).toHaveAttribute('href', item.url);
        });
    });

    test('menu items are clickable', () => {
        MenuConfig.forEach(item => {
            fireEvent.click(screen.getByText(item.name));
            expect(screen.getByText(item.name)).toHaveClass('active');
        });
    });
});