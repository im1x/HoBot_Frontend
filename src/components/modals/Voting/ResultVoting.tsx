import { VotingState } from "../../../models/Voting.ts";
import React, {useMemo, useState} from "react";
import Countdown from "../../Countdown";
import {Box, Button, Center, Checkbox, Flex, Group, Text} from "@mantine/core";
import { votingApi } from "../../../services/VotingService.ts";
import VotingShowResults from "./VotingShowResults.tsx";
import Pie from "../../Nivo/Pie.tsx";
import {votingActions} from "../../../store/reducers/VotingSlice.ts";
import {store} from "../../../store/store.ts";
import HideResultVoting from "./HideResultVoting.tsx";

const ResultVoting: React.FC<{ voting: VotingState }> = ({ voting }) => {
  const colors = ['#FF6347', '#32CD32', '#4682B4', '#FF69B4', '#8B4513', '#9932CC', '#2E8B57', '#FFC300', '#8B0000', '#20B2AA'];
  const [stopVoting] = votingApi.useStopVotingMutation();
  const [isHideResult, setIsHideResult] = useState(false);

  const totalVotes = useMemo(() => {
    return voting.resultVoting.reduce((sum, result) => sum + result.count, 0);
  }, [voting.resultVoting]);

  return (
    <>
      {voting.isVotingInProgress ?
          <Box ta="center">
            <Group align="center" display="inline-flex">
              <Button mb={2} onClick={() => stopVoting()}>Остановить</Button>
              <Checkbox label="Скрыть результаты до окончания"
                        checked={isHideResult}
                        onChange={(event) => setIsHideResult(event.currentTarget.checked)}/>
            </Group>
            <Countdown stopDate={voting.stopAt} />
          </Box>
      :
        <Center>
          <Button onClick={()=> store.dispatch(votingActions.deleteVoting())}>Новое голосование</Button>
        </Center>
      }

      {voting.title !== "" &&
        <Text ta="center" size="xl" fw={700}>Заголовок: {voting.title}</Text>
      }
      <Text ta="center" size="xl" fw={700}>Всего голосов: {totalVotes}</Text>

      <Flex justify="space-evenly" align="center" m="lg">
        {!isHideResult || !voting.isVotingInProgress ?
            <>
              <Box flex="1">
                <VotingShowResults votingResults={voting.resultVoting} totalVotes={totalVotes} colors={colors}/>
              </Box>
                <Box w="50%" h="350px" style={totalVotes > 0 ? {} : { visibility: 'hidden' }}>
                  <Pie data={voting.resultVoting} colors={colors}/>
                </Box>
            </>
          :
            <HideResultVoting votingResults={voting.resultVoting}/>
        }

      </Flex>

    </>
  );
};

export default ResultVoting;
