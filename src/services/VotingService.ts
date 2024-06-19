import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "./BaseQueryWithReAuth.ts";
import {VotingRequest, VotingState} from "../models/Voting.ts";

export const votingApi = createApi({
  reducerPath: "votingApi",
  baseQuery: BaseQueryWithReAuth,
  //tagTypes: ["voting"],
  endpoints: (builder) => ({

    startVoting: builder.mutation<null, VotingRequest>({
      query: (votingRequest) => ({
        url: "voting/start",
        method: "POST",
        body: votingRequest,
      }),
    }),

    stopVoting: builder.mutation<null, void>({
      query: () => ({
        url: "voting/stop",
        method: "POST",
      }),
    }),

    getVotingState: builder.mutation<VotingState, null>({
      query: () => ({
        url: "voting",
        method: "GET",
      }),
    }),

  }),
});
