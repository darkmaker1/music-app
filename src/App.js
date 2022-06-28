import React, {useState,useRef} from "react";
// import styles
import './styles/app.scss'
// Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Import data
import data from "./data";

function App() {
    //Ref
    const audioRef = useRef(null);
    //State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[3]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo,setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
  });
  const [firstLoaded,setFirstLoaded] = useState(true);

  const [libraryStatus,setLibraryStatus] = useState(false)
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime
    const duration = e.target.duration
    //Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration )* 100)

    setSongInfo({...songInfo, currentTime: current,duration, animationPercentage:animation})
  }

  const songEndHandler = async (e) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  };

  const songLoadHandler = async (e) => {
    if (firstLoaded) {
      setFirstLoaded(false);
    } else {
      audioRef.current.play();
    }
  }
  return (
    <div className="App">
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}   
      />
      <Song currentSong={currentSong} />
      <Player
       currentSong={currentSong}
       isPlaying={isPlaying}
       setIsPlaying={setIsPlaying}
       audioRef={audioRef}
       setSongInfo={setSongInfo}
       songInfo={songInfo}
       songs = {songs}
       setCurrentSong={setCurrentSong}
       setSongs={setSongs}
       />
       <Library
        songs = {songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
       />
       <audio
          onLoadedData={songLoadHandler}
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
        ></audio>
    </div>
  );
}

export default App;
