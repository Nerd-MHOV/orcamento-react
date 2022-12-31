import { Autocomplete, TextField } from "@mui/material";
import { CategoryOptionsProps, SelectionRangeProps } from "../Interfaces";

interface CategoryInputFormProps {
  categoryOptions: CategoryOptionsProps[];
  selectionRange: SelectionRangeProps;
  onChange: (newValue: CategoryOptionsProps | null) => void;
  categoryValue: CategoryOptionsProps | null;
  unitUsing: string[];
}
export const CategoryInputForm = ({
  categoryOptions,
  selectionRange,
  onChange,
  categoryValue,
  unitUsing,
}: CategoryInputFormProps) => {
  const optionDisabled = (options: CategoryOptionsProps) => {
    if (
      selectionRange.startDate === selectionRange.endDate &&
      !options.category.match(/Day-Use/)
    ) {
      return true;
    }

    if (
      selectionRange.startDate !== selectionRange.endDate &&
      options.category.match(/Day-Use/)
    ) {
      return true;
    }

    return false;
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: CategoryOptionsProps
  ) => {
    if (unitUsing.includes(`${option.unit}`))
      return (
        <span {...props} style={{ color: "lightsalmon" }}>
          {option.label}
        </span>
      );

    return <span {...props}>{option.label}</span>;
  };

  return (
    <Autocomplete
      componentName="category"
      options={categoryOptions}
      className="textField"
      getOptionDisabled={optionDisabled}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
      renderOption={renderOption}
      value={categoryValue}
      renderInput={(params) => (
        <TextField
          {...params}
          name="category"
          label="Categoria"
          type="text"
          variant="standard"
        />
      )}
    />
  );
};
