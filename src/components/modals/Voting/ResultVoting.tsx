import { VotingState } from "../../../models/Voting.ts";
import React from "react";
import Countdown from "../../Countdown";
import {Box, Button, Center, Flex, Text} from "@mantine/core";
import { votingApi } from "../../../services/VotingService.ts";
import VotingShowResults from "../../VotingShowResults";
import Pie from "../../Nivo/Pie.tsx";
import {votingActions} from "../../../store/reducers/VotingSlice.ts";
import {store} from "../../../store/store.ts";

const ResultVoting: React.FC<{ voting: VotingState }> = ({ voting }) => {
  const [stopVoting] = votingApi.useStopVotingMutation();

  return (
    <>
      {voting.isVotingInProgress ?
          <Box ta="center">
            <Button mb={2} onClick={() => stopVoting()}>Остановить</Button>
            <Countdown stopDate={voting.stopAt} />
          </Box>
      :
        <Center>
          <Button onClick={()=> store.dispatch(votingActions.deleteVoting())}>Новое голосование</Button>
        </Center>
      }


      <Text ta="center" size="xl" fw={700}>{voting.title}</Text>

      <Flex justify="space-evenly" align="center" m="lg">
        <Box flex="1">
          <VotingShowResults votingResults={voting.resultVoting}/>
        </Box>
        <Box w="50%" h="350px">
          <Pie data={voting.resultVoting} />
        </Box>
      </Flex>

    </>
  );
};

export default ResultVoting;
