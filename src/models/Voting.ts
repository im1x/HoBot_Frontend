export interface VotingRequest {
  type: number;
  title: string;
  duration: number;
  options: string[];
}

export interface VotingResult {
  label: string;
  count: number;
}

export interface RatingResult {
  count: number;
  sum: number;
}

export interface Vote {
  name: string;
  vote: number;
}

export interface VotingState {
  type: number;
  isVotingInProgress: boolean;
  isHaveResult: boolean;
  title: string;
  resultVoting: VotingResult[];
  resultRating: RatingResult;
  votes: Vote[];
  stopAt: string;
}
