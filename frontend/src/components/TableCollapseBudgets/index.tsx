import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createData, head, Row } from "./helpers";

interface CollapsibleTableProps {
  rows: ReturnType<typeof createData>[];
  ButtonsOn?: boolean;
  reloadRows?: VoidFunction;
}

export default function CollapsibleTableBudgets({
  rows,
  ButtonsOn = true,
  reloadRows = () => {},
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
              key={row.id}
              row={row}
              ButtonsOn={ButtonsOn}
              reloadRows={reloadRows}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
