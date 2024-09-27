import { describe, test, expect } from 'vitest';
import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';
import { LocationProvider } from 'preact-iso';
import { ThemeProvider } from 'styled-components';
import tokyoDark from  'react95/dist/themes/tokyoDark';
import Menu, { MenuConfig } from './Menu'; 
import MockProvider from '../../../test/test-utils/MockProvider';

describe('Menu Component', () => {
    beforeEach(() => {
        render(
            <div>
                <MockProvider>
                        <Menu />
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