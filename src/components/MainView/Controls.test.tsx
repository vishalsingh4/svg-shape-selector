import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImplementationProvider } from '../../ImplementationContext';
import Controls from './Controls';

describe('Controls', () => {
    const renderWithProvider = (component: React.ReactElement) => {
        return render(
            <ImplementationProvider>
                {component}
            </ImplementationProvider>
        );
    };

    it('renders rotation control', () => {
        renderWithProvider(<Controls />);
        expect(screen.getByText('Rotation')).toBeInTheDocument();
        expect(screen.getByText('Rotate ↪️')).toBeInTheDocument();
    });

    it('toggles rotation when button is clicked', () => {
        renderWithProvider(<Controls />);
        const rotateButton = screen.getByText('Rotate ↪️');
        fireEvent.click(rotateButton);
        expect(screen.getByText('Rotate ↩️')).toBeInTheDocument();
    });

    it('renders color selector with 10 colors', () => {
        renderWithProvider(<Controls />);
        const colorButtons = screen.getAllByTitle(/#[0-9A-F]{6}/);
        expect(colorButtons).toHaveLength(10);
    });

    it('selects color when color button is clicked', () => {
        renderWithProvider(<Controls />);
        const colorButton = screen.getAllByTitle(/#[0-9A-F]{6}/)[0];
        fireEvent.click(colorButton);
        expect(colorButton).toHaveClass('selected');
    });

    it('renders shape filter with all shape types', () => {
        renderWithProvider(<Controls />);
        expect(screen.getByText('Shape Filter')).toBeInTheDocument();
        expect(screen.getByText('circle')).toBeInTheDocument();
        expect(screen.getByText('rectangle')).toBeInTheDocument();
        expect(screen.getByText('star')).toBeInTheDocument();
    });

    it('toggles shape filter when shape button is clicked', () => {
        renderWithProvider(<Controls />);
        const circleButton = screen.getByText('circle');
        fireEvent.click(circleButton);
        expect(circleButton).toHaveClass('selected');

        fireEvent.click(circleButton);
        expect(circleButton).not.toHaveClass('selected');
    });
}); 