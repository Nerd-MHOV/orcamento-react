import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getAllowedDiscount } from "../../../context/generateTariff/functions/getters/getAllowedDiscount";
import { getPayers } from "../../../context/generateTariff/functions/getters/getPayers";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";
import { ApiDiscountProps } from "../../../hooks/api/interfaces";

export const ActionInputForm = () => {
  const { selectionRange, dataTable, setActionSelected, actionSelected } =
    useContext(GenerateTariffContext);
  const [action, setAction] = useState<ApiDiscountProps[]>([]);
  const [select, setSelect] = useState("");

  const getAction = async () => {
    const response = await getAllowedDiscount(
      selectionRange,
      getPayers(dataTable)
    );

    const verifyIfSelected = response.find(
      (el) => el.name === actionSelected?.name
    );
    if(!verifyIfSelected) {
      setActionSelected(undefined);
    }
    setAction(response);
  };
  useEffect(() => {
    getAction();
  }, [selectionRange, dataTable]);

  useEffect(() => {
    setSelect(actionSelected?.name ?? "");
  }, [actionSelected]);

  if (action.length === 0) return null;
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="applied_in_field">Ação Promocional</InputLabel>
      <Select
        labelId="applied_in_field"
        id="applied_in"
        value={select}
        label="Aplicar em"
        onChange={(e) => {
          setActionSelected(action.find((el) => el.name === e.target.value));
        }}
      >
        <MenuItem value={""}>Nenhuma</MenuItem>

        {action.map((el) => (
          <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
