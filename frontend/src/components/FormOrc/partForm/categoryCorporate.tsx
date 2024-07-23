import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useContext } from "react";
import { GenerateTariffContext, useGenerateTariff, useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";
import { CategoryOptionsProps } from "../../../context/generateTariff/interfaces/categoriesProps";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(
  category: CategoryOptionsProps,
  allCategories: readonly CategoryOptionsProps[],
  theme: Theme
) {
  return {
    fontWeight:
      allCategories.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CategoryCorporateInputForm = () => {
  const theme = useTheme();
  const {
    handleCategoriesCorporateInput,
    categoryOptions,
    categoriesCorporateValues,
    selectionRange,
  } = useGenerateTariffCorporate();
  const handleChange = (event: SelectChangeEvent<typeof categoriesCorporateValues>) => {
    const {
      target: { value },
    } = event;

    handleCategoriesCorporateInput(value as CategoryOptionsProps[]);
  };

  const options = categoryOptions.filter( cat => !cat.category.match(/Day-Use/) ).reverse()

  const optionDisabled = (options: CategoryOptionsProps) => {
    if (
      selectionRange[0].startDate === selectionRange[0].endDate &&
      !options.category.match(/Day-Use/)
    ) {
      return true;
    }

    if (
      selectionRange[0].startDate !== selectionRange[0].endDate &&
      options.category.match(/Day-Use/)
    ) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">UHs</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={categoriesCorporateValues}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.unit} label={value.unit} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((category, key) => (
              //@ts-ignore
            <MenuItem
              key={category.unit}
              value={category}
              disabled={optionDisabled(category)}
              style={getStyles(category, categoriesCorporateValues, theme)}
            >
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
