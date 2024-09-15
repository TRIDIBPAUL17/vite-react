import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchArtworks } from './services/api';
import { Artwork } from '../types';
import SelectionPanel from './SelectionPanel';

const ArtworkTable: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData(first);
    }, [first]);

    const loadData = async (first: number) => {
        try {
            setLoading(true);
            setError(null);
            const page = Math.floor(first / 10) + 1;
            const { artworks, totalRecords } = await fetchArtworks(page);
            console.log('Fetched artworks:', artworks); // Debug log
            setArtworks(artworks);
            setTotalRecords(totalRecords);
        } catch (err) {
            console.error('Error fetching artworks:', err);
            setError('Failed to load artworks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onSelectionChange = (e: { value: Artwork[] }) => {
        setSelectedArtworks(e.value);
        console.log('Selected artworks:', e.value); // Debug log
    };

    const onPage = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        console.log('Page changed:', event); // Debug log
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <DataTable
                value={artworks}
                paginator
                rows={10}
                totalRecords={totalRecords}
                lazy
                first={first}
                onPage={onPage}
                loading={loading}
                selection={selectedArtworks}
                onSelectionChange={onSelectionChange}
                dataKey="id"
                emptyMessage="No artworks found"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>
            <SelectionPanel selectedArtworks={selectedArtworks} />
        </div>
    );
};

export default ArtworkTable;