import Player from "./Player.tsx";
import Playlist from "./Playlist.tsx";
import Controls from "./Controls.tsx";
import {useSelector} from "react-redux";
import {selectSongRequest, songRequestActions} from "../../store/reducers/SongRequestSlice.ts";
import {store} from "../../store/store.ts";
import {songRequestApi} from "../../services/SongRequestService.ts";
import { useEffect } from "react";
import {Box, em} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

const SongRequest = () => {
  const sr = useSelector(selectSongRequest);
  const {data: playlist} = songRequestApi.useGetPlaylistQuery();
  const [skipSong] = songRequestApi.useSkipSongMutation();
  const [clearPlaylist] = songRequestApi.useClearPlaylistMutation();
  const isNarrowWindow = useMediaQuery(`(max-width: ${em(1108)})`);

  useEffect(() => {
    if (playlist) {
      store.dispatch(songRequestActions.setPlaylist(playlist));
    }
  }, [playlist]);

  const endSkipVideoHandler = () => {
    store.dispatch(songRequestActions.skipVideo());
    skipSong();
  }

  const clearPlaylistHandler = () => {
    store.dispatch(songRequestActions.clearPlaylist());
    clearPlaylist();
  }

  return (
    <Box w={"calc(100% - 205px)"}> {/*205 - navbar width + space*/}
      <Box display={isNarrowWindow ? "block" : "flex"}>
        <Box w={440} h={408} ml="sm" mt="sm">
          <Player videoId={sr.currentVideo} volume={sr.volume} playing={sr.isPlaying} endVideo={endSkipVideoHandler}/>
          <Controls songRequest={sr} skipVideo={endSkipVideoHandler} clearPlaylist={clearPlaylistHandler}/>
        </Box>
        <Box w={"calc(100% - 476px)"} maw={isNarrowWindow ? 440 : undefined} mx="sm" mt="sm"> {/*440 - player width + 36 margin*/}
          <Playlist playlist={sr.playlist}/>
        </Box>
      </Box>
    </Box>
  )
}

export default SongRequest;
