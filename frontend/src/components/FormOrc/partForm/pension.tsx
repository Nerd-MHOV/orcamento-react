import { Autocomplete, TextField } from "@mui/material";

interface PensionInputFormProps {
  disabledPension: boolean;
  onChange: (newValue: string | null) => void;
  pensionValue: string | null;
}
export const PensionInputForm = ({
  disabledPension,
  onChange,
  pensionValue,
}: PensionInputFormProps) => (
  <Autocomplete
    componentName="pension"
    disabled={disabledPension}
    options={["simples", "meia", "completa"]}
    className="textField"
    onChange={(_, newValue) => {
      onChange(newValue);
    }}
    value={pensionValue}
    renderInput={(params) => (
      <TextField
        {...params}
        name="pension"
        label="Pensão"
        type="text"
        variant="standard"
      />
    )}
  />
);
