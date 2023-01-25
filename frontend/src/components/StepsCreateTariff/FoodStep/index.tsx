import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
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

export const FoodStep = ({
  type,
}: {
  type: "midweek" | "weekend" | "specific";
}) => {
  const {
    setFoodValues,
    setAllFoodValues,
    getValues,
    setEarlyEntryValues,
    setFoodPad,
    next,
  } = useContext(CreateTariffContext);
  const [alignment, setAlignment] = useState("pad");

  const handleChangeFoodOption = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    console.log(newAlignment);
    if (newAlignment === "pad") setAllFoodValues(type, foodPad);
    else setAllFoodValues(type, initValues);
    setAlignment(newAlignment);
  };

  const compareTariffFood = () => {
    setAlignment("new");
    if (
      getValues(type).foodValue.adt === foodPad.adt &&
      getValues(type).foodValue.adtex === foodPad.adtex &&
      getValues(type).foodValue.chd0 === foodPad.chd0 &&
      getValues(type).foodValue.chd4 === foodPad.chd4 &&
      getValues(type).foodValue.chd8 === foodPad.chd8
    )
      setAlignment("pad");
  };

  useEffect(() => {
    setTimeout(() => {
      compareTariffFood();
    }, 1000);
    next(true);
  }, []);

  useEffect(() => {
    if (alignment === "pad") setFoodPad(true);
    else setFoodPad(false);
  }, [alignment]);

  return (
    <div className="food-step" style={{ marginTop: 50 }}>
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
                  value={getValues(type).foodValue.adt}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValues(type, "adt", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).foodValue.adtex}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValues(type, "adtex", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).foodValue.chd0}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValues(type, "chd0", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).foodValue.chd4}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValues(type, "chd4", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).foodValue.chd8}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValues(type, "chd8", value.floatValue || 0);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check in às 10h</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.tenHour.adt}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "tenHour",
                      "adt",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.tenHour.adtex}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "tenHour",
                      "adtex",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.tenHour.chd0}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "tenHour",
                      "chd0",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.tenHour.chd4}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "tenHour",
                      "chd4",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.tenHour.chd8}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "tenHour",
                      "chd8",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check in às 12h</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.twentyHour.adt}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "twentyHour",
                      "adt",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.twentyHour.adtex}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "twentyHour",
                      "adtex",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.twentyHour.chd0}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "twentyHour",
                      "chd0",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.twentyHour.chd4}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "twentyHour",
                      "chd4",
                      value.floatValue || 0
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getValues(type).earlyEntryValues.twentyHour.chd8}
                  onValueChange={(value) => {
                    setEarlyEntryValues(
                      type,
                      "twentyHour",
                      "chd8",
                      value.floatValue || 0
                    );
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
