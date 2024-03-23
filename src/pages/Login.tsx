import {
  Text,
  Paper,
  Button,
  Image, Center, Box,
} from '@mantine/core';

import {Link, useSearchParams} from "react-router-dom";
import logo from "../assets/logo.png";
import vkplLogo from "../assets/vkpl.png";
import StatusNotStreamer from "../components/StatusNotStreamer.tsx";
const Login = () => {
  const [queryParameters] = useSearchParams();
  return (
    <Center h="100vh">
      <Box>
       {queryParameters.get("s") == "1" && (
         <StatusNotStreamer/>
       )}
       <Paper maw={450} radius="md" p="xl" pt="md" withBorder>
         <Center>
           <img src={logo} alt="logo" />
         </Center>
        <Text size="lg" ta={"center"} fw={500} mb="lg">
          Это бот дл VK Play Live. Он позволяет зрителям заказывать видео с YouTube, а стримерам создавать свои команды.
        </Text>
        <Center>
          <Link to="https://auth.vkplay.live/app/oauth2/authorize?client_id=c99moea4ax1945tr&redirect_uri=http://localhost:5173/api/vkpl&response_type=code">
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
