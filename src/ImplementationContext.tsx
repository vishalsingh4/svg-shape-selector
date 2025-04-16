import React, { createContext, useContext, useState } from "react";

interface ImplementationContextType {
    selectedId: string;
    setSelectedId: (id: string) => void;
    rotated: boolean;
    setRotated: (rotated: boolean) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    selectedShapeType: string | null;
    setSelectedShapeType: (type: string | null) => void;
}

const defaultContext: ImplementationContextType = {
    selectedId: "",
    setSelectedId: () => { },
    rotated: false,
    setRotated: () => { },
    selectedColor: "#000000",
    setSelectedColor: () => { },
    selectedShapeType: null,
    setSelectedShapeType: () => { },
};

export const ImplementationContext = createContext<ImplementationContextType>(defaultContext);

export const ImplementationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedId, setSelectedId] = useState<string>("");
    const [rotated, setRotated] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>("#000000");
    const [selectedShapeType, setSelectedShapeType] = useState<string | null>(null);

    const contextValue = {
        selectedId,
        setSelectedId,
        rotated,
        setRotated,
        selectedColor,
        setSelectedColor,
        selectedShapeType,
        setSelectedShapeType,
    };

    return (
        <ImplementationContext.Provider value={contextValue}>
            {children}
        </ImplementationContext.Provider>
    );
};

export const useImplementation = () => {
    const context = useContext(ImplementationContext);
    if (!context) {
        throw new Error("useImplementation must be used within an ImplementationProvider");
    }
    return context;
};