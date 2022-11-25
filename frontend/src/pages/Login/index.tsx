import { useEffect, useState } from "react";

import "./style.scss"
import Logo from "../../assets/GrupoperaltasCompleto.png"
import { Link, Navigate } from "react-router-dom";
import Btn from "../../components/Btn";
import Message from "../../components/Message";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";


interface CallbackProps {
    type?: string,
    message?: string,
}

const Login = () => {

    const [user, setUser] = useState('')
    const [passwd, setPasswd] = useState('')
    const [callback, setCallback] = useState<CallbackProps>({})
    const auth = useContext(AuthContext)
    async function handleLogin(e: Event) {
        e.preventDefault();
        try {
            await auth.login(user, passwd)
                .then((response: {}) => {
                    console.log("aqui", response)
                    if (response) {
                        setCallback(response)
                    } else {
                        setCallback({
                            type: "error",
                            message: "SERVIDOR FORA DO AR"
                        })
                    }
                }).catch((err: any) => {
                    console.log(err)
                })

        } catch (err) {
            console.log(err)
        }

    }

    if (auth.userLogin) {
        return <Navigate to="/painel" />
    }

    useEffect(() => {
        if(callback.type) {
            setTimeout(() => {
                setCallback({})
            }, 5000)
        }
    }, [callback]) 


    return (
        <div className="login">
            <div className="loginBox">
                <form>
                    <div className="logo">
                        <img src={Logo} alt="" />
                        <div className="desc">Sistema de Orçamentos</div>
                    </div>

                    {
                        callback.type &&
                        <Message message={callback.message} type={callback.type} />
                    }

                    <label>
                        <span className="field">Usuario:</span>
                        <input onChange={e => setUser(e.target.value)} type="text" name="user" placeholder="Informe seu usuario..." />
                    </label>
                    <label>
                        <span className="field">Senha:</span>
                        <input onChange={e => setPasswd(e.target.value)} autoComplete="" type="password" name="passwd" placeholder="Informe sua senha..." />
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
    )
}

export default Login