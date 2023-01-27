import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

export const RequirementInputForm = () => {
  const {
    listRequirements,
    requirementValue,
    handleClickOpenModalRequirement,
  } = useContext(GenerateTariffContext);
  return (
    <Autocomplete
      multiple
      isOptionEqualToValue={() => false}
      options={listRequirements}
      className="textField"
      onChange={(_, newValue) => {
        handleClickOpenModalRequirement(newValue);
      }}
      value={requirementValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Requerimento"
          type="text"
          name="requirement"
          className="textField"
          variant="standard"
        />
      )}
    />
  );
};
