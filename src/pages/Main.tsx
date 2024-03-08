import NavBar from "../components/Navbar";
import SongRequest from "../components/songRequest";
import logo from "../assets/logo.jpg";
import {Center} from "@mantine/core";
const Main = () => {
  return (
  <div style={{display: "flex"}}>
    <div>
      <Center>
        <img src={logo} alt="logo" />
      </Center>
      <NavBar/>
    </div>
    <SongRequest/>
  </div>
  );
};

export default Main;
