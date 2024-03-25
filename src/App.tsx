import { Suspense, useEffect, useState, lazy } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { store } from "./store/store.ts";
import {Route, Routes, useLocation} from "react-router-dom";
import { authApi } from "./services/AuthService.ts";
import {
  selectUserState,
  setAuthState,
  setUser,
} from "./store/reducers/UserSlice.ts";
import { webSocketActions } from "./store/reducers/WebSocketSlice.ts";
import ModalLayout from "./components/ModalLayout.tsx";
const Login = lazy(() => import('./pages/Login'));
const Main = lazy(() => import('./pages/Main'));
const PublicPlaylist = lazy(() => import('./pages/PublicPlaylist'));

function App() {
  const [isReadyForLoading, setIsReadyForLoading] = useState(false);
  const {data: currentUser, status} = authApi.useCurrentUserQuery();
  const userStore = useSelector(selectUserState);
  const location = useLocation();
  const background = location.state && location.state.background;


  useEffect(() => {
    if (currentUser) {
      store.dispatch(setUser(currentUser));
      store.dispatch(setAuthState(true));
      store.dispatch(webSocketActions.startConnecting());
    } else if (status !== "pending") {
      setIsReadyForLoading(true);
    }
  }, [status]);

  return (
    <>
      {(isReadyForLoading || userStore.isAuth) && (
        <main>
          <Suspense fallback={<></>}>
            <Routes location={background || location}>
              <Route path="/" element={userStore.isAuth ? <Main/> : <Login/>}>
                <Route path="/modal/:id" element={<ModalLayout/>}/>
              </Route>
              <Route path="/:id" element={<PublicPlaylist/>}/>
              {/* Add more routes as needed */}
            </Routes>
            {background && (
              <Routes>
                <Route path="modal/:id" element={<ModalLayout/>}/>
              </Routes>
            )}
          </Suspense>
        </main>
      )}
    </>
  );
}

export default App;
