/*
import { useState, useEffect } from 'react';

let api = "http://localhost:3000"

const useAudioPlayer = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioPlayer, setAudioPlayer] = useState(new Audio());

    useEffect(() => {
        fetch(api+'/files/music')
            .then(response => response.json())
            .then(files => setPlaylist(files.map(file => file.filename)))
            .catch(error => console.error('Error al cargar las canciones:', error));

        // Evento onended del reproductor
        audioPlayer.onended = handleSongEnd;
    }, []);

    const playFile = (index) => {
        const filename = playlist[index];
        setCurrentSongIndex(index);
        audioPlayer.src = api + `/download/music/${filename}`;
        audioPlayer.play();
        setIsPlaying(true);
    };

    const handleSongEnd = () => {
        nextSong(); // Pasar a la siguiente canción al finalizar
    };

    const nextSong = () => {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        playFile(nextIndex);
    };

    const previousSong = () => {
        let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playFile(prevIndex);
    };

    const restartSong = () => {
        playFile(currentSongIndex);
    };

    const downloadSong = (filename) => {
        window.location.href = api + `/download-direct/music/${filename}`;
    };

    const deleteSong = (filename, index) => {
        fetch(api + `/delete/music/${filename}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    const updatedPlaylist = [...playlist];
                    updatedPlaylist.splice(index, 1);
                    setPlaylist(updatedPlaylist);
                } else {
                    alert('Error al eliminar la canción');
                }
            })
            .catch(error => console.error('Error al eliminar la canción:', error));
    };

    return {
        playlist, 
        currentSongIndex, 
        isPlaying, 
        playFile, 
        nextSong, 
        previousSong, 
        restartSong, 
        downloadSong, 
        deleteSong
    };
};

export default useAudioPlayer;
*/
/*
import { useState, useEffect, useRef } from 'react';

let api = "http://localhost:3000";

const useAudioPlayer = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioPlayer = useRef(new Audio());

    useEffect(() => {
        fetch(api+'/files/music')
            .then(response => response.json())
            .then(files => setPlaylist(files.map(file => file.filename)))
            .catch(error => console.error('Error al cargar las canciones:', error));
    
        // Asignar el manejador al evento onended del reproductor
        audioPlayer.current.onended = handleSongEnd;
    }, []);
    

    const playFile = (index) => {
        const filename = playlist[index];
        setCurrentSongIndex(index);
        audioPlayer.current.src = api + `/download/music/${filename}`;
        audioPlayer.current.play();
        setIsPlaying(true);
    };

    const handleSongEnd = () => {
        nextSong(); // Pasar a la siguiente canción al finalizar
    };

    const nextSong = () => {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        playFile(nextIndex);
    };

    const previousSong = () => {
        let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playFile(prevIndex);
    };

    const restartSong = () => {
        playFile(currentSongIndex);
    };

    const downloadSong = (filename) => {
        window.location.href = api + `/download-direct/music/${filename}`;
    };

    const deleteSong = (filename, index) => {
        fetch(api + `/delete/music/${filename}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    const updatedPlaylist = [...playlist];
                    updatedPlaylist.splice(index, 1);
                    setPlaylist(updatedPlaylist);
                } else {
                    alert('Error al eliminar la canción');
                }
            })
            .catch(error => console.error('Error al eliminar la canción:', error));
    };

    return {
        playlist, 
        currentSongIndex, 
        isPlaying, 
        playFile, 
        nextSong, 
        previousSong, 
        restartSong, 
        downloadSong, 
        deleteSong
    };
};

export default useAudioPlayer;
*/

/*
let api = "http://localhost:3000";

import { useState, useEffect, useRef } from 'react';



const useAudioPlayer = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef(new Audio());

    useEffect(() => {
        fetch(api + '/files/music')
            .then(response => response.json())
            .then(files => setPlaylist(files.map(file => file.filename)))
            .catch(error => console.error('Error al cargar las canciones:', error));

        const interval = setInterval(() => {
            if (audioPlayer.current && isPlaying) {
                setCurrentTime(audioPlayer.current.currentTime);
            }
        }, 1000);

        audioPlayer.current.onended = () => {
            if (isRepeat) {
                playFile(currentSongIndex);
            } else if (isShuffle) {
                playRandom();
            } else {
                nextSong();
            }
        };

        return () => {
            clearInterval(interval);
        };
    }, [isShuffle, isRepeat, isPlaying]);

    const playFile = (index) => {
        const filename = playlist[index];
        setCurrentSongIndex(index);
        audioPlayer.current.src = api + `/download/music/${filename}`;
        audioPlayer.current.play();
        setIsPlaying(true);
    };

    const playRandom = () => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentSongIndex);
        playFile(nextIndex);
    };

    const nextSong = () => {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        playFile(nextIndex);
    };

    const previousSong = () => {
        let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playFile(prevIndex);
    };

    const setVolume = (volume) => {
        audioPlayer.current.volume = volume;
    };

    const seek = (time) => {
        audioPlayer.current.currentTime = time;
        setCurrentTime(time);
    };

    return {
        playlist, 
        currentSongIndex, 
        isPlaying, 
        isShuffle, 
        setIsShuffle,
        isRepeat,
        setIsRepeat,
        currentTime,
        playFile, 
        nextSong, 
        previousSong, 
        setVolume,
        seek,
        audioPlayer: audioPlayer.current,
    };
};

export default useAudioPlayer;
*/

let api = "http://localhost:3000";

import { useState, useEffect, useRef } from 'react';



const useAudioPlayer = () => {
    const [playlist, setPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    

    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioPlayer = useRef(new Audio());

    useEffect(() => {
        // Carga la playlist desde el backend
        fetch(api + '/files/music')
            .then(response => response.json())
            .then(files => setPlaylist(files.map(file => file.filename)))
            .catch(error => console.error('Error al cargar las canciones:', error));
    }, []);

/*
    //pasar a la siguiente cancion artesanalmente en lo que resuelvo el bug de fargments de lenghts del back-end
    useEffect(() => {
        const interval = setInterval(() => {
            if (audioPlayer.current) {
                setCurrentTime(audioPlayer.current.currentTime);
                if (audioPlayer.current.duration - audioPlayer.current.currentTime <= 2) {
                    nextSong();
                }
            }
        }, 500);

        return () => clearInterval(interval);
    }, [currentSongIndex, isPlaying]);

*/
    const playFile = (index) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
    };

    const playRandom = () => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentSongIndex);
        playFile(nextIndex);
    };

    const nextSong = () => {
        let nextIndex;
        if (isShuffle) {
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentSongIndex);
        } else {
            nextIndex = (currentSongIndex + 1) % playlist.length;
        }
        playFile(nextIndex);
    };

    const previousSong = () => {
        let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playFile(prevIndex);
    };

    const setVolume = (volume) => {
        audioPlayer.current.volume = volume;
    };

    const seek = (time) => {
        audioPlayer.current.currentTime = time;
        setCurrentTime(time);
    };

    return {
        playlist, 
        currentSongIndex, 
        isPlaying, 
        isShuffle, 
        setIsShuffle,
        isRepeat,
        setIsRepeat,
        currentTime,
        playFile, 
        nextSong, 
        previousSong, 
        setVolume,
        seek,
        audioPlayer: audioPlayer.current,
        isShuffle,
        setIsShuffle,
        isRepeat,
        setIsRepeat
    };
};

export default useAudioPlayer;




