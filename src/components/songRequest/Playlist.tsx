import {
  selectSongRequestPlaylist,
  SongRequestVideo,
} from "../../store/reducers/SongRequestSlice.ts";
import { useSelector } from "react-redux";

const Playlist = () => {
  const playlist = useSelector(selectSongRequestPlaylist);

  return (
    <div>
      Playlist {playlist.length}
      {playlist.map((video: SongRequestVideo, index) => (
        <div key={index}>{video.title}</div>
      ))}
    </div>
  );
};

export default Playlist;
