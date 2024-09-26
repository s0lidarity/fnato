import { describe, test, expect } from 'vitest';
import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';
import GlobalStyles from '../../GlobalStyles'
import { LocationProvider } from 'preact-iso';
import { ThemeProvider } from 'styled-components';
import tokyoDark from  'react95/dist/themes/tokyoDark';
import Menu, { MenuConfig } from './Menu'; 

describe('Menu Component', () => {
    test('renders menu items correctly', () => {
        render(
            <div>
                <ThemeProvider theme={tokyoDark}>
                    <LocationProvider>
                        <Menu />
                    </LocationProvider>
                </ThemeProvider>
            </div>
        );
        console.log(screen.logTestingPlaygroundURL());
        MenuConfig.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    test('toggles menu visibility when clicked', () => {
        render(
            <ThemeProvider theme={tokyoDark}>
                <LocationProvider>
                    <Menu />
                </LocationProvider>
            </ThemeProvider>
        );

        const menuButton = screen.getByRole('button');
        fireEvent.click(menuButton);

        const menuList = screen.getByRole('menu');
        expect(menuList).toBeInTheDocument();

        fireEvent.click(menuButton);
        expect(menuList).toBeInTheDocument();
    });
});