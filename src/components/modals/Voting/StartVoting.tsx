import {Button, Center, CloseButton, NumberInput, TextInput, Text, Box} from "@mantine/core";
import {votingApi} from "../../../services/VotingService.ts";
import {useMemo, useState} from "react";
import {VotingRequest} from "../../../models/Voting.ts";
import {IconPlus} from "@tabler/icons-react";
import dayjs from "dayjs";

const StartVoting = () => {
  const [votingRequest, setVotingRequest] = useState<VotingRequest>({
    type: 0,
    title: "",
    options: ["", ""],
    duration: 3,
    stopAt: ""});
  const [startVoting] = votingApi.useStartVotingMutation();

  const isReadyToStart = useMemo(() => {
    const countOptionsNotEmpty = votingRequest.options.filter(value => value !== "").length;
    return countOptionsNotEmpty >= 2;
  }, [votingRequest.options]);

  const start = () => {
    const filteredOptions = votingRequest.options.filter(option => option !== "");
    const updatedVotingRequest = { ...votingRequest, options: filteredOptions };

    const now = dayjs()
    updatedVotingRequest.stopAt = now.add(votingRequest.duration, "minute").add(1, "second").toISOString();

    startVoting(updatedVotingRequest);
  };

  return (
    <Center>
      <Box w={780}>
        <Box display="flex">
          <TextInput flex="1" label="Заголовок:" value={votingRequest.title} onChange={e => setVotingRequest({...votingRequest, title: e.target.value})}/>
          <NumberInput ml="md" label="Длительность в минутах:" min={1} max={60} value={votingRequest.duration} onChange={e => setVotingRequest({...votingRequest, duration: e as number})} />
        </Box>

        <Text mt="xl">Варианты:</Text>
        {votingRequest.options.map((value, index) => {
          return (
            <TextInput
              key={index}
              mt="xs"
              leftSection={index + 1}
              rightSection={
                <CloseButton
                  onClick={() => {
                    const newOptions = [...votingRequest.options];
                    newOptions.splice(index, 1);
                    setVotingRequest({...votingRequest, options: newOptions});
                  }}
                  style={{ display: votingRequest.options.length > 2 ? undefined : 'none' }}
                />
              }
              value={value} onChange={e => {
              const newOptions = [...votingRequest.options];
              newOptions[index] = e.target.value;
              setVotingRequest({...votingRequest, options: newOptions});
            }} />
          )
        })}

        <Button style={{ display: votingRequest.options.length < 10 ? undefined : 'none' }} leftSection={<IconPlus />} mt="md" onClick={ () => setVotingRequest({...votingRequest, options: [...votingRequest.options, ""]}) } >
          Добавить
        </Button>

        <Center>
          <Button size="lg" mt="md" disabled={!isReadyToStart} onClick={() => start()}>Начать</Button>
        </Center>
      </Box>
    </Center>
    )
};

export default StartVoting;
