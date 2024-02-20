import React from "react";
import ReactPlayer from 'react-player/youtube';
import {store} from "../../store/store.ts";
import {setProgress} from "../../store/reducers/SongRequestSlice.ts";

const SongRequestPlayer: React.FC<{
  videoId: string,
  volume: number,
  playing: boolean,
  endVideo: () => void
}> =({videoId, volume, playing, endVideo}) => {
  return (
    <ReactPlayer
      width="440px"
      height="240px"
      url={"https://www.youtube.com/watch?v=" + videoId}
      playing={playing}
      volume={volume / 100}
      onEnded={endVideo}
      onProgress={(event) => store.dispatch(setProgress(event.played))}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default SongRequestPlayer;
