import {
  Text,
  Paper,
  Button,
  Image, Center, Box, List, Spoiler,
} from '@mantine/core';

import {Link, useSearchParams} from "react-router-dom";
import logo from "../assets/logo.png";
import vkplLogo from "../assets/vkpl.png";
import StatusNotStreamer from "../components/StatusNotStreamer.tsx";
const Login = () => {
  const [queryParameters] = useSearchParams();
  const redirect_uri = "https://auth.vkplay.live/app/oauth2/authorize?client_id=c99moea4ax1945tr&redirect_uri=" + import.meta.env.VITE_API_URL + "vkpl&response_type=code";
  return (
    <Center mih="100vh">
      <Box>
       {queryParameters.get("s") == "1" && (
         <StatusNotStreamer/>
       )}
       <Paper maw={750} radius="md" m="lg" p="xl" pt="md" withBorder>
         <Center>
           <img src={logo} alt="logo" />
         </Center>

         <Spoiler maxHeight={90} showLabel="Подробности" hideLabel="Скрыть">
           <Text size="lg" ta={"center"} fw={500} mb="lg">
             Это бот дл VK Play Live. Он позволяет зрителям заказывать видео с YouTube, а стримерам делать голосования и создавать свои команды.
           </Text>

           <List mt={40} fw={500} maw={640} listStyleType="disc">
             <List.Item>
               Заказ музыки с YouTube:
               <List withPadding listStyleType="disc">
                 <List.Item>Зрители могут заказывать музыку которая прозвучит на стриме;</List.Item>
                 <List.Item>Стример может настраивать параметры ограничений заказов;</List.Item>
                 <List.Item>Не только стример, но и модераторы (по желанию) могут управлять воспрозведением заказов музыки,
                   пропуская некоторые песни, изменяя громкость воспроизведения и ставя музыку на паузу;</List.Item>
                 <List.Item>Зрители могут прямо в чате получить информацию о текущей песне или узнать через сколько
                   прозвучит заказанная ими песня;</List.Item>
                 <List.Item>Отдельная страничка для отображения прошлых и будующих песен;</List.Item>
               </List>
             </List.Item>

             <List.Item mt={10}>
               Голосование, 2 типа:
               <List withPadding listStyleType="disc">
                 <List.Item>Голосование за один из вариантов;</List.Item>
                 <List.Item>Голосование для вычисления средней оценки от чата (к примеру оценить фильм);</List.Item>
               </List>
             </List.Item>

             <List.Item mt={10}>
               Информационные команды. Стример может создавать произвольные команды для вывода текста
               (к примеру информация о социальных сетях стримера);
             </List.Item>

             <List.Item mt={10}>
               Гибкая настройка всех команд;
             </List.Item>

             <List.Item mt={10}>
               Обратная связь. Будем рады узнать Ваши предложения и пожелания;
             </List.Item>

           </List>
           <Text mt={30} ta="center" c="orange">Помните, что для нормальной работы бота ему необходимы права модератора!</Text>
           <Text mb={15} ta="center" c="orange">Выдать права боту можно командой "/mod channel HoBOT"</Text>
         </Spoiler>
        <Center>
          <Link to={redirect_uri}>
            <Button size="lg" color="#0077ff">
              <Image
                mr="md"
                w="45px"
                fit="contain"
                src={vkplLogo}
              />
              Войти
            </Button>
          </Link>
        </Center>
      </Paper>
      </Box>
    </Center>

);
};

export default Login;
