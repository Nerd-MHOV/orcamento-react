import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";

const childOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const ChildInputForm = () => {
  const { setChildValue, changeOccupancyWrong, callHandleForm, childValue } =
    useContext(GenerateTariffContext);
  return (
    <Autocomplete
      multiple
      onChange={(_, newValue) => {
        setChildValue(newValue);
        changeOccupancyWrong();
        callHandleForm();
      }}
      value={childValue}
      options={childOptions}
      isOptionEqualToValue={() => false}
      className="textField"
      getOptionLabel={(option) => option.toString()}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Criança"
          type="text"
          placeholder="idade"
          variant="standard"
        />
      )}
    />
  );
};
