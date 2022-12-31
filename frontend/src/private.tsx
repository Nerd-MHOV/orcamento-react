import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";

export const Private = ({ children }: any) => {
  const { authenticated, loading, validateToken } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  // validateToken();

  return children;
};
