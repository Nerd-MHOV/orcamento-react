import { TextField } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

export const AdultInputForm = () => {
    const [value, setValue] = useState<number>();
  const { changeOccupancyWrong, callHandleForm, clearUnitaryDiscount } =
    useContext(GenerateTariffContext);
  const query = useQuery();
    useEffect(() => {
        if(query.get("adt")) setValue(Number(query.get("adt")))
    }, []);

  return (
    <TextField
      label="Adulto"
      type="number"
      name="adult"
      className="textField"
      variant="standard"
      value={value}
      onChange={(e) => {
        setValue(+e.target.value)
        callHandleForm();
        changeOccupancyWrong();
        clearUnitaryDiscount();
      }}
    />
  );
};
