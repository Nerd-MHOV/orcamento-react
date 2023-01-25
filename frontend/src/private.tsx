import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";

export const Private = () => {
  const { authenticated, loading, validateToken } = useContext(AuthContext);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} m={10}>
        <CircularProgress />
      </Box>
    );
  }
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};
