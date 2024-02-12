import Player from "./Player.tsx";
import Playlist from "./Playlist.tsx";
import Controls from "./controls.tsx";
import {useSelector} from "react-redux";
import {selectSongRequest, songRequestActions} from "../../store/reducers/SongRequestSlice.ts";
import {store} from "../../store/store.ts";
import {songRequestApi} from "../../services/SongRequest.ts";
import {useEffect} from "react";

const SongRequest = () => {
  const sr = useSelector(selectSongRequest);
  const {data: playlist} = songRequestApi.useGetPlaylistQuery();
  const [skipSong] = songRequestApi.useSkipSongMutation();

  useEffect(() => {
    if (playlist) {
      store.dispatch(songRequestActions.setPlaylist(playlist));
    }
  }, [playlist]);


  const endSkipVideo = () => {
    store.dispatch(songRequestActions.skipVideo());
    skipSong();
  }

  return (
    <div>
      <Player videoId={sr.currentVideo} volume={sr.volume} playing={sr.isPlaying} endVideo={endSkipVideo}/>
      <Controls songRequest={sr} skipVideo={endSkipVideo}/>
      <Playlist playlist={sr.playlist}/>
    </div>
  )
}

export default SongRequest;
