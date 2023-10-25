import { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { store } from "./store/store.ts";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Test from "./Test.tsx";
import { authApi } from "./services/AuthService.ts";
import { selectUserState, setUserAndAuth } from "./store/reducers/UserSlice.ts";
import Main from "./pages/Main.tsx";
import { ModalLayout } from "./components/ModalLayout.tsx";

function App() {
  const [isReadyForLoading, setIsReadyForLoading] = useState(false);
  const [triggerRefreshToken] = authApi.useLazyRefreshTokenQuery();
  const userStore = useSelector(selectUserState);
  const location = useLocation();
  const background = location.state && location.state.background;

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
    <>
      {(isReadyForLoading || userStore.isAuth) && (
        <main className="container content">
          <Routes location={background || location}>
            <Route path="/" element={userStore.isAuth ? <Main /> : <Login />}>
              <Route path="/modal/:id" element={<ModalLayout />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            {/* Add more routes as needed */}
          </Routes>
          {background && (
            <Routes>
              <Route path="modal/:id" element={<ModalLayout />} />
            </Routes>
          )}
        </main>
      )}
    </>
  );
}

export default App;
