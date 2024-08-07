import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./style.scss";
import Logo from "../../assets/GrupoperaltasCompleto.png";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn";
import Message from "../../components/Message";
import { CallbackProps } from "../../components/Message/interface";
import useQuery from "../../hooks/urlQuery/query";

const Login = () => {
  const query = useQuery();
  const [user, setUser] = useState("");
  const [passwd, setPasswd] = useState("");
  const [callback, setCallback] = useState<CallbackProps>({});
  const auth = useContext(AuthContext);
  async function handleLogin(e: Event) {
    e.preventDefault();
    try {
      const response = await auth.login(user, passwd);
      if (response) {
        setCallback(response);
        if (response.type === "success") location.href = query.get("from") || "/";
        // navigate("/");
      } else {
        setCallback({
          type: "error",
          message: "Verifique a Senha e o Usuario!",
        });
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (callback.type) {
      setTimeout(() => {
        setCallback({});
      }, 5000);
    }
  }, [callback]);

  return (
    <div className="login">
      <div className="loginBox">
        <form>
          <div className="logo">
            <img src={Logo} alt="" />
            <div className="desc">Sistema de Orçamentos</div>
          </div>

          {callback.type && (
            <Message message={callback.message} type={callback.type} />
          )}

          <label>
            <span className="field">Usuario:</span>
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              name="user"
              placeholder="Informe seu usuario..."
            />
          </label>
          <label>
            <span className="field">Senha:</span>
            <input
              onChange={(e) => setPasswd(e.target.value)}
              autoComplete=""
              type="password"
              name="passwd"
              placeholder="Informe sua senha..."
            />
          </label>
          <div className="formAction">
            {/* Recuperar Senha */}
            <Link to="/" className={"link"}></Link>
            {/* _______________ */}
            <Btn action={"Logar-se"} color={"green"} onClick={handleLogin} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
