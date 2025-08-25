import NavBar from "@components/Navbar";
import SongRequest from "@components/songRequest";
import logo from "@assets/logo.png";
import { Center } from "@mantine/core";
import UserButton from "@components/UserButton";

const Main = () => {
  return (
    <>
      <div className="app-background" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="above-bg" style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "200px",
            height: "100vh",
            borderRight: "1px solid var(--mantine-color-dark-4)",
          }}
        >
          <Center>
            <img src={logo} alt="logo" />
          </Center>
          <NavBar />
          <UserButton />
        </div>
        <SongRequest />
      </div>
    </>
  );
};

export default Main;
