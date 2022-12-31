import { TextField } from "@mui/material";

interface DiscountInputFormProps {
  onChange: VoidFunction;
  disabledPension: boolean;
}
export const DiscountInputForm = ({
  onChange,
  disabledPension,
}: DiscountInputFormProps) => (
  <TextField
    name="discount"
    disabled={disabledPension}
    label="Desconto"
    type="number"
    className="textField"
    variant="standard"
    onChange={() => onChange()}
  />
);
