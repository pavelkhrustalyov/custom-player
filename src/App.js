import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import AudioPlayer from './components/AudioController/AudioController';
import AudioList from './components/AudioList/AudioList';
import SearchAudio from './components/SearchAudio/SearchAudio';
import musicData from './utils';

const App = () => {

  const audio = useRef(null);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const [ search, setSearch ] = useState('');
  const [ currentAudio, setCurrentAudio ] = useState(0);

  const [ audioList ] = useState(musicData);

  const onSetSearch = (term) => setSearch(term);

  const prevTrack = () => {
    if (currentAudio <= 0) {
      setCurrentAudio(audioList.length - 1);
    } else {
      setCurrentAudio(prev => prev - 1);
    }
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (currentAudio >= audioList.length - 1) {
        setCurrentAudio(0);
    } else {
      setCurrentAudio(prev => prev + 1);
    }
    setIsPlaying(true);
  };
  
  const play = () => {
    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      audio.current.play();
      setIsPlaying(true);
    }
  };

  const selectTrack = (id) => {
    const index = audioList.findIndex(audio => audio.id === id);
    setCurrentAudio(index);
    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      audio.current.play();
      setIsPlaying(true);
    }
  };

  const getProgress = () => {
    const { duration, currentTime } = audio.current;
    setProgress((currentTime / duration) * 100);
  };

  const setProgressClick = (e) => {
    const { duration } = audio.current;
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    audio.current.currentTime = (clickX / width) * duration;
  };

  const filteredList = (arr, term) => {
    if (arr.length === 0) {
      return arr;
    }
    return arr.filter(item => item.title.toLowerCase().indexOf(term.toLowerCase()) !== -1);
  };

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    }
  }, [currentAudio, isPlaying]);

  const filteredItems = filteredList(audioList, search);

  return (
    <div className="App">
      <h1 className="heading">Music Player</h1>
        <SearchAudio onSetSearch={onSetSearch} />
          {
            filteredItems.length > 0 ?
            <>
                <AudioPlayer
                  audioList={filteredItems}
                  currentAudio={currentAudio}
                  audio={audio}
                  isPlaying={isPlaying}
                  progress={progress}
                  setProgressClick={setProgressClick}
                  getProgress={getProgress}
                  play={play}
                  nextTrack={nextTrack}
                  prevTrack={prevTrack}
                />
                <AudioList
                  audioList={filteredItems}
                  selectTrack={selectTrack}
                  currentIndex={currentAudio}
                  isPlaying={isPlaying}
                />
            </>
            : <h1 className="heading">Песен нет</h1>
          }
    </div>
  );
}

export default App;
