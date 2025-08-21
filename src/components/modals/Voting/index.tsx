import StartVoting from "./StartVoting";
import {useSelector} from "react-redux";
import {selectVoting, votingActions} from "@store/reducers/VotingSlice";
import ResultVoting from "./ResultVoting";
import {votingApi} from "@services/VotingService";
import {useEffect, useState} from "react";
import {store} from "@store/store";

const Voting = () => {
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
          voting.isHaveResult && voting.type === 0 ? <ResultVoting voting={voting}/> : <StartVoting/>
        )
      }
    </>
  )
}

export default Voting;
