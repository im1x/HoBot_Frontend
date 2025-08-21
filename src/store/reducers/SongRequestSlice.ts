import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import {
  SongRequestState,
  SongRequestVideo,
} from "@models/SongRequest";

const VIDEO_WAITING_ID = "uBBDMqZKagY";

const initialState: SongRequestState = {
  playlist: [],
  currentVideo: VIDEO_WAITING_ID,
  isPlaying: false,
  volume: 50,
  progress: 0,
  status: "stop"
};

const songRequestSlice = createSlice({
  name: "songRequest",
  initialState,
  reducers: {

    addVideo: (state, action: PayloadAction<SongRequestVideo>) => {
      state.playlist.push(action.payload);
      if (state.currentVideo === VIDEO_WAITING_ID) {
        state.currentVideo = state.playlist[0].yt_id;
      }
    },

    skipVideo: (state) => {
      state.playlist.shift();
      if (state.playlist.length > 0) {
        state.currentVideo = state.playlist[0].yt_id;
      } else if (state.currentVideo !== VIDEO_WAITING_ID) {
        state.currentVideo = VIDEO_WAITING_ID;
      }

    },

    deleteVideo: (state, action: PayloadAction<string>) => {
      state.playlist = state.playlist.filter((video) => video.id !== action.payload);
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },

    togglePlay: (state) => {
      if (state.currentVideo === VIDEO_WAITING_ID && state.playlist.length > 0) {
        state.currentVideo = state.playlist[0].yt_id;
      }
      state.isPlaying = !state.isPlaying;
    },

    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },

    setPlaylist: (state, action: PayloadAction<SongRequestVideo[]>) => {
      state.playlist = action.payload;
    },

    clearPlaylist: (state) => {
      state.playlist = [];
      state.currentVideo = VIDEO_WAITING_ID;
    },

    stopPlaying: (state) => {
      state.isPlaying = false;
      state.currentVideo = VIDEO_WAITING_ID;
    }

  },
});
export const { addVideo, skipVideo, setVolume, togglePlay, setProgress } =
  songRequestSlice.actions;
export const songRequestActions = songRequestSlice.actions;
export const selectSongRequest = (state: RootState) => state.songRequest;
export const selectSongRequestPlaylist = (state: RootState) => state.songRequest.playlist;

export default songRequestSlice;
