import {
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GroupValuesProps } from "../../../hooks/api/interfaces";
import { CurrencyFormat } from "../../CurrencyFormat";

export const foodPad = {
  adt: 87,
  adtex: 87,
  chd0: 0,
  chd4: 43,
  chd8: 52,
};

export const initValues = {
  adt: 0,
  adtex: 0,
  chd0: 0,
  chd4: 0,
  chd8: 0,
};

interface FoodStepProps {
  handleSetFoodValues: React.Dispatch<React.SetStateAction<GroupValuesProps>>;
  handleSetTenHourValues: React.Dispatch<
    React.SetStateAction<GroupValuesProps>
  >;
  handleSetTwentyHourValues: React.Dispatch<
    React.SetStateAction<GroupValuesProps>
  >;
  foodValues: GroupValuesProps;
  tenHourValues: GroupValuesProps;
  twentyHourValues: GroupValuesProps;
}

export const FoodStep = ({
  handleSetFoodValues,
  handleSetTenHourValues,
  handleSetTwentyHourValues,
  foodValues,
  tenHourValues,
  twentyHourValues,
}: FoodStepProps) => {
  const [alignment, setAlignment] = useState("pad");

  const handleChangeFoodOption = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === "pad") handleSetFoodValues(foodPad);
    else handleSetFoodValues(initValues);
    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log(foodPad, foodValues);
    if (
      foodValues.adt === foodPad.adt &&
      foodValues.adtex === foodPad.adtex &&
      foodValues.chd0 === foodPad.chd0 &&
      foodValues.chd4 === foodPad.chd4 &&
      foodValues.chd8 === foodPad.chd8
    ) {
      setAlignment("pad");
    } else {
      setAlignment("new");
    }
  }, [foodValues]);

  return (
    <div className="food-step">
      <span className="food">Valores da Alimentação: </span>
      <ToggleButtonGroup
        value={alignment}
        onChange={handleChangeFoodOption}
        color="primary"
        exclusive
        aria-label="Food step appearance"
      >
        <ToggleButton value="pad">Padrão</ToggleButton>
        <ToggleButton value="new">Novo</ToggleButton>
      </ToggleButtonGroup>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center"> ADT </TableCell>
              <TableCell align="center"> ADT ex </TableCell>
              <TableCell align="center"> 0 a 3 </TableCell>
              <TableCell align="center"> 4 a 7 </TableCell>
              <TableCell align="center"> 8 a 12 </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>alimentação</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={foodValues.adt}
                  onValueChange={(value) => {
                    handleSetFoodValues((prev) => ({
                      ...prev,
                      adt: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={foodValues.adtex}
                  onValueChange={(value) => {
                    handleSetFoodValues((prev) => ({
                      ...prev,
                      adtex: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={foodValues.chd0}
                  onValueChange={(value) => {
                    handleSetFoodValues((prev) => ({
                      ...prev,
                      chd0: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={foodValues.chd4}
                  onValueChange={(value) => {
                    handleSetFoodValues((prev) => ({
                      ...prev,
                      adt: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={foodValues.chd8}
                  onValueChange={(value) => {
                    handleSetFoodValues((prev) => ({
                      ...prev,
                      chd8: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check in às 10h</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={tenHourValues.adt}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      adt: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={tenHourValues.adtex}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      adtex: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={tenHourValues.chd0}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      chd0: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={tenHourValues.chd4}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      chd4: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={tenHourValues.chd8}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      chd8: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check in às 12h</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={twentyHourValues.adt}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      adt: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={twentyHourValues.adtex}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      adtex: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={twentyHourValues.chd0}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      chd0: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={twentyHourValues.chd4}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      chd4: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={twentyHourValues.chd8}
                  onValueChange={(value) => {
                    handleSetTenHourValues((prev) => ({
                      ...prev,
                      chd8: value.floatValue || 0,
                    }));
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
