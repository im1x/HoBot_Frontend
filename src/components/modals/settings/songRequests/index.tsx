import {settingsApi} from "../../../../services/SettingsService.ts";
import {isInRange, useForm} from "@mantine/form";
import {SettingsSongRequest} from "../../../../models/response/SettingsResponse.ts";
import {Button, Center, Checkbox, Fieldset, Flex, NumberInput, Text} from "@mantine/core";
import { useEffect } from "react";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";

const SongRequestsSettings = () => {
  const {data: songRequestsSettings} = settingsApi.useGetSongRequestsSettingsQuery();
  const [saveSongRequestsSettings] = settingsApi.useSaveSongRequestsSettingsMutation();

  const formSettings = useForm<SettingsSongRequest>({
    initialValues: {
      min_video_views: 0,
      max_requests_per_user: 0,
      max_duration_minutes: 0,
      is_users_skip_allowed: false,
      users_skip_value: 0
    },
    validate: {
      min_video_views: isInRange({ min: 1, max: 100000000 },'Значение должно быть 1 - 100 000 000'),
      max_requests_per_user: isInRange({ min: 0, max: 30 },'Значение должно быть 0 - 30'),
      users_skip_value: isInRange({ min: 1, max: 100 },'Значение должно быть 0 - 1000'),
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

        <Fieldset legend="Пропуск песен голосами пользователей" mt="lg">
          <Checkbox
            label="Разрешить пользователям пропускать песни"
            key={formSettings.key('is_users_skip_allowed') }
            {...formSettings.getInputProps('is_users_skip_allowed', { type: 'checkbox' })}
          />
          <Flex mt="xs" align="center">
              <Text size="sm">Для пропуска песни потребуется</Text>
              <NumberInput
                w="70px"
                mx="xs"
                min={1}
                max={100}
                disabled={!formSettings.values.is_users_skip_allowed}
                key={formSettings.key('users_skip_value')}
                {...formSettings.getInputProps('users_skip_value')}
              />
              <Text size="sm">голосов</Text>
          </Flex>
          {formSettings.values.is_users_skip_allowed &&
            <Text mt="sm" size="sm">После активации этой функции Вы можете перейти в Настройки =&gt;
              Команды и задать текст или смайлы для команд "Голосовать за пропуск песни" и "Голосовать в защиту песни от пропуска".
              Каждый голос за пропуск увеливает колличество голосов на 1, а каждый голос в защиту снижает.
            </Text>
          }

        </Fieldset>

        <Center mt="md">
          <Button type="submit" mt="sm">
            Сохранить
          </Button>
        </Center>
      </form>
  )
}

export default SongRequestsSettings;
