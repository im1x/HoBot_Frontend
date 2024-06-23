import React, {useState} from "react";
import {VotingRequest} from "../../../models/Voting.ts";
import {votingApi} from "../../../services/VotingService.ts";
import {Box, Button, Center, NumberInput, TextInput, Text} from "@mantine/core";

const StartRating: React.FC = () => {
  const [votingRequest, setVotingRequest] = useState<VotingRequest>({
    type: 1,
    title: "",
    options: [],
    duration: 3});
  const [startVoting] = votingApi.useStartVotingMutation();

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
        <Button size="lg" mt="md" onClick={() => startVoting(votingRequest)}>Начать</Button>
      </Center>
    </>
  )
}

export default StartRating;
