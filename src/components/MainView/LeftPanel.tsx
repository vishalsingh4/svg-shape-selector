import React, { useContext, useState } from 'react'

import { locationsData } from '../../data/locations';
import { type LocationResItem } from '../../types';
import { ImplementationContext } from '../../ImplementationContext';

type LocationRendererProps = {
    location: LocationResItem | { [key: string]: any };
}

const LocationRenderer: React.FC<LocationRendererProps> = ({ location }) => {
    const hasChildren = location?.children?.length > 0;

    const [isOpen, setIsOpen] = useState(false);
    const { setSelectedId } = useContext(ImplementationContext);

    return (
        <ul className='list-container'>
            <li
                role="button"
                tabIndex={0}
                aria-label={location.name}
                className='list-item'
                key={location?.id}
                onClick={() => {
                    hasChildren && setIsOpen(!isOpen);
                    location.floorplan && setSelectedId(location.id)
                }}
            >
                <div>{isOpen ? "🔽" : location.floorplan ? '' : "➡️"}</div>
                <span>{location.name}</span>
            </li>
            {
                hasChildren && isOpen && (
                    <>
                        {
                            location.children.map((child: any) => (
                                <LocationRenderer key={child.id} location={child} />
                            ))
                        }
                    </>
                )
            }
        </ul>
    )
}

const LeftPanel = () => {
    if (locationsData?.length === 0) {
        return <div>No locations found</div>;
    }

    return (
        <div className='left_panel'>
            {
                locationsData?.map((location) => (
                    <LocationRenderer key={location.id} location={location} />
                ))
            }
        </div>
    )
}

export default LeftPanel