import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { authApi } from "./services/AuthService.ts";
import { IRegistration } from "./models/Registration.ts";
import { selectUserState, setUserAndAuth } from "./store/reducers/UserSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import {Button} from "@mantine/core";

function App() {
  const [count, setCount] = useState(0);
  const [registerUser, { data: newUser, isSuccess }] =
    authApi.useRegisterMutation();
  const [isReadyForFetch, setIsReadyForFetch] = useState(true);
  const { data: testData, status, refetch } = authApi.useGetTestDataQuery(undefined, {
    skip: isReadyForFetch,
  });
  const userStore = useSelector(selectUserState);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(newUser);
    dispatch(setUserAndAuth(newUser));
  }, [newUser]);

  const handleRegister = async () => {
    await registerUser({
      login: "test",
      password: "testpass",
    } as IRegistration);
    /*    const tmp = newUser;
    console.log(tmp);
    dispatch(setUserAndAuth(tmp));*/
  };

  const handleGet = async () => {
    setIsReadyForFetch(false);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <Button className="btn" onClick={handleRegister}>
          Test
        </Button>
        <Button className="btn" onClick={handleGet}>
          get data
        </Button>
        <Button className="btn" onClick={() => refetch()}>
          Refetch
        </Button>
        {userStore && userStore.user ? (
          <div>
            <h2>User Data:</h2>
            <p>Name: {userStore.user.id}</p>
            <p>Email: {userStore.user.login}</p>
            {/* Add more user data fields as needed */}
          </div>
        ) : (
          <p>No user data available.</p>
        )}
        <div>{isSuccess}</div>
        {newUser && (
          <div>
            <h1>Data:</h1>
            <pre>{JSON.stringify(newUser.User, null, 2)}</pre>
          </div>
        )}
      </div>
      {testData?.toString()} - {status}
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
