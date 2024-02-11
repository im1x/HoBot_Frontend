import React from "react";
import {SongRequestVideo} from "../../models/SongRequest.ts";

const Playlist: React.FC<{ playlist: SongRequestVideo[] }> = ({ playlist }) => {
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
