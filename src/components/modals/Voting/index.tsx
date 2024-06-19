import StartVoting from "./StartVoting.tsx";
import {useSelector} from "react-redux";
import {selectVoting} from "../../../store/reducers/VotingSlice.ts";
import ResultVoting from "./ResultVoting.tsx";

const Voting = () => {
  const voting = useSelector(selectVoting)
  return (
    <>
      {voting.isHaveResult ? <ResultVoting voting={voting}/> : <StartVoting/>}
    </>
  )
}

export default Voting;
