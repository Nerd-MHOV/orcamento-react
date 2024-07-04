import { TextField } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { GenerateTariffContext, useGenerateTariff } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

export const PipeNumberInputForm = () => {
  const { callHandleForm } = useGenerateTariff();
  const query = useQuery()
  const [value, setValue] = useState<Number>()
  
  useEffect(() => {
    if(query.get("client_id")) setValue(Number(query.get("client_id")))
  }, []);
  return (
    <TextField
      name="numberPipe"
      label="Nº Pipe"
      type="number"
      value={value}
      onChange={(e) => {
        setValue(+e.target.value)
        callHandleForm()
      }}
      className="textField"
      variant="standard"
    />
  );
};
