import {Box, Center, Flex, List, NavLink, Paper, Text, Tooltip} from "@mantine/core";
import {
  IconBubbleText,
  IconCommand, IconFileInfo, IconInfoCircle,
  IconMusic,
  IconPlayerPlay,
  IconPlayerSkipForward, IconStepInto, IconTrash,
  IconVolume
} from "@tabler/icons-react";


const Help = () => {
  const ytInfo = () => {
    return <Tooltip
            color="gray"
            multiline
            withArrow
            transitionProps={{ duration: 200 }}
            label={
              <>
                <Text>YouTube видео ID</Text>
                <Text>Это уникальный идентификатор видео</Text>
                <Text>К примеру, для https://www.youtube.com/watch?v=XXXXXXXXXXX</Text>
                <Text>он будет "XXXXXXXXXXX"</Text>
              </>
            }>
              <IconInfoCircle size="1rem" stroke={1}/>
           </Tooltip>
  }

  const lightBlue = "var(--mantine-color-blue-light-color)"

  return (
    <Box display="flex" h="100vh" p="md">
      <Box w="15rem" p="xs" style={{borderRight: "1px solid var(--mantine-color-dark-4)"}}>
        <NavLink
          href="#commands"
          label="Доступные команды"
          leftSection={<IconCommand color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#zp"
          label="Заказ песни"
          leftSection={<IconMusic color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#volume"
          label="Установить громкость"
          leftSection={<IconVolume color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#playpause"
          label="Воспроизведение, пауза заказанных песен"
          leftSection={<IconPlayerPlay color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#skip"
          label="Пропустить песню"
          leftSection={<IconPlayerSkipForward color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#delete"
          label="Удалить песню по YT ID"
          leftSection={<IconTrash color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#current"
          label="Текущая песня"
          leftSection={<IconStepInto color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#info"
          label="Информация о моей песне"
          leftSection={<IconFileInfo color={lightBlue} size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="#text"
          label="Текстовые команды"
          leftSection={<IconBubbleText color={lightBlue} size="1rem" stroke={1.5} />}
        />
      </Box>

      <Box flex="1" p="xs" style={{overflowY: 'auto'}}>
        <Center>
          <h2>Помощь по командам</h2>
        </Center>
            Напомним, что стример сам выбирает, какие команды будут доступны на его канале
            и каким текстом они будут вызываться, но здесь будут описаны все команды и их
            стандартные тексты вызова.

        <Paper id="commands" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Доступные команды (!команды): </Text>
          проверяет права пользователя и присылает личным сообщением список доступных ему команд.
        </Paper>

        <Paper id="zp" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Заказ песни (!зп): </Text>
          добавляет песню в конец плейлиста. При заказе проверяются ограничения, которые
          настроил стример, а именно: количество просмотров у видео, продолжительность
          видео и количество уже заказанных песен от пользователя.
          <Text mt="xs">В качестве параметра команда принимает такие варианты:</Text>

          <List withPadding>
            <List.Item><Flex align="center">XXXXXXXXXXX {ytInfo()}</Flex></List.Item>
            <List.Item>https://www.youtube.com/watch?v=XXXXXXXXXXX</List.Item>
            <List.Item>https://youtube.com/watch?v=XXXXXXXXXXX</List.Item>
            <List.Item>youtube.com/watch?v=XXXXXXXXXXX</List.Item>
            <List.Item>https://youtu.be/XXXXXXXXXXX</List.Item>
            <List.Item>youtu.be/XXXXXXXXXXX</List.Item>
            <List.Item>https://www.youtube.com/embed/XXXXXXXXXXX</List.Item>
            <List.Item>youtube.com/embed/XXXXXXXXXXX</List.Item>
          </List>
        </Paper>

        <Paper id="volume" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Установить громкость (!гр): </Text>
          команда для управления громкостью воспроизведения песен.
          Может принимать несколько типов параметров.
          <Text mt="xs">Примеры использования:</Text>
          <List withPadding>
            <List.Item>!гр — показывает текущий уровень громкости;</List.Item>
            <List.Item>!гр 50 — устанавливает громкость на 50%;</List.Item>
            <List.Item>!гр +10 — добавляет к текущему уровню громкости 10%;</List.Item>
            <List.Item>!гр -5 — снижает текущую громкость на 5%.</List.Item>
          </List>
        </Paper>

        <Paper id="playpause" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Воспроизведение, пауза заказанных песен (!пп): </Text>
          продолжает воспроизведение или ставит на паузу, в зависимости от текущего
          состояния. Если использовать команду, когда песни воспроизводятся, то будет
          поставлена пауза, если сейчас воспроизведение на паузе, то выполнение команды
          начнет воспроизведение.
        </Paper>

        <Paper id="skip" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Пропустить песню (!скип): </Text>
          пропускает текущую песню.
        </Paper>

        <Paper id="delete" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Flex align="center">
            <Text fw={700}>Удалить песню по YT ID (!уд):&nbsp;</Text>
            удаляет песню из плейлиста по YouTube ID {ytInfo()}.
          </Flex>
          Например, команда для удаления из плейлиста видео https://www.youtube.com/watch?v=XXXXXXXXXXX
          будет выглядеть так: "!уд XXXXXXXXXXX". Делать это
          самостоятельно не очень удобно, поэтому можно просто зайти на
          публичный плейлист ( {location.origin}/ник_стримера ) и с зажатым Ctrl кликнуть по строке с песней (в любое
          место, кроме названия, т.к. это приведет к открытию видео),
          которую хотите удалить. После этого полная команда для удаления видео
          попадет к вам в буфер обмена, и останется только отправить ее в чат.
        </Paper>

        <Paper id="current" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Текущая песня (!тп): </Text>
          выводит информацию о текущей песне.
        </Paper>

        <Paper id="info" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Информация о моей песне (!мп): </Text>
          выводит информацию о том, как скоро прозвучить заказанная пользователем песня,
          на основе продолжительности песен до нее.
        </Paper>

        <Paper id="text" shadow="md" radius="md" withBorder p="md" mt="xl">
          <Text fw={700} span>Текстовые команды: </Text>
          позволяют создавать команды, выводящие текстовую информацию. Ограничение
          длины сообщения — 500 символов, поддерживается перенос строк.
        </Paper>
      </Box>
    </Box>
  );
}

export default Help;
