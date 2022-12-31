import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createData, head, Row } from "./helpers";
import { AllTariffsProps } from "../../hooks/api/interfaces";

interface CollapsibleTableProps {
  rows: ReturnType<typeof createData>[];
  handleChangeOrder?: (id: number, side: string) => void;
  handleToggleActive?: (name: string, active: boolean) => void;
  allTariffs: AllTariffsProps[];
}

export default function CollapsibleTableTariff({
  rows,
  handleChangeOrder,
  handleToggleActive,
  allTariffs,
}: CollapsibleTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {head.map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.name}
              row={row}
              handleChangeOrder={handleChangeOrder}
              handleToggleActive={handleToggleActive}
              allTariffs={allTariffs}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
