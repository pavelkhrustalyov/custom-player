import React from 'react';
import './AudioItem.css';
import PropTypes from 'prop-types';

const AudioItem = ({ id, title, selectTrack, currentIndex, index, isPlaying }) => {
    const isPlay = index === currentIndex && isPlaying;
    return (
        <div className="audio_item">
            <div className="controls">
                <button onClick={() => selectTrack(id)}>
                    {
                        isPlay ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>
                    }
                </button>
            </div>
            <div className="audio_item-data">
                <div className="audio_item-title">{title}</div>
            </div>
        </div>
    );
}

AudioItem.propTypes = {
    index: PropTypes.number,
    isPlaying: PropTypes.bool,
    currentIndex: PropTypes.number
};

export default AudioItem;