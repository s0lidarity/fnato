import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact';

import Menu, { MenuConfig } from '../NavigationMenu'; 
import MockProvider from '../../../../test/test-utils/MockProvider';

describe('Menu Component', () => {
    beforeEach(() => {
        render(
            <div>
                <MockProvider>
                        <Menu open={false} setOpen={() => {}} />
                </MockProvider>
            </div>
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