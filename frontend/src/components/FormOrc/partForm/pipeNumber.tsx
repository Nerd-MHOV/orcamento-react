import { TextField } from "@mui/material";
import { useContext } from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

export const PipeNumberInputForm = () => {
  const { callHandleForm } = useContext(GenerateTariffContext);
  return (
    <TextField
      name="numberPipe"
      label="Nº Pipe"
      type="number"
      onChange={() => callHandleForm()}
      className="textField"
      variant="standard"
    />
  );
};
