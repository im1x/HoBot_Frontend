import { Suspense, useEffect, useState, lazy } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { store } from "@store/store";
import {Route, Routes, useLocation, useNavigate} from "react-router";
import { authApi } from "@services/AuthService";

import {
  selectUserState,
  setAuthState,
  setUser,
} from "@store/reducers/UserSlice";
import { webSocketActions } from "@store/reducers/WebSocketSlice";
import ModalLayout from "@components/ModalLayout";
import Help from "@pages/Help";
const Login = lazy(() => import('@pages/Login'));
const Main = lazy(() => import('@pages/Main'));
const PublicPlaylist = lazy(() => import('@pages/PublicPlaylist'));

function App() {
  const [isReadyForLoading, setIsReadyForLoading] = useState(false);
  const {data: currentUser, status} = authApi.useCurrentUserQuery();
  const userStore = useSelector(selectUserState);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const isModalRoute = () => location.pathname.includes("/modal/");

  useEffect(() => {
    if (isModalRoute()) {
      navigate(location.pathname, { state: { background: location } });  // Adjust the background path as needed
    }
  }, []);

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
                <Route path="modal">
                  <Route path=":id" element={<ModalLayout />} />
                </Route>
              </Route>
              <Route path="/:id" element={<PublicPlaylist/>}/>
              <Route path="/p/help" element={<Help/>}/>
              {/* Add more routes as needed */}
            </Routes>
            {background && (
              <Routes>
                <Route path="modal">
                  <Route path=":id" element={<ModalLayout />} />
                </Route>
              </Routes>
            )}
          </Suspense>
        </main>
      )}
    </>
  );
}

export default App;
