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
import { useApi } from "../../hooks/api/api";
import { AllTariffsProps } from "../../hooks/api/interfaces";
import Btn from "../Btn";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import CollapsibleTableTariffRelationsShip from "../TableCollapseRelationships";
import { createDataRelationship } from "../TableCollapseRelationships/helpers";

export const head = ["Nome", "Pipe", "up", "down", "ativo"];

export function convertForReal(number?: number) {
  if (typeof number !== "number") {
    return number;
  }
  return `R$ ${number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function createData({
  name,
  product_pipe,
  active,
  order_id,
  food_id,
  food,
  TariffCheckInValues,
  TariffValues,
  tariffs_to_midweek,
  tariffs_to_weekend,
  SpecificDates,
}: AllTariffsProps) {
  return {
    name,
    product_pipe,
    active,
    order_id,
    food_id,
    food,
    TariffCheckInValues,
    TariffValues,
    tariffs_to_midweek,
    tariffs_to_weekend,
    SpecificDates,
  };
}

export function Row(props: {
  row: ReturnType<typeof createData>;
  handleChangeOrder?: (id: number, side: string) => void;
  handleToggleActive?: (name: string, active: boolean) => void;
  allTariffs: AllTariffsProps[];
}) {
  const { row, handleChangeOrder, handleToggleActive } = props;
  const [open, setOpen] = React.useState(false);
  const [rowDays, setRowDays] = React.useState<
    ReturnType<typeof createDataRelationship>[]
  >([]);

  const makeRowDays = () => {
    let rows = [];

    if (row.tariffs_to_midweek && row.tariffs_to_midweek.length > 0) {
      rows.push(
        createDataRelationship({
          types: "Meio de Semana",
          tariff_to_midweek: row.tariffs_to_midweek,
          tariff_to_weekend: row.tariffs_to_weekend,
          SpecificDates: row.SpecificDates,
        })
      );
    }

    if (row.tariffs_to_weekend && row.tariffs_to_weekend.length > 0) {
      rows.push(
        createDataRelationship({
          types: "Fim de Semana",
          tariff_to_midweek: row.tariffs_to_midweek,
          tariff_to_weekend: row.tariffs_to_weekend,
          SpecificDates: row.SpecificDates,
        })
      );
    }

    if (row.SpecificDates && row.SpecificDates.length > 0) {
      rows.push(
        createDataRelationship({
          types: "Dias Específicos",
          tariff_to_midweek: row.tariffs_to_midweek,
          tariff_to_weekend: row.tariffs_to_weekend,
          SpecificDates: row.SpecificDates,
        })
      );
    }

    setRowDays(rows);
  };

  React.useEffect(() => {
    makeRowDays();
  }, []);

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
          {row.name}
        </TableCell>
        <TableCell>{row.product_pipe}</TableCell>
        <TableCell>
          <button
            className="css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
            onClick={() => {
              if (handleChangeOrder) handleChangeOrder(row.order_id, "up");
            }}
          >
            <KeyboardArrowUpIcon />
          </button>
        </TableCell>
        <TableCell>
          <button
            className="css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
            onClick={() => {
              if (handleChangeOrder) handleChangeOrder(row.order_id, "down");
            }}
          >
            <KeyboardArrowDownIcon />
          </button>
        </TableCell>
        <TableCell>
          <button
            className="css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
            onClick={() => {
              if (handleToggleActive) handleToggleActive(row.name, !row.active);
            }}
          >
            {row.active ? <CheckBox /> : <CheckBoxOutlineBlank />}
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tarifa Base
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>UH</TableCell>
                    <TableCell>ADT</TableCell>
                    <TableCell>ADT ext</TableCell>
                    <TableCell>0 a 3</TableCell>
                    <TableCell>4 a 7</TableCell>
                    <TableCell>8 a 12</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.TariffValues?.map((tariff) => (
                    <TableRow key={tariff.id}>
                      <TableCell>{tariff.category_id}</TableCell>
                      <TableCell>{convertForReal(tariff.adt)}</TableCell>
                      <TableCell>{convertForReal(tariff.adtex)}</TableCell>
                      <TableCell>{convertForReal(tariff.chd0)}</TableCell>
                      <TableCell>{convertForReal(tariff.chd4)}</TableCell>
                      <TableCell>{convertForReal(tariff.chd8)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Alimentação
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>ADT</TableCell>
                    <TableCell>ADT ext</TableCell>
                    <TableCell>0 a 3</TableCell>
                    <TableCell>4 a 7</TableCell>
                    <TableCell>8 a 12</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.food?.id}
                    </TableCell>
                    <TableCell>{convertForReal(row.food?.adt)}</TableCell>
                    <TableCell>{convertForReal(row.food?.adtex)}</TableCell>
                    <TableCell>{convertForReal(row.food?.chd0)}</TableCell>
                    <TableCell>{convertForReal(row.food?.chd4)}</TableCell>
                    <TableCell>{convertForReal(row.food?.chd8)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Check-in antecipado
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>ADT</TableCell>
                    <TableCell>ADT ext</TableCell>
                    <TableCell>0 a 3</TableCell>
                    <TableCell>4 a 7</TableCell>
                    <TableCell>8 a 12</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.TariffCheckInValues?.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell>{check.type}</TableCell>
                      <TableCell>{convertForReal(check.adt)}</TableCell>
                      <TableCell>{convertForReal(check.adtex)}</TableCell>
                      <TableCell>{convertForReal(check.chd0)}</TableCell>
                      <TableCell>{convertForReal(check.chd4)}</TableCell>
                      <TableCell>{convertForReal(check.chd8)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 5 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tarifas aplicadas em:
              </Typography>
              <CollapsibleTableTariffRelationsShip rows={rowDays} />
            </Box>
            <Box
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <Btn action="Editar" color="green" onClick={() => {}} />
              <Btn action="Deletar" color="red" onClick={() => {}} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
