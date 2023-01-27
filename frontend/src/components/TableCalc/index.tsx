import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableBody,
  Paper,
  TextField,
  InputAdornment,
  Input,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { useContext } from "react";
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
  const { dataTable: data } = useContext(GenerateTariffContext);
  let totalPerRow: {
    total: number;
    noDiscount: number;
  }[] = [];
  let total = {
    total: 0,
    noDiscount: 0,
  };
  if (data.rows)
    data.rows.map((row, rowIndex) => {
      if (row.values)
        row.values.map((value, index) => {
          if (totalPerRow[index]) {
            totalPerRow[index].total += value;
            totalPerRow[index].noDiscount +=
              data.rows[rowIndex].noDiscount[index];
          } else {
            totalPerRow[index] = {
              total: value,
              noDiscount: data.rows[rowIndex].noDiscount[index],
            };
          }
        });
    });

  total.noDiscount = totalPerRow.reduce(
    (total, arr) => total + arr.noDiscount,
    0
  );
  total.total = totalPerRow.reduce((total, arr) => total + arr.total, 0);
  console.log({ total, totalPerRow });

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
                      console.log(row.id);
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
