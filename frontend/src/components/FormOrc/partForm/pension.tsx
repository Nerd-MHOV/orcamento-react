import { Autocomplete, TextField } from "@mui/material";
import {useContext, useEffect} from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";
import PensionsOptionsProps from "../../../context/generateTariff/interfaces/pensionOptionsProps";

export const PensionInputForm = () => {
  const { disabledPension, setPensionValue, pensionValue } = useContext(
    GenerateTariffContext
  );
    useEffect(() => {
        setPensionValue("completa")
    }, []);
  return (
    <Autocomplete
      disabled={disabledPension}
      options={["simples", "meia", "completa"]}
      className="textField"
      onChange={(_, newValue) => {
        setPensionValue(newValue as PensionsOptionsProps | null);
      }}
      value={pensionValue}
      renderInput={(params) => (
        <TextField
          {...params}
          name="pension"
          label="Pensão"
          type="text"
          variant="standard"
        />
      )}
    />
  );
};
