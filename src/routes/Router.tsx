import Login from "../pages/Login.tsx";
import App from "../App.tsx";
import { createBrowserRouter } from "react-router-dom";


const Router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Router;
