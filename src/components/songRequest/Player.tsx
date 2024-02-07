//react component for the song request player
import React, { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactPlayer from 'react-player/youtube';
import { Button, TextInput } from "@mantine/core";
import Playlist from "./Playlist.tsx";

interface SongRequestPlayerProps {
  // add any necessary props here
}

const SongRequestPlayer: React.FC<SongRequestPlayerProps> = (props) => {
  const [newVideoId, setNewVideoId] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState("e-6eWEhjMa4");
  const [isMuted, setMuted] = useState(true);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    //event.target.playVideo();
    console.log("onPlayerReady");
    console.log(props);
    //event.target.setVolume(100);
    event.target.unMute();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      origin: window.location.origin,
      //host: "https://www.youtube-nocookie.com",
      autoplay: 1,
      controls: 0,
      //mute: 1,
    },
  };

  function onPlayerEnd() {
    console.log("onPlayerEnd");
  }

  function changeVideo() {
    setPlayingVideoId(newVideoId);
  }

  function rpStart() {
    console.log("rpStart");
    setMuted(false);
  }

  return (
    <div>
      {/*      <iframe
        className="moobot-songrequest-player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="Youtube loading screen 10 hours"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/uBBDMqZKagY?autoplay=1&amp;modestbranding=1&amp;enablejsapi=1&amp;playsinline=1&amp;controls=0&amp;disablekb=1&amp;fs=0&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;origin=http%3A%2F%2Flocalhost:5173&amp;cc_load_policy=0&amp;widgetid=1"
        id="widget2"
      ></iframe>*/}
      <YouTube
        id={Math.floor(Math.random() * 1001) + ""}
        videoId={playingVideoId}
        opts={opts}
        onReady={onPlayerReady}
        onEnd={onPlayerEnd}
      />
      <div className="inline-flex">
        <TextInput
          value={newVideoId}
          onChange={(e) => setNewVideoId(e.target.value)}
        />
        <Button onClick={() => {changeVideo();}}>Add</Button>
      </div>
      <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
                   playing={true}
                   muted={isMuted}
                   onStart={rpStart}/>
    <Playlist/>
    </div>

  );
};

export default SongRequestPlayer;
