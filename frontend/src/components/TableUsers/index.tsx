import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CheckBox, CheckBoxOutlineBlank, Delete } from "@mui/icons-material";
import { useApi } from "../../hooks/api/api";
import { deleteUser } from "../../pages/Users/deleteUser";

export interface dataUserProps {
  id: string;
  name: string;
  level: number;
  pipe: number;
  active: boolean;
}

export function createDataUsers(
  id: string,
  name: string,
  level: number,
  pipe: number,
  active: boolean
) {
  return { id, name, level, pipe, active };
}

export default function TableUsers({ rows }: { rows: dataUserProps[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Nivel de permissão</TableCell>
            <TableCell align="right">Pipe</TableCell>
            <TableCell align="right">Ativo</TableCell>
            <TableCell align="right">Apagar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.pipe}</TableCell>
              <TableCell align="right">
                <button
                  className="css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                  onClick={() => {}}
                >
                  {row.active ? <CheckBox /> : <CheckBoxOutlineBlank />}
                </button>
              </TableCell>

              <TableCell align="right">
                <button
                  className="css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                  onClick={() => {
                    deleteUser(row.id);
                  }}
                >
                  <Delete />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
