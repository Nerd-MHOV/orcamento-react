import { Autocomplete, TextField } from "@mui/material";
import {useContext, useEffect} from "react";
import { GenerateTariffContext } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

const petOptions = ["pequeno", "médio", "grande"];

export const PetInputForm = () => {
  const { petValue, setPetValue } = useContext(GenerateTariffContext);
  const query = useQuery();

    useEffect(() => {
        if(query.get("pet")) {
            const pet = query.get("pet")?.split(",")
            if(!pet) return
            setPetValue(pet)
        }
    }, []);
  return (
    <Autocomplete
      multiple
      options={petOptions}
      isOptionEqualToValue={() => false}
      className="textField"
      onChange={(_, newValue) => {
        setPetValue(newValue);
      }}
      value={petValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pet"
          name="pet"
          placeholder="porte"
          type="text"
          variant="standard"
        />
      )}
    />
  );
};
