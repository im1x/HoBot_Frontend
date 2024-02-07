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

interface SongRequestState {
  playlist: SongRequestVideo[],
  isPlaying: boolean,
  status: string
}

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
  isPlaying: false,
  status: "stop"
};

const songRequestSlice = createSlice({
  name: "songRequest",
  initialState,
  reducers: {

    addVideo: (state, action: PayloadAction<SongRequestVideo>) => {
      console.log("---------2---------");
      console.log(action.payload);
      state.playlist.push(action.payload);
      console.log("---------3---------");
      console.log("Playlist: ", state.playlist);
    },

    skipVideo: (state) => {
      state.playlist.shift();
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
export const { addVideo, skipVideo } =
  songRequestSlice.actions;
export const songRequestActions = songRequestSlice.actions;
export const selectSongRequestPlaylist = (state: RootState) => state.songRequest.playlist;

export default songRequestSlice;
