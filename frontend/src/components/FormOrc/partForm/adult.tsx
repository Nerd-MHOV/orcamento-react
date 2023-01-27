import { TextField } from "@mui/material";
import { useContext } from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

export const AdultInputForm = () => {
  const { changeOccupancyWrong, callHandleForm } = useContext(
    GenerateTariffContext
  );
  return (
    <TextField
      label="Adulto"
      type="number"
      name="adult"
      className="textField"
      variant="standard"
      onChange={() => {
        callHandleForm();
        changeOccupancyWrong();
      }}
    />
  );
};
