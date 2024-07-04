import { TextField } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { GenerateTariffContext, useGenerateTariff } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

interface AdultFieldFormProps {
  value?: number,
  onChange: React.ChangeEventHandler,
}
export const AdultFieldForm = ({value, onChange}: AdultFieldFormProps) => (
  <TextField
  label="Adulto"
  type="number"
  name="adult"
  className="textField"
  variant="standard"
  value={value}
  onChange={onChange}
/>
)


export const AdultInputForm = () => {
  const [value, setValue] = useState<number>();
  const { changeOccupancyWrong, callHandleForm, clearUnitaryDiscount } =
    useGenerateTariff();
  const query = useQuery();
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(+e.target.value)
    callHandleForm();
    changeOccupancyWrong();
    clearUnitaryDiscount();
  }
  useEffect(() => {
      if(query.get("adt")) setValue(Number(query.get("adt")))
  }, []);
  return (
    <AdultFieldForm 
      value={value}
      onChange={onChange}
    />
  );
};
