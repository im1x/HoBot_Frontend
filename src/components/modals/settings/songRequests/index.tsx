import {settingsApi} from "../../../../services/SettingsService.ts";
import {isInRange, useForm} from "@mantine/form";
import {SettingsSongRequest} from "../../../../models/response/SettingsResponse.ts";
import {Button, Center, NumberInput} from "@mantine/core";
import { useEffect } from "react";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";

const SongRequestsSettings = () => {
  const {data: songRequestsSettings} = settingsApi.useGetSongRequestsSettingsQuery();
  const [saveSongRequestsSettings] = settingsApi.useSaveSongRequestsSettingsMutation();

  const formSettings = useForm<SettingsSongRequest>({
    validate: {
      min_video_views: isInRange({ min: 1, max: 100000000 },'Значение должно быть 1 - 100 000 000'),
      max_requests_per_user: isInRange({ min: 0, max: 30 },'Значение должно быть 0 - 30'),
    },
  });

  useEffect(() => {
    if (songRequestsSettings) {
      formSettings.setValues(songRequestsSettings);
    }
  }, [songRequestsSettings]);

  const onSubmit = () => {
    saveSongRequestsSettings(formSettings.getValues()).then((res) => {
      if ("error" in res) {
        notifications.show({
          message: "Ошибка изменения",
          color: "red",
          icon: <IconX />,
        });
      } else {
        notifications.show({
          message: "Измененно",
          color: "green",
          icon: <IconCheck />,
        });
      }
  });
  };

  return (
      <form onSubmit={formSettings.onSubmit(() => onSubmit())}>
        <NumberInput
          mt="sm"
          label="Минимальное количество просмотров у видео для заказа"
          min={1}
          max={100000000}
          step={1000}
          key={formSettings.key('min_video_views')}
          {...formSettings.getInputProps('min_video_views')}
        />
        <NumberInput
          mt="sm"
          label="Максимальная продолжительность видео в минутах (0 - без лимита)"
          min={0}
          max={60}
          key={formSettings.key('max_duration_minutes')}
          {...formSettings.getInputProps('max_duration_minutes')}
        />
        <NumberInput
          mt="sm"
          label="Допустимое количество заказов от одного пользователя на плейлист (0 - без лимита)"
          min={0}
          max={30}
          key={formSettings.key('max_requests_per_user')}
          {...formSettings.getInputProps('max_requests_per_user')}
        />
        <Center mt="md">
          <Button type="submit" mt="sm">
            Сохранить
          </Button>
        </Center>
      </form>
  )
}

export default SongRequestsSettings;
