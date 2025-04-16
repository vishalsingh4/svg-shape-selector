import React, { useContext, useMemo, useEffect, useRef, useState } from 'react'
import LeftPanel from './LeftPanel';
import Controls from './Controls';

import './index.scss';
import { useImplementation } from '../../ImplementationContext';
import { locationsData } from '../../data/locations';
import floor1 from '../../assets/floor1.svg'
import floor2 from '../../assets/floor2.svg'
import floor3 from '../../assets/floor3.svg'
import floor_plan from '../../assets/floor_plan.svg'

const SHAPE_MAPPING: { [key: string]: string } = {
    'rect1408': 'rectangle',
    'rect1410': 'rectangle',
    'path1529': 'star',
    'rect1412': 'rectangle',
    'path1585': 'circle',
    'path15851': 'circle'
};

const MainView = () => {
    const { selectedId, rotated, selectedColor, selectedShapeType } = useImplementation();
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const svgRef = useRef<HTMLDivElement>(null);

    const recursivelyFindNodeById = (nodes: any[], selectedId: string) => {
        for (const node of nodes) {
            if (node.id === selectedId) {
                return node.floorplan;
            }

            if (node.children) {
                const result: string = recursivelyFindNodeById(node.children, selectedId);
                if (result) return result;
            }
        }

        return null;
    }

    const selectedFloorPlanSvg = useMemo(() => {
        const selectedSvg = recursivelyFindNodeById(locationsData, selectedId);
        switch (selectedSvg) {
            case 'floor1.svg': return floor1;
            case 'floor2.svg': return floor2;
            case 'floor3.svg': return floor3;
            case 'floor_plan.svg': return floor_plan;
            default: return null;
        }
    }, [selectedId, locationsData?.length]);

    useEffect(() => {
        if (!selectedFloorPlanSvg) return;

        fetch(selectedFloorPlanSvg)
            .then(response => response.text())
            .then(svgText => {
                setSvgContent(svgText);
            })
            .catch(error => {
                console.error('Error loading SVG:', error);
            });
    }, [selectedFloorPlanSvg]);

    useEffect(() => {
        if (!svgContent || !svgRef.current) return;

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // Apply color to all shapes
        const shapes = svgElement.querySelectorAll('polygon, rect, path, circle');
        shapes.forEach(shape => {
            const shapeId = shape.getAttribute('id');
            if (!shapeId) return;

            const shapeType = SHAPE_MAPPING[shapeId];
            if (!shapeType) return;

            // Apply color if no shape type is selected or if the shape matches the selected type
            if (!selectedShapeType || shapeType === selectedShapeType) {
                shape.setAttribute('fill', selectedColor);
                shape.setAttribute('style', 'display: block; visibility: visible;');
                if (shapeType === 'circle') {
                    shape.setAttribute('stroke', selectedColor);
                }
            } else {
                shape.setAttribute('style', 'display: none;');
            }
        });

        // Replace the existing SVG with the modified one
        const currentRef = svgRef.current;
        if (currentRef) {
            const existingSvg = currentRef.querySelector('svg');
            if (existingSvg) {
                existingSvg.replaceWith(svgElement);
            } else {
                currentRef.appendChild(svgElement);
            }
        }
    }, [svgContent, selectedColor, selectedShapeType]);

    return (
        <main className="main_container">
            <LeftPanel />
            <div className="right_panel">
                <Controls />
                {selectedFloorPlanSvg ? (
                    <div
                        className='view_container'
                        ref={svgRef}
                        style={{
                            transform: `${rotated ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                            transition: 'transform 0.3s ease'
                        }}
                    />
                ) : (
                    <div className="no-selection">Please select location for floor plan preview</div>
                )}
            </div>
        </main>
    )
}

export default MainView