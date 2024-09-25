import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';
import Menu, { MenuConfig } from '../../../src/components/Header/Menu'; 
import { LocationProvider } from 'preact-iso';

describe('Menu Component', () => {
    test('renders menu items correctly', () => {
        render(
            <LocationProvider>
                <Menu />
            </LocationProvider>
        );

        MenuConfig.forEach(item => {
            expect(screen.getByText(item.name)).toBeTruthy();
        });
    });

    test('toggles menu visibility when clicked', () => {
        render(
            <LocationProvider>
                <Menu />
            </LocationProvider>
        );

        const menuButton = screen.getByRole('button');
        fireEvent.click(menuButton);

        const menuList = screen.getByRole('menu');
        expect(menuList).toBeTruthy();

        fireEvent.click(menuButton);
        expect(menuList).toBeFalsy();
    });
});