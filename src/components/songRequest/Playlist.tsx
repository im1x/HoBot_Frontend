import React, {useCallback} from "react";
import {SongRequestVideo} from "../../models/SongRequest.ts";
import {Anchor, Box, Divider, Paper, Text, ThemeIcon, Tooltip} from "@mantine/core";
import {IconClockHour4, IconEye} from "@tabler/icons-react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)
const Playlist: React.FC<{ playlist: SongRequestVideo[] }> = ({ playlist }) => {

    const totalDuration = useCallback(() => {
      const totalSeconds = playlist.reduce((a, b) => a + b.length, 0);
      const format = totalSeconds >= 3600 ? "H:mm:ss" : "mm:ss";
      return dayjs.duration(totalSeconds * 1000).format(format);
    }, [playlist]);

  return (
    <Box bg="rgba(0, 0, 0, .3)" miw={440} maw={{ md: 440, lg: 700 }}>
      {playlist.slice(0, 10).map((video: SongRequestVideo, index) => (
        <Tooltip
          color="gray"
          multiline
          w={350}
          withArrow
          key={index}
          transitionProps={{ duration: 200 }}
          label={
            <>
              <Text>Заказал: {video.by}</Text>
              <Text>Время заказа: {dayjs(video.requested).format("HH:mm:ss DD.MM.YYYY")}</Text>
              <Text>Название: {video.title}</Text>
              <Text>Продолжительность: {dayjs.duration(video.length*1000).format("mm:ss")}</Text>
              <Text>Просмотров: {video.views.toLocaleString("ru-RU")}</Text>
            </>
          }
        >
          <Paper
            radius="md"
            withBorder p="5px"
            display="flex"
            key={index}
            bg={index === 0 ? "var(--mantine-color-blue-filled)" : undefined}>
              <Anchor href={`https://youtube.com/watch?v=${video.yt_id}`} target="_blank" ml="xs" c="var(--mantine-color-text)" truncate="end" w={"100%"}>
                {video.title}
              </Anchor>
              &nbsp;(
              <ThemeIcon variant="transparent" mt="-1px" size="26px">
                <IconClockHour4 style={{ width: '90%', height: '80%'}} stroke={1.5} />
              </ThemeIcon>
              { dayjs.duration(video.length*1000).format("mm:ss") }
              <ThemeIcon variant="transparent" mt="-2px">
                <IconEye style={{ width: '90%', height: '90%' }} stroke={1.5} />
              </ThemeIcon>
              { video.views.toLocaleString("ru-RU") })
          </Paper>
        </Tooltip>
      ))}
      <Divider size="md"/>
      <Text span ml="md">Заполнение плейлиста: {playlist.length}\30</Text>
      <Text span ml="xl">(Общее время: {totalDuration()})</Text>
    </Box>
  );
};

export default Playlist;
