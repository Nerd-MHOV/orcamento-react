import { Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { GenerateTariffContext, useGenerateTariff } from "../../../context/generateTariff/generateTariff";
import { CategoryOptionsProps } from "../../../context/generateTariff/interfaces/categoriesProps";

export const CategoryInputForm = () => {
  const {
    handleCategoryInput,
    categoryOptions,
    categoryValue,
    selectionRange,
    unitUsing,
  } = useGenerateTariff();

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
      options={categoryOptions}
      className="textField"
      getOptionDisabled={optionDisabled}
      onChange={(_, newValue) => {
        handleCategoryInput(newValue);
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
