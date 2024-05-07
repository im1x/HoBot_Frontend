import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {SongRequestVideo} from "../models/SongRequest.ts";

export const songRequestApi = createApi({
  reducerPath: "songRequestApi",
  baseQuery: BaseQueryWithReAuth,
  tagTypes: ["playlist"],
  endpoints: (builder) => ({

    getPlaylist: builder.query<SongRequestVideo[], void>({
      query: () => ({
        url: "songrequest/playlist",
      }),
      providesTags: ["playlist"],
    }),

    skipSong: builder.mutation<null, boolean>({
      query: (isAutoSkip) => ({
        url: "songrequest/skip",
        method: "POST",
        body: isAutoSkip? {autoSkip: true} : {}
      }),
    }),

    clearPlaylist: builder.mutation<null, void>({
      query: () => ({
        url: "songrequest/playlist",
        method: "DELETE"
      }),
    }),

    removeSong: builder.mutation<null, string>({
      query: (id) => ({
        url: "songrequest/playlist/" + id,
        method: "DELETE"
      }),
      invalidatesTags: ['playlist'],
    }),

    getPublicPlaylist: builder.query<SongRequestVideo[], string>({
      query: (name) => ({
        url: "songrequest/playlist/" + name,
      }),
    }),

  }),
});
