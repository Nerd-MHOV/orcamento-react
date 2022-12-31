import { Autocomplete, TextField } from "@mui/material";

interface RequirementInputFormProps {
  listRequirements: string[];
  onChange: (newValue: string[]) => void;
  requirementValue: string[];
}
export const RequirementInputForm = ({
  listRequirements,
  onChange,
  requirementValue,
}: RequirementInputFormProps) => (
  <Autocomplete
    componentName="requirement"
    multiple
    isOptionEqualToValue={() => false}
    options={listRequirements}
    className="textField"
    onChange={(_, newValue) => {
      onChange(newValue);
    }}
    value={requirementValue}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Requerimento"
        type="text"
        name="requirement"
        className="textField"
        variant="standard"
      />
    )}
  />
);
