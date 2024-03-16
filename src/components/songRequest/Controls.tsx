import {ActionIcon, Center, Flex, Paper, RingProgress, Slider} from "@mantine/core";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipForward,
  IconPlayerStop,
  IconPlaylistOff,
  IconVolume
} from "@tabler/icons-react";
import React from "react";
import {songRequestActions} from "../../store/reducers/SongRequestSlice.ts";
import {store} from "../../store/store.ts";
import {SongRequestState} from "../../models/SongRequest.ts";
import {modals} from "@mantine/modals";

const Controls: React.FC<{ songRequest: SongRequestState, skipVideo: () => void, clearPlaylist: () => void}> = ({ songRequest, skipVideo, clearPlaylist }) => {
  const openModalClearPlaylist = () => modals.openConfirmModal({
    title: 'Очистить плейлист?',
    centered: true,
    labels: { confirm: 'Да', cancel: 'Отмена' },
    onConfirm: () => clearPlaylist(),
  });
  
  return (
    <Paper bg="rgba(0, 0, 0, .3)" withBorder py="sm">
      <Flex
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        pos={"relative"}
      >
        <ActionIcon variant="transparent" size="lg" aria-label="Stop" onClick={() => {store.dispatch(songRequestActions.stopPlaying())}}>
          <IconPlayerStop style={{ width: '100%', height: '100%' }} stroke={1.5} />
        </ActionIcon>

        <RingProgress
          roundCaps
          thickness={8}
          sections={[{ value: Math.round(songRequest.progress * 100), color: 'blue' }]}
          label={
            <ActionIcon variant="transparent" size={55} aria-label="Play\Pause" ml="16px" mt="5px" onClick={() => {store.dispatch(songRequestActions.togglePlay())}}>
              {songRequest.isPlaying ?
              <IconPlayerPause style={{ width: '100%', height: '100%' }} stroke={1.5} />
              :
              <IconPlayerPlay style={{ width: '100%', height: '100%' }} stroke={1.5} />}
            </ActionIcon>
          }
        />

        <ActionIcon variant="transparent" size="lg" aria-label="Skip" onClick={skipVideo}>
          <IconPlayerSkipForward style={{ width: '100%', height: '100%' }} stroke={1.5} />
        </ActionIcon>

        <ActionIcon pos={"absolute"} top={-3} right={10} variant="transparent" size="lg" aria-label="Skip" onClick={openModalClearPlaylist}>
          <IconPlaylistOff style={{ width: '100%', height: '100%' }} stroke={1.5} />
        </ActionIcon>
      </Flex>

      <Center>
        <Slider
          thumbChildren={<IconVolume size="1rem" />}
          miw={220}
          color="blue"
          size="lg"
          value={songRequest.volume}
          onChange={ (volume) => store.dispatch(songRequestActions.setVolume(volume))}
        />
      </Center>

    </Paper>
  )
}

export default Controls;
