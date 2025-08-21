import {votingApi} from "@services/VotingService";
import {useEffect, useState} from "react";
import {store} from "@store/store";
import {selectVoting, votingActions} from "@store/reducers/VotingSlice";
import {useSelector} from "react-redux";
import StartRating from "./StartRating";
import ResultRating from "./ResultRating";

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
      { isReadyToShow && (
          isReadyToShow && voting.isHaveResult && voting.type === 1 ? <ResultRating voting={voting}/> : <StartRating/>
        )
      }
    </>
  )
}

export default Rating;
