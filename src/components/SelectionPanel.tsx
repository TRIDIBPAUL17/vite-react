import React from 'react';
import { Artwork } from '../types';

interface SelectionPanelProps {
    selectedArtworks: Artwork[];
}

const SelectionPanel: React.FC<SelectionPanelProps> = ({ selectedArtworks }) => {
    return (
        <div className="selection-panel">
            <h4>Selected Artworks</h4>
            {selectedArtworks.length === 0 ? (
                <p>No artworks selected.</p>
            ) : (
                <ul>
                    {selectedArtworks.map((artwork) => (
                        <li key={artwork.id}>{artwork.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectionPanel;