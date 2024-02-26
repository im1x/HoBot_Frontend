import { Suspense, useEffect, useState, lazy } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { store } from "./store/store.ts";
import { Route, Routes, useLocation } from "react-router-dom";
import { authApi } from "./services/AuthService.ts";
import {clearAuth, selectUserState, setUserAndAuth} from "./store/reducers/UserSlice.ts";
import { webSocketActions } from "./store/reducers/WebSocketSlice.ts";
import ModalLayout from "./components/ModalLayout.tsx";
const Login = lazy(() => import('./pages/Login'));
const Test = lazy(() => import('./Test'));
const Main = lazy(() => import('./pages/Main'));
const PublicPlaylist = lazy(() => import('./pages/PublicPlaylist'));

function App() {
  const [isReadyForLoading, setIsReadyForLoading] = useState(false);
  const [triggerRefreshToken] = authApi.useLazyRefreshTokenQuery();
  const userStore = useSelector(selectUserState);
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      triggerRefreshToken()
        .then((res) => {
          if (res.isSuccess) {
            store.dispatch(setUserAndAuth(res.data));
            store.dispatch(webSocketActions.startConnecting());
          } else {
            store.dispatch(clearAuth());
            setIsReadyForLoading(true);
          }
        });
    } else {
      setIsReadyForLoading(true);
    }
  }, []);

  return (
    <>
      {(isReadyForLoading || userStore.isAuth) && (
        <main className="container content">
          <Suspense fallback={<></>}>
          <Routes location={background || location}>
            <Route path="/" element={userStore.isAuth ? <Main /> : <Login />}>
              <Route path="/modal/:id" element={<ModalLayout />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<PublicPlaylist />} />
            <Route path="/test" element={<Test />} />
            {/* Add more routes as needed */}
          </Routes>
          {background && (
            <Routes>
              <Route path="modal/:id" element={<ModalLayout />} />
            </Routes>
          )}
          </Suspense>
        </main>
      )}
    </>
  );
}

export default App;
