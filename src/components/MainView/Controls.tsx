import React from 'react';
import { useImplementation } from '../../ImplementationContext';

export const SHAPE_TYPES = ['circle', 'rectangle', 'star'];

const Controls: React.FC = () => {
    const {
        rotated,
        setRotated,
        selectedColor,
        setSelectedColor,
        selectedShapeType,
        setSelectedShapeType
    } = useImplementation();

    const colors = [
        '#FF0000', // Red
        '#00FF00', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#FF00FF', // Magenta
        '#00FFFF', // Cyan
        '#FFA500', // Orange
        '#800080', // Purple
        '#008000', // Dark Green
        '#000080'  // Navy
    ];

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleShapeSelect = (type: string) => {
        setSelectedShapeType(selectedShapeType === type ? null : type);
    };

    return (
        <div className="controls-container">
            <div className="control-group">
                <h3>Rotation</h3>
                <button
                    onClick={() => setRotated(!rotated)}
                    className="control-button"
                    aria-label={rotated ? 'Rotate back' : 'Rotate 180 degrees'}
                >
                    Rotate {rotated ? '↩️' : '↪️'}
                </button>
            </div>

            <div className="control-group">
                <h3>Color Selector</h3>
                <div className="color-picker">
                    {colors.map((color) => (
                        <button
                            key={color}
                            className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                            title={color}
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
            </div>

            <div className="control-group">
                <h3>Shape Filter</h3>
                <div className="shape-filter">
                    {SHAPE_TYPES.map((type) => (
                        <button
                            key={type}
                            className={`shape-button ${selectedShapeType === type ? 'selected' : ''}`}
                            onClick={() => handleShapeSelect(type)}
                            aria-label={`${selectedShapeType === type ? 'Deselect' : 'Select'} ${type} shape`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Controls; 