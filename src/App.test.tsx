import { h } from 'preact';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { App } from './index';

describe.skip('App Component', () => {
    // beforeEach(() => {
    //     render(<App />);
    // });

    test('renders the header', () => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test('renders the main content', () => {
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('renders the router with routes', () => {
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();
        expect(screen.getByText(/Crucible/i)).toBeInTheDocument();
    });
});