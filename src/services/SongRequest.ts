import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {SongRequestVideo} from "../models/SongRequest.ts";

// Define a service using a base URL and expected endpoints
export const songRequestApi = createApi({
  reducerPath: "songRequestApi",
  baseQuery: BaseQueryWithReAuth,
  endpoints: (builder) => ({

    getPlaylist: builder.query<SongRequestVideo[], void>({
      query: () => ({
        url: "songrequest/playlist",
      }),
    }),


  }),
});
