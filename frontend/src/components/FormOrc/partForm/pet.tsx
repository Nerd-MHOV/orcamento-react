import { Autocomplete, TextField } from "@mui/material";

interface PetInputFormProps {
  onChange: (newValue: string[]) => void;
  petValue: string[];
}
const petOptions = ["pequeno", "médio", "grande"];

export const PetInputForm = ({ onChange, petValue }: PetInputFormProps) => (
  <Autocomplete
    componentName="pet"
    multiple
    options={petOptions}
    isOptionEqualToValue={() => false}
    className="textField"
    onChange={(_, newValue) => {
      onChange(newValue);
      //   setPetValue(newValue);
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
