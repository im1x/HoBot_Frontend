import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {Vote, VotingState} from "../../models/Voting.ts";

/*interface VotingState {
  type: number;
  isVotingInProgress: boolean;
  title: string;
  stopAt: number;
  resultVoting: string
  resultRating: number
}*/

const initialState: VotingState = {
  type: 0,
  isVotingInProgress: false,
  isHaveResult: false,
  title: "",
  resultVoting: [],
  resultRating: 0,
  stopAt: ""
};

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    setVoting: (state, action: PayloadAction<VotingState | null>) => {
      if (action.payload != null) {
        console.log("setVoting")
        //state = action.payload;
        state.type = action.payload.type;
        state.isVotingInProgress = action.payload.isVotingInProgress;
        state.isHaveResult = action.payload.isHaveResult
        state.title = action.payload.title;
        state.stopAt = action.payload.stopAt;
        state.resultVoting = action.payload.resultVoting;
        state.resultRating = action.payload.resultRating
      }
      console.log(state, action)
    },

    deleteVoting: (state) => {
      if (state.isHaveResult) {
        state.type = 0;
        state.isVotingInProgress = false;
        state.isHaveResult = false
        state.title = "";
        state.stopAt = "";
        state.resultVoting = [];
        state.resultRating = 0
      }
    },

    vote: (state, action: PayloadAction<Vote>) => {
      if (state.type == 0) {
        state.resultVoting[action.payload.vote-1].count += 1;
      } else {
        console.log("Rating")
      }
    },
  },
});
export const votingActions = votingSlice.actions;
export const selectVoting = (state: RootState) => state.voting;

export default votingSlice;
