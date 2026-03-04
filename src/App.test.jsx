import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Smoke Test', () => {
    it('renders the portfolio app without crashing', () => {
        render(<App />);
        // Check for the Logo text "Portfolio."
        const logoElement = screen.getByText(/Portfolio/i);
        expect(logoElement).toBeInTheDocument();
    });
});
