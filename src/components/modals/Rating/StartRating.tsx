import React, {useState} from "react";
import {VotingRequest} from "@models/Voting";
import {votingApi} from "@services/VotingService";
import {Box, Button, Center, NumberInput, TextInput, Text} from "@mantine/core";
import dayjs from "dayjs";

const StartRating: React.FC = () => {
  const [votingRequest, setVotingRequest] = useState<VotingRequest>({
    type: 1,
    title: "",
    options: [],
    duration: 1,
    stopAt: ""});
  const [startVoting] = votingApi.useStartVotingMutation();

  const start = () => {
    const now = dayjs()
    votingRequest.stopAt = now.add(votingRequest.duration, "minute").add(1, "second").toISOString();

    startVoting(votingRequest);
  };

  return (
    <>
      <Text fw={700} mb="xs">Будут приниматься оценки от 1 до 10 и подсчитан конечный средний результат.</Text>
      <Center>
          <Box display="flex" w="100%">
            <TextInput flex="1" label="Заголовок:" value={votingRequest.title} onChange={e => setVotingRequest({...votingRequest, title: e.target.value})}/>
            <NumberInput ml="md" label="Длительность в минутах:" min={1} max={60} value={votingRequest.duration} onChange={e => setVotingRequest({...votingRequest, duration: e as number})} />
          </Box>
      </Center>
      <Center>
        <Button size="lg" mt="md" onClick={() => start()}>Начать</Button>
      </Center>
    </>
  )
}

export default StartRating;
