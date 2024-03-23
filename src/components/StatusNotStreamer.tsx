import { Paper, Text } from "@mantine/core";

const StatusNotStreamer = () => {
  return (
    <Paper maw={450} mb={50} radius="md" p="xl"  withBorder>
        <Text size="lg" ta={"center"} fw={500} mb="xs" c="red">
          Ты не стример, у тебя нет канала.
        </Text>
        <Text size="lg" ta={"center"} fw={500} mb="xs" c="red">
          Сервис доступен только стримерам!
        </Text>
    </Paper>
  );
};

export default StatusNotStreamer;
