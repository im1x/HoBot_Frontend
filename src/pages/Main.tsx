import { webSocketActions } from "../store/reducers/WebSocketSlice.ts"
import NavBar from "../components/Navbar";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Button} from "@mantine/core";
import {store} from "../store/store.ts";
import {WsEvent} from "../middleware/webSocketMiddleware.tsx";
import Player from "../components/songRequest/Player.tsx";
const Main = () => {
  const location = useLocation();
  return (
    <div className="inline-flex">
      <NavBar />

      <div>
        <div>123</div>
        <div>
          <Link to="modal/a" state={{ background: location }}>
            Open Modal
          </Link>
          <Outlet />
        </div>
        <Button onClick={() => store.dispatch(webSocketActions.emit({type: WsEvent.TestEmit, content: "test"}))} />
        <Player />
      </div>

    </div>
  );
};

export default Main;
