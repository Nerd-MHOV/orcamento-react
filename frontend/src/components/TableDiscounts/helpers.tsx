import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useApi } from "../../hooks/api/api";

import {
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  Edit,
} from "@mui/icons-material";
import { ApiDiscountProps } from "../../hooks/api/interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DialogDeleteDiscount } from "../DialogDeleteDiscount";

export const head = [
  "Nome",
  "Porcentagem Geral",
  "Porcentagem Unitária",
  "Diária Cortesia",
  "Ativo",
  "Editar",
  "Deletar",
];

export function Row(props: {
  row: ApiDiscountProps;
  ButtonsOn: boolean;
  reloadRows: VoidFunction;
}) {
  const api = useApi();
  const { row, ButtonsOn, reloadRows } = props;
  const [open, setOpen] = React.useState(false);
  const [openUH, setOpenUH] = React.useState(false);
  const [rowToDelete, setRowToDelete] = React.useState<
    ApiDiscountProps | undefined
  >();
  const [deleteOpenModal, setDeleteOpenModal] = React.useState(false);

  const handleToggleActive = async (id: string) => {
    await api.toggleActiveDiscount(id);
    reloadRows();
  };

  const handleToggleDailyCourtesy = async (id: string) => {
    await api.toggleDailyCourtesy(id);
    reloadRows();
  };

  const handleCloseModal = () => {
    setDeleteOpenModal(false);
  };

  const handleOpenModal = (row: ApiDiscountProps) => {
    setRowToDelete(row);
    setDeleteOpenModal(true);
  };

  const handleDelete = async () => {
    if (rowToDelete === undefined) return;
    await api.deleteDiscount(rowToDelete.id);
    handleCloseModal();
    reloadRows();
  };

  return (
    <React.Fragment>
      <DialogDeleteDiscount
        open={deleteOpenModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
        rowDelete={rowToDelete}
      />
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
          {row.name}
        </TableCell>
        <TableCell>{row.percent_general}%</TableCell>
        <TableCell>{row.percent_unitary}%</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleToggleDailyCourtesy(row.id);
            }}
          >
            {row.daily_courtesy ? <CheckBox /> : <CheckBoxOutlineBlank />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleToggleActive(row.id);
            }}
          >
            {row.active ? <CheckBox /> : <CheckBoxOutlineBlank />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => {}}>
            <Edit />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              handleOpenModal(row);
            }}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Datas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.dates.map((date) => (
                  <TableRow key={date.date}>
                    <TableCell></TableCell>

                    <TableCell>
                      {format(new Date(date.date), "dd / MM / yy", {
                        locale: ptBR,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
