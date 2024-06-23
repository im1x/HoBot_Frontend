import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {Vote, VotingState} from "../../models/Voting.ts";

const initialState: VotingState = {
  type: 0,
  isVotingInProgress: false,
  isHaveResult: false,
  title: "",
  resultVoting: [],
  resultRating: {count: 0, sum: 0},
  votes: [],
  stopAt: ""
};

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    setVoting: (state, action: PayloadAction<VotingState>) => {
        state.type = action.payload.type;
        state.isVotingInProgress = action.payload.isVotingInProgress;
        state.isHaveResult = action.payload.isHaveResult;
        state.title = action.payload.title;
        state.stopAt = action.payload.stopAt;
        state.resultVoting = action.payload.resultVoting;
        state.resultRating = action.payload.resultRating;
    },

    deleteVoting: (state) => {
      if (state.isHaveResult) {
        state.type = 0;
        state.isVotingInProgress = false;
        state.isHaveResult = false;
        state.title = "";
        state.stopAt = "";
        state.resultVoting = [];
        state.resultRating = {count: 0, sum: 0};
        state.votes = [];
      }
    },

    vote: (state, action: PayloadAction<Vote>) => {
      console.log("VOTE")
      if (state.type == 0) {
        state.resultVoting[action.payload.vote-1].count += 1;
      } else {
        console.log("Rating")
        console.log(action.payload);
        state.resultRating.count += 1;
        state.resultRating.sum += action.payload.vote;
        state.votes.push(action.payload);
      }
    },

    deleteVotes: (state, action: PayloadAction<number>) => {
      state.votes = state.votes.slice(action.payload);
    },

  },
});
export const votingActions = votingSlice.actions;
export const selectVoting = (state: RootState) => state.voting;

export default votingSlice;
