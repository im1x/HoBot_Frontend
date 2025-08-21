import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseQueryWithReAuth} from "@services/BaseQueryWithReAuth";
import {VotingRequest, VotingState} from "@models/Voting";

export const votingApi = createApi({
  reducerPath: "votingApi",
  baseQuery: BaseQueryWithReAuth,
  refetchOnMountOrArgChange: true,
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

    getVotingState: builder.query<VotingState, void>({
      query: () => ({
        url: "voting",
      }),
    }),

  }),
});
