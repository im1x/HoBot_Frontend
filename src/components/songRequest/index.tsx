import Player from "./Player.tsx";
import Playlist from "./Playlist.tsx";
import Controls from "./controls.tsx";
import {useSelector} from "react-redux";
import {selectSongRequest} from "../../store/reducers/SongRequestSlice.ts";

const SongRequest = () => {
  const sr = useSelector(selectSongRequest);

  return (
    <div>
      <Player videoId={sr.playlist[0].yt_id} volume={sr.volume} playing={sr.isPlaying}/>
      <Controls songRequest={sr}/>
      <Playlist playlist={sr.playlist}/>
    </div>
  )
}

export default SongRequest;
