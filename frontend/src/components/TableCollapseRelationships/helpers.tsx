import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  CommonTariffProps,
  SpecificTariffProps,
} from "../../hooks/api/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const head = ["Tipo"];

export function convertForReal(number?: number) {
  if (typeof number !== "number") {
    return number;
  }
  return `R$ ${number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface CreateDataRelationshipProps {
  types: string;
  tariff_to_midweek?: CommonTariffProps[];
  tariff_to_weekend?: CommonTariffProps[];
  SpecificDates?: SpecificTariffProps[];
}
export function createDataRelationship({
  types,
  tariff_to_midweek,
  tariff_to_weekend,
  SpecificDates,
}: CreateDataRelationshipProps) {
  return {
    types,
    tariff_to_midweek,
    tariff_to_weekend,
    SpecificDates,
  };
}

export function Row(props: { row: ReturnType<typeof createDataRelationship> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.types}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Dia/mês</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tariff_to_midweek?.map((tariff) => (
                    <TableRow key={tariff.date}>
                      <TableCell>
                        {format(new Date(`${tariff.date}-02`), "MMMM yyyy", {
                          locale: ptBR,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.tariff_to_weekend?.map((tariff) => (
                    <TableRow key={tariff.date}>
                      <TableCell>
                        {format(new Date(`${tariff.date}-02`), "MMMM yyyy", {
                          locale: ptBR,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.SpecificDates?.map((tariff) => (
                    <TableRow key={tariff.date}>
                      <TableCell>
                        {format(
                          new Date(`${tariff.date} 18:00:00`),
                          "dd MMMM yyyy",
                          {
                            locale: ptBR,
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
