import React, { useState, useContext } from 'react';
import AudioPlayerContext from './AudioPlayerContext';


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { playlist, playFile } = useContext(AudioPlayerContext);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.length >= 3) {
            const filteredResults = playlist.filter(song => song.toLowerCase().includes(term.toLowerCase()));
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    };

    // Estilos en línea para los resultados de búsqueda, con texto en color azul
    const searchItemStyle = {
        color: 'blue',
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        margin: '5px',
        '&:hover': {
            backgroundColor: '#f0f0f0'
        }
    };

    return (
        <div className="search-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="search-input" style={{ width: '100%', textAlign: 'center', marginBottom: "20px" }}>
                <input 
                    type="text" 
                    placeholder="Buscar canciones..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ 
                        color: 'black', 
                        width: '80%', // Ancho al doble
                        padding: '10px', // Mayor altura y comodidad
                        margin: '5px 0' // Margen para separar de los resultados
                    }}
                />
            </div>
            <div className="search-results" style={{ width: '100%' }}>
                {searchResults.length > 0 && (
                    searchResults.map((song, index) => (
                        <div key={index} style={searchItemStyle} onClick={() => playFile(playlist.indexOf(song))}>
                            {song}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchBar;