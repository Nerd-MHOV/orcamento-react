import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField } from "@mui/material";
import {SyntheticEvent, useContext, useEffect} from "react";
import { GenerateTariffContext, useGenerateTariff } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

const childOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


export type onChangeChildFieldFormProps = (event: 
  SyntheticEvent<Element, Event>, 
  value: number[], 
  reason: AutocompleteChangeReason, 
  details?: AutocompleteChangeDetails<number> | undefined
  ) => void
interface ChildFieldFormProps {
  value: number[],
  onChange: onChangeChildFieldFormProps,
}
export const ChildFieldForm = ({value, onChange}: ChildFieldFormProps) =>  (
    <>
    <Autocomplete
      multiple
      onChange={onChange}
      value={value}
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
    <input type="hidden" value={JSON.stringify(value)} name="child"/>
    </>
  )
export const ChildInputForm = () => {
  const { setChildValue, changeOccupancyWrong, callHandleForm, childValue, clearUnitaryDiscount } =
    useGenerateTariff();

  const query = useQuery()

    useEffect(() => {
        if(query.get("chd")) {
            const chds = query.get("chd")?.split(",")
            if(!chds) return
            const toNumber = chds.map(chd => +chd)
            setChildValue(toNumber)
        }
    }, []);

    const onChange: onChangeChildFieldFormProps = (_, newValue) => {
      setChildValue(newValue);
    }

    useEffect(() => {
      changeOccupancyWrong();
      clearUnitaryDiscount();
      callHandleForm();
    }, [childValue])
  return (
    <ChildFieldForm
      value={childValue}
      onChange={onChange}
    />
  );
};
