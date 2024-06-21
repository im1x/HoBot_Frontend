import StartVoting from "./StartVoting.tsx";
import {useSelector} from "react-redux";
import {selectVoting, votingActions} from "../../../store/reducers/VotingSlice.ts";
import ResultVoting from "./ResultVoting.tsx";
import {votingApi} from "../../../services/VotingService.ts";
import {useEffect, useState} from "react";
import {store} from "../../../store/store.ts";

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
      { isReadyToShow && voting.isHaveResult ? <ResultVoting voting={voting}/> : <StartVoting/>}
    </>
  )
}

export default Voting;
