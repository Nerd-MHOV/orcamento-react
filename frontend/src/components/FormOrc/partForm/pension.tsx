import { Autocomplete, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { GenerateTariffContext, useGenerateTariff, useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";
import PensionsOptionsProps from "../../../context/generateTariff/interfaces/pensionOptionsProps";

export const PensionInputForm = ({ corporate = false }) => {
  const {
    disabledPension,
    setPensionValue,
    pensionValue,
    callHandleForm,
    setDisabledPension,
    categoryValue,
    handleCategoryInput,
  } = corporate ? useGenerateTariffCorporate() : useGenerateTariff();
  useEffect(() => {
    setPensionValue("completa")
  }, []);

  useEffect(() => {
    setDisabledPension(false);
    if (categoryValue && !!categoryValue.label.match(/Day-Use/)) {
      setDisabledPension(true);
      return;
    }
  }, [handleCategoryInput])

  useEffect( () => {
    callHandleForm();
  }, [pensionValue])
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
