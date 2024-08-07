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
  const param = corporate ? 'corporate' : 'accommodation';
  const list = listRequirements.filter(lr => lr.type === param || lr.type === 'both' )
  
  return (
    <>
    <Autocomplete
      multiple
      isOptionEqualToValue={() => false}
      options={list.map(req => req.name)}
      className="textField"
      onChange={(_, newValue) => {
        const listValue = newValue.map(val => listRequirements.find(req => req.name === val)!)
        handleClickOpenModalRequirement(listValue);
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
