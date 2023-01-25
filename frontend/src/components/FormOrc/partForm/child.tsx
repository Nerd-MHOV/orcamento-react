import { Autocomplete, TextField } from "@mui/material";

interface ChildInputFormProps {
  onChange: (newValue: Number[]) => void;
  childValue: Number[];
}

const childOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const ChildInputForm = ({
  onChange,
  childValue,
}: ChildInputFormProps) => (
  <Autocomplete
    multiple
    onChange={(_, newValue) => {
      onChange(newValue);
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
