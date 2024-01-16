

import React, { useContext } from 'react';
import AudioPlayerContext from './AudioPlayerContext';

let api = "http://localhost:3000";

const SongList = () => {
    const { playlist, playFile, currentSongIndex } = useContext(AudioPlayerContext);

    // Estilos en línea
    const songItemStyle = (isPlaying) => ({
        // ... otros estilos
        
        color: isPlaying ? 'blue' : 'black',
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '10px', // Bordes redondeados
        border: '1px solid #ccc', // Borde sólido
        margin: '5px', // Espacio entre canciones
        '&:hover': {
            backgroundColor: '#f0f0f0'
        },

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    });

    const buttonStyle = {
        margin: '3px',
        border: "solid"
    };

    const listStyle = {
        maxHeight: '800px', // Altura máxima de la lista
        overflowY: 'auto',  // Habilita el scroll si el contenido excede la altura máxima
        backgroundColor: '#f0f0f0'
    };

    return (
        <div className="song-list" style={listStyle}>
            {playlist.map((filename, index) => (
                <div key={index} className="song-item" style={songItemStyle(index === currentSongIndex)} onClick={() => playFile(index)}>
                    {filename}
                    <div>
                    <button style={buttonStyle} onClick={(e) => { e.stopPropagation(); downloadSong(filename); }}>Descargar</button>
                        <button style={buttonStyle} onClick={() => deleteSong(filename, index)}>Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SongList;

// Las funciones downloadSong y deleteSong van fuera del componente

function downloadSong(filename) {
    fetch(api + `/download-direct/music/${filename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('La red respondió con un error al descargar el archivo');
            }
            return response.blob();
        })
        .then(blob => {
            // Crear un enlace y descargar el archivo
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error al descargar la canción:', error);
            alert('Error al descargar la canción');
        });
}


function deleteSong(filename, index) {
    fetch(api +`/delete/music/${filename}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                document.getElementById('playlist').children[index].remove();
            } else {
                alert('Error al eliminar la canción');
            }
        })
        .catch(error => console.error('Error al eliminar la canción:', error));
}
