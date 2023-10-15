import React, { useEffect, useState } from "react";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "./store/store.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Test from "./Test.tsx";
import { authApi } from "./services/AuthService.ts";
import { selectUserState, setUserAndAuth } from "./store/reducers/UserSlice.ts";

function App() {
  const [isReadyForLoading, setIsReadyForLoading] = useState(false);
  const [triggerRefreshToken] = authApi.useLazyRefreshTokenQuery();
  const userStore = useSelector(selectUserState);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      triggerRefreshToken()
        .unwrap()
        .then((payload) => store.dispatch(setUserAndAuth(payload)));
    } else {
      setIsReadyForLoading(true);
    }
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <MantineProvider defaultColorScheme="dark">
          {(isReadyForLoading || userStore.isAuth) && (
            <Router>
              <main className="container content">
                <Routes>
                  <Route
                    path="/"
                    element={userStore.isAuth ? <Test /> : <Login />}
                  />
                  <Route path="/login" element={<Login />} />
                  {/* Add more routes as needed */}
                </Routes>
              </main>
            </Router>
          )}
        </MantineProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
