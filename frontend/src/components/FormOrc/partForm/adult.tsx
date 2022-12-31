import { TextField } from "@mui/material";

interface AdultInputProps {
  onChange: VoidFunction;
}
export const AdultInputForm = ({ onChange }: AdultInputProps) => {
  return (
    <TextField
      label="Adulto"
      type="number"
      name="adult"
      className="textField"
      variant="standard"
      onChange={() => {
        onChange();
        //   handleForm(
        //     occupancy.category,
        //     requirementSubmit,
        //     childValue,
        //     petValue,
        //     selectionRange,
        //     addRows
        //   );
        //   changeOccupancyWrong(occupancy);
      }}
    />
  );
};
