import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createDataRelationship, head, Row } from "./helpers";

interface CollapsibleTableProps {
  rows: ReturnType<typeof createDataRelationship>[];
}

export default function CollapsibleTableTariffRelationsShip({
  rows,
}: CollapsibleTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        {/* <TableHead>
          <TableRow>
            <TableCell />
            {head.map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row) => (
            <Row key={row.types} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
