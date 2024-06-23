import {votingApi} from "../../../services/VotingService.ts";
import {useEffect, useState} from "react";
import {store} from "../../../store/store.ts";
import {selectVoting, votingActions} from "../../../store/reducers/VotingSlice.ts";
import {useSelector} from "react-redux";
import StartRating from "./StartRating.tsx";
import ResultRating from "./ResultRating.tsx";

const Rating = () => {
  const voting = useSelector(selectVoting);
  const { data: votingState } = votingApi.useGetVotingStateQuery();
  const [isReadyToShow, setIsReadyToShow] = useState(false)
  useEffect(() => {
    if (votingState) {
      store.dispatch(votingActions.setVoting(votingState));
      setIsReadyToShow(true)
    }
  }, [votingState]);

  return (
    <>
      { isReadyToShow && voting.isHaveResult && voting.type === 1 ? <ResultRating voting={voting}/> : <StartRating/>}
    </>
  )
}

export default Rating;
