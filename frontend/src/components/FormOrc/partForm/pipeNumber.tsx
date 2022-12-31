import { TextField } from "@mui/material";

interface PipeNumberInputFormProps {
  onChange: VoidFunction;
}
export const PipeNumberInputForm = ({ onChange }: PipeNumberInputFormProps) => (
  <TextField
    name="numberPipe"
    label="Nº Pipe"
    type="number"
    onChange={() => onChange()}
    className="textField"
    variant="standard"
  />
);
