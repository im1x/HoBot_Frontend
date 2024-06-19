import {useParams} from "react-router-dom";
import {songRequestApi} from "../services/SongRequestService.ts";
import { useEffect, useState } from "react";
import {Anchor, Box, Table} from "@mantine/core";
import {SongRequestVideo} from "../models/SongRequest.ts";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {notifications} from "@mantine/notifications";
import {IconCheck} from "@tabler/icons-react";

const PublicPlaylist = () => {
  dayjs.extend(duration)
  const { id = '' } = useParams();
  const [getPublicPlaylist] = songRequestApi.useLazyGetPublicPlaylistQuery();
  const [history, setHistory] = useState<SongRequestVideo[]>();
  const [playlist, setPlaylist] = useState<SongRequestVideo[]>();

  useEffect(() => {
    if (id) {
      getPublicPlaylist(id).then((pl) => {
          setHistory(pl.data?.history);
          setPlaylist(pl.data?.playlist);
      });
    }
  }, [id]);

  let currentDuration = 0;

  const copyToClipboard = (event: any, id: string) => {
    if (event.ctrlKey && id !== playlist?.[0]?.yt_id) {
      try {
        navigator.clipboard.writeText("!уд " + id).then(() => {
          notifications.show({
            message: "Скопировано",
            color: "green",
            icon: <IconCheck />,
          });
        });
      } catch (error) {
        console.error('Failed to copy: ', error);
      }
    }
  }

  const rowsHistory = history?.map((video: SongRequestVideo) => {
    return (
      <Table.Tr key={video.requested + video.yt_id} opacity="0.5">
        <Table.Td>
          <Anchor href={`https://youtube.com/watch?v=${video.yt_id}`} target="_blank" c="var(--mantine-color-text)">
            {video.title}
          </Anchor>
        </Table.Td>
        <Table.Td>{dayjs.duration(video.length * 1000).format("mm:ss")}</Table.Td>
        <Table.Td>{video.views.toLocaleString("ru-RU")}</Table.Td>
        <Table.Td>{video.by}</Table.Td>
        <Table.Td>Уже была</Table.Td>
      </Table.Tr>
    );
  });

  const rowsPlaylist = playlist?.map((video: SongRequestVideo, index) => {
    if (index !== 0) {
      currentDuration += playlist[index-1]?.length;
    }
    return (
      <Table.Tr key={video.requested + video.yt_id}
                onClick={ event => copyToClipboard(event, video.yt_id)}
                bg={index === 0 ? "var(--mantine-color-blue-filled)" : undefined}>
        <Table.Td>
          <Anchor href={`https://youtube.com/watch?v=${video.yt_id}`} target="_blank" c="var(--mantine-color-text)">
            {video.title}
          </Anchor>
        </Table.Td>
        <Table.Td>{dayjs.duration(video.length * 1000).format("mm:ss")}</Table.Td>
        <Table.Td>{video.views.toLocaleString("ru-RU")}</Table.Td>
        <Table.Td>{video.by}</Table.Td>
        <Table.Td>{dayjs.duration(currentDuration * 1000).format("HH:mm:ss")}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box p={10}>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={"40%"}>Название</Table.Th>
            <Table.Th w={"15%"}>Продолжительность</Table.Th>
            <Table.Th w={"15%"}>Просмотры</Table.Th>
            <Table.Th w={"15%"}>Заказал</Table.Th>
            <Table.Th w={"15%"}>Время до песни ~</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rowsHistory}{rowsPlaylist}</Table.Tbody>
      </Table>
    </Box>
  )
}

export default PublicPlaylist;
