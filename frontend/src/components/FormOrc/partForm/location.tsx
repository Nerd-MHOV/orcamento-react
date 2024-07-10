import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";

export const LocationInputForm = () => {
  const {
    listRequirements,
    locationValue,
    requirementValue,
    handleClickOpenModalRequirement,
    requirementSubmit,
    callHandleForm,
  } =  useGenerateTariffCorporate()


  useEffect(() => {
    console.log(requirementValue, locationValue);
    callHandleForm();
  }, [ locationValue ])
  const list = listRequirements.filter(lr => lr.type === 'location' )
  
  return (
    <>
    <Autocomplete
      multiple
      isOptionEqualToValue={() => false}
      options={list.map(req => req.name)}
      className="textField"
      onChange={(_, newValue) => {
        const listValue = newValue.map(val => listRequirements.find(req => req.name === val)!)
        handleClickOpenModalRequirement(listValue, true);
      }}
      value={locationValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Locação"
          type="text"
          name="location"
          className="textField"
          variant="standard"
        />
      )}
    />
    <input type="hidden" name="location" value={JSON.stringify(requirementSubmit)} />
    </>
  );
};
