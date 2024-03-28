import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { useGenerateTariff, useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";

export const RequirementInputForm = ({ corporate = false }) => {
  const {
    listRequirements,
    requirementValue,
    handleClickOpenModalRequirement,
    requirementSubmit,
    callHandleForm,
  } = corporate ? useGenerateTariffCorporate() : useGenerateTariff()


  useEffect(() => {
    callHandleForm();
  }, [ requirementValue ])
  
  return (
    <>
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
    <input type="hidden" name="requirementComplete" value={JSON.stringify(requirementSubmit)} />
    </>
  );
};
