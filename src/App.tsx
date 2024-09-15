import React from 'react';
import './app.css';
import ArtworkTable from './components/ArtworkTable';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1 style={{ color: '#333', textAlign: 'center' }}>Artworks Table</h1>
            </header>
            <main className="app-main">
                <ArtworkTable />
            </main>
            <footer className="app-footer">
                <p style={{ textAlign: 'center' }}>Footer content</p>
            </footer>
        </div>
    );
};

export default App;