import {
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import { useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";
import "../style.scss";
import TableBodyComponent from "./table-body";
import Head from "./table-head";

const TableCalcCorp = () => {
  const { dataTable: data } = useGenerateTariffCorporate()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Head data={data} />
        <TableBodyComponent data={data} />
      </Table>
    </TableContainer>
  );
};

export default TableCalcCorp;
