import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

const petOptions = ["pequeno", "médio", "grande"];

export const PetInputForm = () => {
  const { petValue, setPetValue } = useContext(GenerateTariffContext);
  return (
    <Autocomplete
      multiple
      options={petOptions}
      isOptionEqualToValue={() => false}
      className="textField"
      onChange={(_, newValue) => {
        setPetValue(newValue);
      }}
      value={petValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pet"
          name="pet"
          placeholder="porte"
          type="text"
          variant="standard"
        />
      )}
    />
  );
};
