import { Autocomplete, TextField } from "@mui/material";
import {useContext, useEffect} from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

const childOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const ChildInputForm = () => {
  const { setChildValue, changeOccupancyWrong, callHandleForm, childValue } =
    useContext(GenerateTariffContext);

  const query = useQuery()

    useEffect(() => {
        if(query.get("chd")) {
            const chds = query.get("chd")?.split(",")
            if(!chds) return
            const toNumber = chds.map(chd => +chd)
            setChildValue(toNumber)
        }
    }, []);
  return (
    <Autocomplete
      multiple
      onChange={(_, newValue) => {
          console.log(newValue)
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
