import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GroupValuesProps } from "../../../hooks/api/interfaces";
import { initValuesUHS } from "../../../pages/NewTariffs";
import { CurrencyFormat } from "../../CurrencyFormat";
import { FoodStep } from "../FoodStep";
import { ValuesRowsStep } from "../ValuesRowsStep";

interface ValuesStepProps {
  title: string;
  UHsValues: typeof initValuesUHS;
  handleSetUHsValues: React.Dispatch<
    React.SetStateAction<typeof initValuesUHS>
  >;
}

export const ValuesStep = ({
  title,
  UHsValues,
  handleSetUHsValues,
}: ValuesStepProps) => {
  return (
    <div className="values-step">
      <div
        className="titleContainerBx"
        style={{ fontSize: 18, textAlign: "center", color: "#1976d2" }}
      >
        {title}
      </div>
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
          <ValuesRowsStep
            UHsValues={UHsValues}
            handleSetUHsValues={handleSetUHsValues}
          />
        </Table>
      </TableContainer>

      <FoodStep />
    </div>
  );
};
