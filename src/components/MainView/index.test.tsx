import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImplementationProvider } from '../../ImplementationContext';
import MainView from './index';

// Mock the SVG imports with actual SVG strings instead of file paths
jest.mock('../../assets/floor1.svg', () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path id="path1585" d="M10 10h80v80H10z"/>
        <rect id="rect1408" x="20" y="20" width="20" height="20"/>
    </svg>
`);
jest.mock('../../assets/floor2.svg', () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path id="path1585" d="M10 10h80v80H10z"/>
    </svg>
`);
jest.mock('../../assets/floor3.svg', () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path id="path1529" d="M10 10h80v80H10z"/>
    </svg>
`);
jest.mock('../../assets/floor_plan.svg', () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect id="rect1412" x="10" y="10" width="80" height="80"/>
    </svg>
`);

// Mock the locations data
jest.mock('../../data/locations', () => ({
    locationsData: [
        {
            id: '1',
            name: 'Building A',
            floorplan: 'floor1.svg',
            children: [
                {
                    id: '1.1',
                    name: 'Floor 1',
                    floorplan: 'floor1.svg'
                }
            ]
        }
    ]
}));

describe('MainView', () => {
    const renderWithProvider = (component: React.ReactElement) => {
        return render(
            <ImplementationProvider>
                {component}
            </ImplementationProvider>
        );
    };

    it('renders without crashing', () => {
        renderWithProvider(<MainView />);
        expect(screen.getByText('Please select location for floor plan preview')).toBeInTheDocument();
    });

    // it('displays SVG when location is selected', async () => {
    //     renderWithProvider(<MainView />);

    //     // Simulate selecting a location
    //     const locationItem = screen.getByText('Building A');
    //     fireEvent.click(locationItem);

    //     // Check if SVG container is displayed
    //     const svgContainer = screen.getByClassName('view_container');
    //     expect(svgContainer).toBeInTheDocument();

    //     // Wait for SVG content to be loaded
    //     await waitFor(() => {
    //         const svgElement = svgContainer.querySelector('svg');
    //         expect(svgElement).toBeInTheDocument();
    //     });
    // });

    // it('applies rotation to SVG container when rotated', async () => {
    //     renderWithProvider(<MainView />);

    //     // Select a location first
    //     const locationItem = screen.getByText('Building A');
    //     fireEvent.click(locationItem);

    //     // Wait for SVG to be loaded
    //     await waitFor(() => {
    //         const svgContainer = screen.getByClassName('view_container');
    //         expect(svgContainer.querySelector('svg')).toBeInTheDocument();
    //     });

    //     // Click rotate button
    //     const rotateButton = screen.getByText('Rotate ↪️');
    //     fireEvent.click(rotateButton);

    //     // Check if rotation is applied to container
    //     const svgContainer = screen.getByClassName('view_container');
    //     expect(svgContainer).toHaveStyle({ transform: 'rotate(180deg)' });
    // });

    // it('applies color to SVG shapes', async () => {
    //     renderWithProvider(<MainView />);

    //     // Select a location
    //     const locationItem = screen.getByText('Building A');
    //     fireEvent.click(locationItem);

    //     // Wait for SVG to be loaded
    //     await waitFor(() => {
    //         const svgContainer = screen.getByClassName('view_container');
    //         expect(svgContainer.querySelector('svg')).toBeInTheDocument();
    //     });

    //     // Select a color
    //     const colorButton = screen.getAllByTitle(/#[0-9A-F]{6}/)[0];
    //     fireEvent.click(colorButton);

    //     // Check if color button is selected
    //     expect(colorButton).toHaveClass('selected');
    // });

    // it('filters shapes by type', async () => {
    //     renderWithProvider(<MainView />);

    //     // Select a location
    //     const locationItem = screen.getByText('Building A');
    //     fireEvent.click(locationItem);

    //     // Wait for SVG to be loaded
    //     await waitFor(() => {
    //         const svgContainer = screen.getByClassName('view_container');
    //         expect(svgContainer.querySelector('svg')).toBeInTheDocument();
    //     });

    //     // Select a shape type
    //     const circleButton = screen.getByText('circle');
    //     fireEvent.click(circleButton);

    //     // Check if shape filter button is selected
    //     expect(circleButton).toHaveClass('selected');
    // });
}); 