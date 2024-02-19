import Player from "./Player.tsx";
import Playlist from "./Playlist.tsx";
import Controls from "./Controls.tsx";
import {useSelector} from "react-redux";
import {selectSongRequest, songRequestActions} from "../../store/reducers/SongRequestSlice.ts";
import {store} from "../../store/store.ts";
import {songRequestApi} from "../../services/SongRequest.ts";
import { useEffect } from "react";
import {Box, em} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

const SongRequest = () => {
  const sr = useSelector(selectSongRequest);
  const {data: playlist} = songRequestApi.useGetPlaylistQuery();
  const [skipSong] = songRequestApi.useSkipSongMutation();
  const isNarrowWindow = useMediaQuery(`(max-width: ${em(1060)})`);

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
    <Box w={"calc(100% - 173px)"}>
      <Box display={isNarrowWindow ? "block" : "flex"}>
        <Box w={440} h={408}>
          <Player videoId={sr.currentVideo} volume={sr.volume} playing={sr.isPlaying} endVideo={endSkipVideo}/>
          <Controls songRequest={sr} skipVideo={endSkipVideo}/>
        </Box>
        <Box w={"calc(100% - 440px)"}>
          <Playlist playlist={sr.playlist}/>
        </Box>
      </Box>
    </Box>
  )
}

export default SongRequest;
