import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { calcTotal } from "../../context/generateTariff/functions/calcTotal";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import "./style.scss";

const relationWithDiscountAndNoDiscount = (
  a: number | string,
  b: number | string,
  white = true
) => (
  <>
    {a === b ? (
      a
    ) : (
      <>
        <div
          style={{
            color: "gray",
            position: "absolute",
            left: 2,
            top: 3,
            fontSize: 12,
          }}
        >
          {b}
        </div>
        <div
          style={
            white
              ? {
                  background: "white",
                  fontWeight: "bold",
                }
              : {
                  background: "rgb(248,248,248)",
                  fontWeight: "bold",
                }
          }
        >
          {a}
        </div>
      </>
    )}
  </>
);

const TableCalc = () => {
  const { dataTable: data, handleClickOpenModalDiscount } = useContext(
    GenerateTariffContext
  );

  let calc = calcTotal(data);
  let totalPerRow = calc.totalPerRow;
  let total = calc.total;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ background: "#222e3f" }}>
            {data.columns.map((column) => (
              <TableCell
                style={{ color: "white", fontWeight: "bold" }}
                key={column}
              >
                {column}
              </TableCell>
            ))}
            {!!data.columns.length && (
              <>
                <TableCell
                  align="center"
                  style={{ color: "white", fontWeight: "bold", maxWidth: 30 }}
                >
                  desconto% unitário
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  TOTAL
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                component="th"
                scope="row"
                style={{ background: "rgb(248,248,248)" }}
              >
                {row.desc}
              </TableCell>

              {row.values.map((value, index) => (
                <TableCell key={index} style={{ position: "relative" }}>
                  {relationWithDiscountAndNoDiscount(
                    value,
                    row.noDiscount[index]
                  )}
                </TableCell>
              ))}

              {!!row.values.length && (
                <>
                  <TableCell
                    align="center"
                    style={{ cursor: "pointer" }}
                    onDoubleClick={() => {
                      handleClickOpenModalDiscount({
                        id: +row.id,
                        name: row.desc,
                        discount: +row.discountApplied,
                      });
                    }}
                  >
                    {row.discountApplied} %
                    {/* <OutlinedInput
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    /> */}
                  </TableCell>
                  <TableCell
                    style={{
                      background: "rgb(248,248,248)",
                      fontWeight: "bold",
                      position: "relative",
                    }}
                  >
                    {relationWithDiscountAndNoDiscount(
                      row.total,
                      row.totalNoDiscount,
                      false
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              "&:last-child td": { background: "rgb(248,248,248)" },
            }}
          >
            {!!total.total && (
              <>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ background: "rgb(248,248,248)" }}
                >
                  TOTAL
                </TableCell>

                {totalPerRow.map((value, index) => (
                  <TableCell key={index} style={{ position: "relative" }}>
                    {relationWithDiscountAndNoDiscount(
                      value.total,
                      value.noDiscount,
                      false
                    )}
                  </TableCell>
                ))}

                <TableCell
                  style={{
                    background: "rgb(248,248,248)",
                    fontWeight: "bold",
                    color: "#d34747",
                  }}
                  align="center"
                >
                  {total.total - total.noDiscount}
                </TableCell>

                <TableCell
                  style={{
                    background: "rgb(248,248,248)",
                    fontWeight: "bold",
                    position: "relative",
                  }}
                >
                  {relationWithDiscountAndNoDiscount(
                    total.total,
                    total.noDiscount,
                    false
                  )}
                </TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCalc;
