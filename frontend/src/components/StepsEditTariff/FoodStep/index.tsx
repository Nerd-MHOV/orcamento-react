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
import { EditTariffContext } from "../../../context/editTariff/editTariff";
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
    getFoodValue,
    getEarlyValue,
    setFoodValue,
    setAllFoodValue,
    setEarlyEntryValue,
    next,
  } = useContext(EditTariffContext);
  const [alignment, setAlignment] = useState("pad");

  const handleChangeFoodOption = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    console.log(newAlignment);
    if (newAlignment === "pad") setAllFoodValue(foodPad);
    else setAllFoodValue(initValues);
    setAlignment(newAlignment);
  };

  const compareTariffFood = () => {
    setAlignment("new");
    if (
      getFoodValue()?.adt === foodPad.adt &&
      getFoodValue()?.adtex === foodPad.adtex &&
      getFoodValue()?.chd0 === foodPad.chd0 &&
      getFoodValue()?.chd4 === foodPad.chd4 &&
      getFoodValue()?.chd8 === foodPad.chd8
    )
      setAlignment("pad");
  };

  useEffect(() => {
    setTimeout(() => {
      compareTariffFood();
    }, 1000);
    next(true);
  }, []);

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
                  value={getFoodValue()?.adt}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValue("adt", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getFoodValue()?.adtex}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValue("adtex", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getFoodValue()?.chd0}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValue("chd0", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getFoodValue()?.chd4}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValue("chd4", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getFoodValue()?.chd8}
                  onValueChange={(value) => {
                    compareTariffFood();
                    setFoodValue("chd8", value.floatValue || 0);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check in às 10h</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("10h")?.adt}
                  onValueChange={(value) => {
                    setEarlyEntryValue("10h", "adt", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("10h")?.adtex}
                  onValueChange={(value) => {
                    setEarlyEntryValue("10h", "adtex", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("10h")?.chd0}
                  onValueChange={(value) => {
                    setEarlyEntryValue("10h", "chd0", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("10h")?.chd4}
                  onValueChange={(value) => {
                    setEarlyEntryValue("10h", "chd4", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("10h")?.chd8}
                  onValueChange={(value) => {
                    setEarlyEntryValue("10h", "chd8", value.floatValue || 0);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Check in às 12h</TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("12h")?.adt}
                  onValueChange={(value) => {
                    setEarlyEntryValue("12h", "adt", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("12h")?.adtex}
                  onValueChange={(value) => {
                    setEarlyEntryValue("12h", "adtex", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("12h")?.chd0}
                  onValueChange={(value) => {
                    setEarlyEntryValue("12h", "chd0", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("12h")?.chd4}
                  onValueChange={(value) => {
                    setEarlyEntryValue("12h", "chd4", value.floatValue || 0);
                  }}
                />
              </TableCell>
              <TableCell>
                <CurrencyFormat
                  value={getEarlyValue("12h")?.chd8}
                  onValueChange={(value) => {
                    setEarlyEntryValue("12h", "chd8", value.floatValue || 0);
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
