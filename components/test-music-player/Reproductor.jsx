// MusicPlayerFinal.jsx
/*
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import AudioPlayerContext from './AudioPlayerContext';

let api = "http://localhost:3000";

const MusicPlayerFinal = () => {
    const {
        playlist,
        currentSongIndex,
        isPlaying,
        setIsPlaying,
        playFile,
        nextSong,
        previousSong
    } = useContext(AudioPlayerContext);

    const url = playlist.length > 0 ? `${api}/download/music/${playlist[currentSongIndex]}` : '';

    return (
        <div className="music-player">
            <ReactPlayer
                url={url}
                playing={isPlaying}
                controls={true}
                onEnded={nextSong}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            <button onClick={() => playFile(currentSongIndex)}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={previousSong}>Previous</button>
            <button onClick={nextSong}>Next</button>
           
        </div>
    );
};

export default MusicPlayerFinal;
*/
/*

import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import AudioPlayerContext from './AudioPlayerContext';

let api = "http://localhost:3000";

const MusicPlayerFinal = () => {
    const {
        playlist,
        currentSongIndex,
        playFile,
        isPlaying,
        setIsPlaying,
        nextSong
    } = useContext(AudioPlayerContext);

    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [loadedSeconds, setLoadedSeconds] = useState(0);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const url = playlist.length > 0 ? `${api}/download/music/${playlist[currentSongIndex]}` : '';

    const handleProgress = (state) => {
        setPlayedSeconds(state.playedSeconds);
        setLoadedSeconds(state.loadedSeconds);
    };

    useEffect(() => {
        // Si la canción está a 2 segundos de terminar, cambia a la siguiente canción
        if (loadedSeconds - playedSeconds <= 1) {
            nextSong();
        }
    }, [playedSeconds, loadedSeconds]);

    return (
        <div className="music-player">
            <ReactPlayer
                url={url}
                playing={isPlaying}
                controls={true}
                onEnded={nextSong}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onProgress={handleProgress}
            />
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
           
        </div>
    );
};

export default MusicPlayerFinal;


*/


// MusicPlayerFinal.jsx

import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import AudioPlayerContext from './AudioPlayerContext';

let api = "http://localhost:3000";


const MusicPlayerFinal = () => {
    const {
        playlist,
        currentSongIndex,
        playFile,
        isPlaying,
        setIsPlaying,
        nextSong,
        previousSong,
        isShuffle,
        setIsShuffle,
        isRepeat,
        setIsRepeat
    } = useContext(AudioPlayerContext);

   
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [loadedSeconds, setLoadedSeconds] = useState(0);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const url = playlist.length > 0 ? `${api}/download/music/${playlist[currentSongIndex]}` : '';

    const handleProgress = (state) => {
        setPlayedSeconds(state.playedSeconds);
        setLoadedSeconds(state.loadedSeconds);
    };

    useEffect(() => {
        // Si la canción está a 2 segundos de terminar, cambia a la siguiente canción
        if (loadedSeconds - playedSeconds <= 1) {
            nextSong();
        }
    }, [playedSeconds, loadedSeconds]);

    const handleNextSong = () => {
        nextSong();
    };

    const handlePreviousSong = () => {
        previousSong();
    };

    const handleShuffleChange = () => {
        setIsShuffle(!isShuffle);
    };

    const handleRepeatChange = () => {
        setIsRepeat(!isRepeat);
    };

    

    const styles = {
        musicPlayerContainer: {
          display: 'flex',
          flexDirection: 'column',
        },
        player: {
          // Estilos para el reproductor
        },
        controls: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        centerControls: {
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        },
      };

      return (
        <div style={styles.musicPlayerContainer}>
          <div style={styles.player}>
            <ReactPlayer
              url={url}
              playing={isPlaying}
              controls={true}
              onEnded={isRepeat ? undefined : handleNextSong}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onProgress={handleProgress}
            />
          </div>
          <div style={styles.controls}>
            <button onClick={handlePreviousSong}>{"\u25C0"}</button>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <div style={styles.centerControls}>
              <label>
                <input type="checkbox" checked={isShuffle} onChange={handleShuffleChange} />
                Shuffle
              </label>
              <label>
                <input type="checkbox" checked={isRepeat} onChange={handleRepeatChange} />
                Repeat
              </label>
            </div>
            <button onClick={handleNextSong}>{"\u25B6"}</button>
          </div>
        </div>
      );
    };

export default MusicPlayerFinal;
