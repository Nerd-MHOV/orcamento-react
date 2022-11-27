import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApi } from "../hooks/api"

export const AuthContext = createContext<any>({})

interface ChildrenProps {
    children: any
}

export const AuthContextProvider: React.FC<ChildrenProps> = ({ children }) => {

    const [userLogin, setUserLogin] = useState <Number | null> (null)
    const api = useApi();

    useEffect(() => {
        validateToken();
    },)

    const validateToken = async () => {
        try {
            const storageData = localStorage.getItem('authToken')
            if(storageData) {
                const data = await api.validateToken();
                console.log(data)
                console.log('da uma olhada aqui', data)
                if(data.user.id) {
                    setUserLogin (data.user.id);
                    return true;
                }

            }

            return false
        } catch (error) {
            console.log(error)
        }

    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    const login = async (user: string, passwd:string) => {
        try {
            const data = await api.login(user, passwd)
            if(data.user && data.token) {
                setUserLogin(data.user.id)
                setToken(data.token);
                return data.message
            }
            return {
                message: "Usuario ou senha incorretos!",
                type: "error"
            }
        } catch (err) {
            console.log(err)
            return {
                type: "error",
                message: "Servidor fora do ar"
            }
        }
    }


    const logout = async () => {
        setUserLogin(null);
        setToken('');
    }

    return (
        <AuthContext.Provider value={{ userLogin, login, logout, validateToken }}>
            {children}
        </AuthContext.Provider>
    )
}

