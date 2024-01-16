/*
import React from 'react';
import SongList from './SongList';
import SearchBar from './SearchBar';
import UploadForm from './UploadForm';
import MusicPlayerFinal from './Reproductor';
import './style.css';


const MusicPlayer = () => {
    return (
        <div className="music-player">
            <MusicPlayerFinal/>
            <SearchBar />
            <SongList />
            <UploadForm />
        </div>
    );
};

export default MusicPlayer;
*/

import React from 'react';
import SongList from './SongList';
import SearchBar from './SearchBar';
import UploadForm from './UploadForm';
import MusicPlayerFinal from './Reproductor';
import './MusicPlayerStyle.css';
import YouTubeUploader from './YouTubeUploader';

const MusicPlayer = () => {
    return (
        <div className="music-player">

            <div className="music-player-item">
                <UploadForm />
            </div>
            <div className="music-player-item">
                <YouTubeUploader/>
            </div>
            <div className="music-player-item">
                <MusicPlayerFinal/>
            </div>
            <div className="music-player-item">
                <SearchBar />
            </div>
            <div className="music-player-item">
                <SongList />
            </div>

        </div>
    );
};

export default MusicPlayer;

