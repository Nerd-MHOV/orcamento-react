import "./style.scss";
import Logo from "../../assets/GP.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ContentPasteSearch,
  Dashboard,
  Discount,
  Group,
  Logout,
  Menu,
  PostAdd,
  QueryStats,
  TableView,
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
          <li className={pathname === "/corporate" ? "hovered" : ""}>
            <Link to="/corporate" className="link">
              <span className="icon">
                <TableView />
              </span>
              <span className="title">Corporativo</span>
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
          <li className={pathname.includes("/budgets") ? "hovered" : ""}>
            <Link to="/budgets" className="link">
              <span className="icon">
                <ContentPasteSearch />
              </span>
              <span className="title">Orçamentos</span>
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
          <li className={pathname.includes("/discounts") ? "hovered" : ""}>
            <Link to="/discounts" className="link">
              <span className="icon">
                <Discount />
              </span>
              <span className="title">Descontos</span>
            </Link>
          </li>
          {/* <li className={pathname.includes("/analytic") ? "hovered" : ""}>
            <Link to="/analytic" className="link">
              <span className="icon">
                <QueryStats />
              </span>
              <span className="title">Análise</span>
            </Link>
          </li> */}
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
