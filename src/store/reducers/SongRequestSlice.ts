import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

export interface SongRequestVideo {
  channel_id: string,
  by: string,
  requested: string,
  yt_id: string
  title: string,
  length: number,
  views: number,
  start: number,
  end: number
}

export interface SongRequestState {
  playlist: SongRequestVideo[],
  currentVideo: string,
  isPlaying: boolean,
  volume: number,
  progress: number,
  status: string
}

const VIDEO_WAITING_ID = "uBBDMqZKagY";

const initialState: SongRequestState = {
  playlist: [
    {
      channel_id: '18591758',
      by: 'Im1x',
      requested: '2024-02-07T17:39:20+03:00',
      yt_id: 'krsBRQbOPQ4',
      title: '$1 vs $250,000,000 Private Island!',
      length: 1019,
      views: 114017319,
      start: 0,
      end: 0
    }
  ],
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

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },

    togglePlay: (state) => {
      if (state.currentVideo === VIDEO_WAITING_ID && state.playlist.length > 0) {
        state.currentVideo = state.playlist[0].yt_id
      }
      state.isPlaying = !state.isPlaying
    },

    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    }

/*    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserAndAuth: (
      state,
      action: PayloadAction<AuthResponse | undefined>,
    ) => {
      if (action.payload && action.payload.access_token) {
        localStorage.setItem("token", action.payload.access_token);
        state.isAuth = true;
        state.user = action.payload.User;
      }
    },
    clearAuth: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {} as IUser;
    },*/
  },
});
export const { addVideo, skipVideo, setVolume, togglePlay, setProgress } =
  songRequestSlice.actions;
export const songRequestActions = songRequestSlice.actions;
export const selectSongRequest = (state: RootState) => state.songRequest;
export const selectSongRequestPlaylist = (state: RootState) => state.songRequest.playlist;

export default songRequestSlice;
