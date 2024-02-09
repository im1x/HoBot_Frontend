import Player from "./Player.tsx";
import Playlist from "./Playlist.tsx";
import Controls from "./controls.tsx";
import {useSelector} from "react-redux";
import {selectSongRequest, songRequestActions} from "../../store/reducers/SongRequestSlice.ts";
import {store} from "../../store/store.ts";

const SongRequest = () => {
  const sr = useSelector(selectSongRequest);

  const endVideo = () => {
    console.log("endVideo")
    store.dispatch(songRequestActions.skipVideo());
/*    if (sr.playlist.length === 0) {
      sr.currentVideo = VIDEO_WAITING_ID;
    }*/
  }

  return (
    <div>
      <Player videoId={sr.currentVideo} volume={sr.volume} playing={sr.isPlaying} endVideo={endVideo}/>
      <Controls songRequest={sr}/>
      <Playlist playlist={sr.playlist}/>
    </div>
  )
}

export default SongRequest;
