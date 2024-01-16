/*
import React, { useState, useContext } from 'react';
import AudioPlayerContext from './AudioPlayerContext';

const Controls = () => {
    const { playFile, nextSong, previousSong, restartSong, currentSongIndex, playlist, setVolume, seek, currentTime, audioPlayer } = useContext(AudioPlayerContext);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const handlePlay = () => {
        playFile(currentSongIndex);
    };

    const handleNext = () => {
        if (shuffle) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentSongIndex);
            playFile(nextIndex);
        } else {
            nextSong();
        }
    };

    const handlePrevious = () => {
        previousSong();
    };

    const handleRestart = () => {
        restartSong();
    };

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        setVolume(volume);
    };

    const handleProgressChange = (event) => {
        const newTime = event.target.value;
        seek(newTime);
    };

    return (
        <div id="controls">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handlePlay}>Play/Pause</button>
            <input type="range" min="0" max={audioPlayer.current.duration || 0} value={currentTime} onChange={handleProgressChange} />
            <input type="range" min="0" max="1" step="0.01" value={audioPlayer.current.volume} onChange={handleVolumeChange} />
            <button onClick={handleNext}>Next</button>
            <button onClick={handleRestart}>Restart</button>
            <input type="checkbox" checked={shuffle} onChange={() => setShuffle(!shuffle)} /> Shuffle
            <input type="checkbox" checked={repeat} onChange={() => setRepeat(!repeat)} /> Repeat
        </div>
    );
};

export default Controls;
*/
/*
import React, { useState, useContext } from 'react';
import AudioPlayerContext from './AudioPlayerContext';

const Controls = () => {
    const {
        playFile, 
        nextSong, 
        previousSong, 
        restartSong, 
        currentSongIndex, 
        playlist, 
        setVolume, 
        seek, 
        currentTime, 
        audioPlayer
    } = useContext(AudioPlayerContext);
    
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    const handlePlay = () => {
        playFile(currentSongIndex);
    };

    const handleNext = () => {
        if (shuffle) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentSongIndex);
            playFile(nextIndex);
        } else {
            nextSong();
        }
    };

    const handlePrevious = () => {
        previousSong();
    };

    const handleRestart = () => {
        restartSong();
    };

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        setVolume(volume);
    };

    const handleProgressChange = (event) => {
        const newTime = event.target.value;
        seek(newTime);
    };

    // Asegurarse de que audioPlayer está definido antes de acceder a sus propiedades
    const duration = audioPlayer ? audioPlayer.duration : 0;
    const current = audioPlayer ? currentTime : 0; // Usa el currentTime del contexto

    return (
        <div id="controls">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handlePlay}>Play/Pause</button>
            <input type="range" min="0" max={duration} value={current} onChange={handleProgressChange} />
            <input type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} />
            <button onClick={handleNext}>Next</button>
            <button onClick={handleRestart}>Restart</button>
            <input type="checkbox" checked={shuffle} onChange={() => setShuffle(!shuffle)} /> Shuffle
            <input type="checkbox" checked={repeat} onChange={() => setRepeat(!repeat)} /> Repeat
        </div>
    );
};

export default Controls;

*/