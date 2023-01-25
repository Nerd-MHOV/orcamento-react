import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
import { useApi } from "../../../hooks/api/api";

export const CompleteSteps = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { loading, stateResponse, activeStep } =
    useContext(CreateTariffContext);

  return (
    <div className="complete-steps">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }} m={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {stateResponse === "success" ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "center" }} m={10}>
                <p style={{ fontWeight: "bold", fontSize: 25 }}>
                  Tarifário criado com{" "}
                  <span style={{ color: "green" }}>SUCESSO!!</span>
                </p>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                  onClick={() => {
                    navigate("/tariffs");
                  }}
                  variant="contained"
                >
                  Concluir
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center" }} m={10}>
                <p style={{ fontWeight: "bold", fontSize: 25 }}>
                  Houve um <span style={{ color: "red" }}>Erro!!</span> ao
                  tentar criar o tarifário, tente novamente.
                </p>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                  onClick={() => {
                    activeStep(1);
                  }}
                  variant="contained"
                >
                  Tentar de novo
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </div>
  );
};
