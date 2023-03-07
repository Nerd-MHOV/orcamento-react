import "./style.scss";
import Logo from "../../assets/GP.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Group,
  Logout,
  Menu,
  PostAdd,
  ViewList,
} from "@mui/icons-material";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { AuthContext } from "../../context/authContext";

const Sidebar = () => {
  const { activeSidebar, setActiveSidebar } = useContext(SidebarContext);
  const location = useLocation();
  const pathname = location.pathname;
  const auth = useContext(AuthContext);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  async function handleLogout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    await auth.logout();
    navigate("/login");
  }

  return (
    <div className={activeSidebar ? "sidebar active" : "sidebar"}>
      <div className="navigation">
        <span className="btnMenu" onClick={setActiveSidebar}>
          <Menu />
        </span>
        <ul>
          <li>
            <Link to="/" className="link">
              <span className="icon logo_peraltas">
                <img src={Logo} alt="" />
              </span>
              <span className="title">Gerador de Orçamento</span>
            </Link>
          </li>
          <li className={pathname === "/" ? "hovered" : ""}>
            <Link to="/" className="link">
              <span className="icon">
                <Dashboard />
              </span>
              <span className="title">Home</span>
            </Link>
          </li>
          <li className={pathname.includes("/tariffs") ? "hovered" : ""}>
            <Link to="/tariffs" className="link">
              <span className="icon">
                <ViewList />
              </span>
              <span className="title">Tarifários</span>
            </Link>
          </li>
          <li className={pathname.includes("/users") ? "hovered" : ""}>
            <Link to="/users" className="link">
              <span className="icon">
                <Group />
              </span>
              <span className="title">Usuários</span>
            </Link>
          </li>
          <li className={pathname.includes("/requirements") ? "hovered" : ""}>
            <Link to="/requirements" className="link">
              <span className="icon">
                <PostAdd />
              </span>
              <span className="title">Requerimentos</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="link" onClick={handleLogout}>
              <span className="icon">
                <Logout />
              </span>
              <span className="title">Sair</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
