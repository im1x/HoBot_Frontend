//react component for the song request player
import React from "react";
import ReactPlayer from 'react-player/youtube';
import {store} from "../../store/store.ts";
import {setProgress} from "../../store/reducers/SongRequestSlice.ts";

const SongRequestPlayer: React.FC<{videoId: string, volume: number, playing: boolean}> = ({ videoId, volume, playing}) => {
  function rpStart() {
    console.log("rpStart");
    console.log(videoId)
  }

  return (
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
                   playing={playing}
                   volume={volume/100}
                   onStart={rpStart}
                   onPause={() => {}}
                   onProgress={(event) => store.dispatch(setProgress(event.played))}
                   style={{pointerEvents: 'none'}}
      />

  )
};

export default SongRequestPlayer;
