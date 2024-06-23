import React from "react";
import {VotingState} from "../../../models/Voting.ts";
import {Box, Button, Center, Text} from "@mantine/core";
import Countdown from "../../Countdown";
import VoteAnimation from "./Anim/VoteAnimation.tsx";
import {votingApi} from "../../../services/VotingService.ts";
import {store} from "../../../store/store.ts";
import {votingActions} from "../../../store/reducers/VotingSlice.ts";

const ResultRating: React.FC<{ voting: VotingState }> = ({ voting }) => {
  const [stopVoting] = votingApi.useStopVotingMutation();

  const getColorByNum = (vote: number): string => {
    const roundedVote = Math.round(vote); // Round vote to nearest integer
    const r = Math.round((10 - roundedVote) * 25.5);
    const g = Math.round(roundedVote * 25.5);
    return `rgb(${r},${g},0)`;
  };

  return (
    <>
    {voting.isVotingInProgress ?
      <Box ta="center">
        <Button onClick={() => stopVoting()}>Остановить</Button>
        <Countdown stopDate={voting.stopAt} />
      </Box>
      :
      <Center>
        <Button mb={25} onClick={()=> store.dispatch(votingActions.deleteVoting())}>Новое голосование</Button>
      </Center>
    }
    <Text ta="center" size="xl" fw={700}>Всего оценок: {voting.resultRating.count}</Text>

    {voting.isVotingInProgress ?
      <VoteAnimation voting={voting} getColorByNum={getColorByNum}/>
      :
      <Text ta="center" size="xl" fw={700}
            c={getColorByNum(voting.resultRating.sum / voting.resultRating.count)}
      >Результат: {(voting.resultRating.sum / voting.resultRating.count).toFixed(2)}
      </Text>
    }
    </>
  )
}

export default ResultRating;
