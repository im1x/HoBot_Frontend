import NavBar from "../components/Navbar";
import {Link, Outlet, useLocation} from "react-router-dom";
const Main = () => {
  const location = useLocation();
  return (
    <div className="inline-flex">
      <NavBar />
      <div>123</div>
      <div>
        <Link to="modal/a" state={{ background: location }}>
          Open Modal
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
