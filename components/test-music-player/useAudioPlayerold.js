
/*
import { useState, useEffect } from 'react';

const useAudioPlayer = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetch('/files/music')
            .then(response => response.json())
            .then(files => setPlaylist(files.map(file => file.filename)))
            .catch(error => console.error('Error al cargar las canciones:', error));
    }, []);

    const playFile = (index) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
        // Lógica de reproducción
    };

    // ... otras funciones

    return { playlist, currentSongIndex, isPlaying, playFile };
};

export default useAudioPlayer;
*/