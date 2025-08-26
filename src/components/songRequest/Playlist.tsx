import React, {useCallback} from "react";
import {SongRequestVideo} from "@models/SongRequest";
import styles from "./Playlist.module.css";
import {ActionIcon, Anchor, Box, Divider, Flex, Paper, Text, ThemeIcon, Tooltip} from "@mantine/core";
import {
  IconClockHour4,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {songRequestApi} from "@services/SongRequestService";
import { AnimatePresence, motion, Variants } from "framer-motion";

dayjs.extend(duration)

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.995,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

const Playlist: React.FC<{ playlist: SongRequestVideo[] }> = ({ playlist }) => {
  const [ removeSong ] = songRequestApi.useRemoveSongMutation();

  const totalDuration = useCallback(() => {
    const totalSeconds = playlist.reduce((a, b) => a + b.length, 0);
    const format = totalSeconds >= 3600 ? "H:mm:ss" : "mm:ss";
    return dayjs.duration(totalSeconds * 1000).format(format);
  }, [playlist]);

  return (
    <Box bg="rgba(0, 0, 0, .3)" miw={440}>
      <AnimatePresence initial={false} mode="popLayout">
        {playlist.slice(0, 10).map((video: SongRequestVideo, index) => (
          <motion.div
            key={video.id}
            layout
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ display: "block" }}
          >
            <Tooltip
              color="gray"
              multiline
              w={350}
              withArrow
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
                className={styles.playlistElement}
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
                { index !== 0 &&
                  <Flex className={styles.hide}>
                    <ActionIcon pos={"absolute"} top={-4} right={-3} c={"red"} variant="default" size="lg" aria-label="Remove song" onClick={() => {removeSong(video.id)}}>
                      <IconTrash style={{ width: '100%', height: '100%' }} stroke={1.5} />
                    </ActionIcon>
                  </Flex>
                }
              </Paper>
            </Tooltip>
          </motion.div>
        ))}
      </AnimatePresence>
      <Divider size="md"/>
      <Text span ml="md">Заполнение плейлиста: {playlist.length}\30</Text>
      <Text span ml="xl">(Общее время: {totalDuration()})</Text>
    </Box>
  );
};

export default Playlist;
