import React from 'react';
import './AudioController.css';
import PropTypes from 'prop-types';

const converterTime = (time = 0) => {
    const seconds = Math.floor((time % 60)).toFixed();
    const minutes = Math.floor((time / 60)).toFixed();
    const changedSeconds = seconds <= 9 ? `0${seconds}` : seconds;
    return `${minutes}:${changedSeconds}`;
};

const AudioPlayer = (props) => {
    const {
        audioList,
        currentAudio,
        audio,
        isPlaying,
        progress,
        setProgressClick,
        getProgress,
        play,
        nextTrack,
        prevTrack } = props;

    const playCls = isPlaying ? 'audio-player play' : 'audio-player';
    const currentItem = audioList[currentAudio];
    const time = audio.current ? audio.current.currentTime : 0;
    const duration = audio.current ? audio.current.duration : 0;
    
    const pathName = currentItem && currentItem.pathName ? currentItem.pathName : '';
    const img = currentItem && currentItem.img ? currentItem.img : '';
    const title = currentItem && currentItem.title ? currentItem.title : '';

    return (
        <div className={playCls}>
            <div className="player-block">
                <div className="title">{title} {' '}
                    <span className="current_time">{converterTime(time)}</span>/
                    <span>{converterTime(duration)}</span>
                </div>
                <div onClick={setProgressClick} className="progress_wrap">
                    <div style={{ width: progress + '%' }} className="progress"></div>
                </div>
            </div>

            <audio 
                onEnded={nextTrack} onTimeUpdate={getProgress} ref={audio} 
                src={require(`./../../assets/music/${pathName}.mp3`)}>
            </audio>

            <div className="data_music">
                <div className="album_img">
                    <img src={img} alt={title} />
                </div>
                <div className="controls">
                    <button onClick={prevTrack}><i className="fas fa-backward"></i></button>
                    <button onClick={play}>{
                        isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>
                    }</button>
                    <button onClick={nextTrack}><i className="fas fa-forward"></i></button>
                </div>
            </div>
        </div>
    );
}


AudioPlayer.propTypes = {
    audioList: PropTypes.array.isRequired,
    currentAudio: PropTypes.number,
    isPlaying: PropTypes.bool,
    progress: PropTypes.number,
    setProgressClick: PropTypes.func,
    getProgress: PropTypes.func,
    play: PropTypes.func,
    nextTrack: PropTypes.func,
    prevTrack: PropTypes.func
};

export default AudioPlayer;