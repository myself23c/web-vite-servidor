import React, { createContext } from 'react';
import useAudioPlayer from './useAudioPlayer';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
    const audioPlayer = useAudioPlayer();

    return (
        <AudioPlayerContext.Provider value={audioPlayer}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export default AudioPlayerContext;

