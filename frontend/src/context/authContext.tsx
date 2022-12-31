import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/api/api";

export const AuthContext = createContext<any>({});

interface ChildrenProps {
  children: any;
}

export const AuthContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [userLogin, setUserLogin] = useState<Number | null>(null);
  const api = useApi();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("authUser");

    if (recoveredUser) {
      setUserLogin(Number(recoveredUser));
    }
    setLoading(false);
  }, []);

  const validateToken = async () => {
    try {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken();
        if (data.user.id) {
          setUserLogin(data.user.id);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const setToken = (token: string, id: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", id);
  };

  const login = async (user: string, passwd: string) => {
    try {
      const data = await api.login(user, passwd);
      if (data.user && data.token) {
        setUserLogin(data.user.id);
        setToken(data.token, data.user.id);
        return data.message;
      }
      return {
        message: "Usuario ou senha incorretos!",
        type: "error",
      };
    } catch (err) {
      return {
        type: "error",
        message: "Servidor fora do ar",
      };
    }
  };

  const logout = async () => {
    setUserLogin(null);
    setToken("", "");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!userLogin,
        userLogin,
        login,
        logout,
        validateToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
