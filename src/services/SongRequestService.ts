import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {SongRequestVideo} from "../models/SongRequest.ts";

export const songRequestApi = createApi({
  reducerPath: "songRequestApi",
  baseQuery: BaseQueryWithReAuth,
  endpoints: (builder) => ({

    getPlaylist: builder.query<SongRequestVideo[], void>({
      query: () => ({
        url: "songrequest/playlist",
      }),
    }),

    skipSong: builder.mutation<null, void>({
      query: () => ({
        url: "songrequest/skip",
        method: "POST"
      }),
    }),

    clearPlaylist: builder.mutation<null, void>({
      query: () => ({
        url: "songrequest/playlist",
        method: "DELETE"
      }),
    }),

    getPublicPlaylist: builder.query<SongRequestVideo[], string>({
      query: (name) => ({
        url: "songrequest/playlist/" + name,
      }),
    }),

  }),
});
