import {
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import { useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";
import "../style.scss";
import TableBodyComponent from "./table-body";
import Head from "./table-head";
import addLayoutRoomToDescription from "./addLayoutRoomToDescription";

const TableCalcCorp = () => {
  const { dataTable, bodyResponseBudget } = useGenerateTariffCorporate()
  const data = addLayoutRoomToDescription(dataTable, bodyResponseBudget);
  

  return (
    <TableContainer component={Paper} className="corp_table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Head data={data} />
        <TableBodyComponent data={data} />
      </Table>
    </TableContainer>
  );
};

export default TableCalcCorp;
