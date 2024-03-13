import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField } from "@mui/material";
import {useContext, useEffect} from "react";
import { GenerateTariffContext, useGenerateTariff } from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

const petOptions = ["pequeno", "médio", "grande"];


export type OnChangePetFieldFormProps = (
  event: React.SyntheticEvent<Element, Event>, 
  value: string[], 
  reason: AutocompleteChangeReason, 
  details?: AutocompleteChangeDetails<string> | undefined
  ) => void
interface PetFieldFormProps {
  value: string[],
  onChange: OnChangePetFieldFormProps
}
export const PetFieldForm = ({value, onChange}: PetFieldFormProps) => (
  <Autocomplete
  multiple
  options={petOptions}
  isOptionEqualToValue={() => false}
  className="textField"
  onChange={onChange}
  value={value}
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
)

export const PetInputForm = () => {
  const { petValue, setPetValue } = useGenerateTariff();
  const query = useQuery();

    useEffect(() => {
        if(query.get("pet")) {
            const pet = query.get("pet")?.split(",")
            if(!pet) return
            const filter =( pet.filter(item => {
                const lowercaseItem = item.toLowerCase();
                return lowercaseItem === "pequeno" || lowercaseItem === "médio" || lowercaseItem === "grande";
            })).map(item => item.toLowerCase());

            if(!filter) return
            setPetValue(filter)
        }
    }, []);

    const onChange: OnChangePetFieldFormProps = (_, newValue) => {
      setPetValue(newValue);
    }
  return (
    <PetFieldForm 
      value={petValue}
      onChange={onChange}
    />
  );
};
