import {useParams} from "react-router-dom";
import {songRequestApi} from "../services/SongRequestService.ts";
import { useEffect, useState } from "react";
import {Anchor, Box, Table} from "@mantine/core";
import {SongRequestVideo} from "../models/SongRequest.ts";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

const PublicPlaylist = () => {
  dayjs.extend(duration)
  const { id = '' } = useParams();
  const [getPublicPlaylist] = songRequestApi.useLazyGetPublicPlaylistQuery();
  const [playlist, setPlaylist] = useState<SongRequestVideo[]>();

  useEffect(() => {
    if (id) {
      getPublicPlaylist(id).then((pl) => {
          setPlaylist(pl.data);
      });
    }
  }, [id]);

  let currentDuration =- (playlist?.[0]?.length ?? 0);

  const rows = playlist?.map((video: SongRequestVideo) => {
    currentDuration += video.length;
    return (
      <Table.Tr key={video.requested + video.yt_id}>
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
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  )
}

export default PublicPlaylist;
