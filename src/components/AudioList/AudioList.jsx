import React from 'react';
import './AudioList.css';
import AudioItem from '../AudioItem/AudioItem';
import PropTypes from 'prop-types';

const AudioList = ({ audioList, selectTrack, currentIndex, isPlaying }) => {
    return (
        <div className="audio_list">
            {
                audioList.map((audio, index) => {
                    return (
                        <AudioItem
                            key={audio.id}
                            {...audio}
                            selectTrack={selectTrack}
                            index={index}
                            isPlaying={isPlaying}
                            currentIndex={currentIndex}
                        />
                    )
                })
            }
        </div>
    );
};

AudioList.propTypes = {
    audioList: PropTypes.array,
    selectTrack: PropTypes.func,
    currentIndex: PropTypes.number,
    isPlaying: PropTypes.bool
};


export default AudioList;