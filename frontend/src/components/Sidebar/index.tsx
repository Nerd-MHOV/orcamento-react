import "./style.scss"
import Logo from "../../assets/GP.png"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    Dashboard, Logout, Menu
} from "@mui/icons-material";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import { AuthContext } from "../../context/authContext";

const Sidebar = ()=> {

    const { activeSidebar, setActiveSidebar } = useContext(SidebarContext);
    const location = useLocation();
    const pathname = location.pathname
    const auth = useContext(AuthContext)
    const token = localStorage.getItem('authToken')
    const navigate = useNavigate()
    
    async function handleLogout() {
        await auth.logout(token)
        navigate('/')
    }

    return (
        <div className={activeSidebar ? "sidebar active" : "sidebar"}>
                <div className="navigation">
                    <span className="btnMenu" onClick={setActiveSidebar}><Menu /></span>
                    <ul>
                        <li>
                            <Link to="/" className="link" >
                                <span className="icon logo_peraltas">
                                    <img src={Logo} alt=""/>
                                </span>
                                <span className="title">Gerador de Orçamento</span>
                            </Link>
                        </li>
                        <li className={(pathname === "/home" ) ? "hovered" : ""} >
                            <Link to="/home" className="link" >
                                <span className="icon"><Dashboard /></span>
                                <span className="title">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="link" onClick={handleLogout} >
                                <span className="icon"><Logout /></span>
                                <span className="title">Sair</span>
                            </Link>
                        </li>
                    </ul>
                </div>
        </div>
    )
}

export default Sidebar