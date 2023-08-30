import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { AuthContext } from "./context/authContext";

export const Private = () => {
  const { authenticated, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} m={10}>
        <CircularProgress />
      </Box>
    );
  }
  return authenticated ? <Outlet /> : <Navigate to={`/login?from=${location.pathname}${location.search}`} />;

};
