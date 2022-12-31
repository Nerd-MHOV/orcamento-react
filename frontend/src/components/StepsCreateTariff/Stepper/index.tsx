import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "Tipo de tarifário",
  "Datas a serem aplicadas",
  "Alimentação e Check-in Antecipado",
  "Valores R$",
  "Nome",
];

interface StepperTariffProps {
  children: JSX.Element;
  activeStep: number;
  handleNext: VoidFunction;
  handleBack: VoidFunction;
  nextActive: boolean;
}

export const StepperTariff = ({
  children,
  activeStep,
  handleNext,
  handleBack,
  nextActive,
}: StepperTariffProps) => {
  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&pos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> {children} </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} disabled={!nextActive}>
              {activeStep === steps.length - 1 ? "Finalizar" : "Proximo"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
