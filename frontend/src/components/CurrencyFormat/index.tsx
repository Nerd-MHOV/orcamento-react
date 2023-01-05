import { TextField } from "@mui/material";
import { NumericFormat, OnValueChange } from "react-number-format";

export const CurrencyFormat = ({
  onValueChange,
  value,
}: {
  onValueChange?: OnValueChange | undefined;
  value?: string | number | null | undefined;
}) => {
  return (
    <NumericFormat
      customInput={TextField}
      prefix="R$ "
      decimalSeparator=","
      thousandSeparator="."
      onValueChange={onValueChange}
      value={value}
      variant="outlined"
      size="small"
    />
  );
};
