import "./style.scss";
import "react-date-range/dist/styles.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "react-date-range/dist/theme/default.css";
import { InfoTable } from "../../components/InfoTables";
import { ButtonsBudget } from "../../components/ButtonsBudget";
import { CalendarPicker } from "../../components/CalendarPicker";
import TableCalc from "../../components/TableCalc";
import { GenerateTariffProvider } from "../../context/generateTariff/generateTariff";
import { ModalDiscount } from "../../components/ModalDiscount";
import ModalPermissionDiscount from "../../components/ModalPermissionDiscount";
import { FormOrcCorporate } from "../../components/FormOrc/corporate";
import { Box } from "@mui/system";
import { ListUHsCorporate } from "../../components/ListUHsCorporate/ListUHsCorporate";

const Corporate = () => {
  return (
    <GenerateTariffProvider corporate>
        <div className="home">
          <Sidebar />
          <div className="homeBx">
            <Navbar />
            <div className="p20">
              {/* modal */}
              <ModalDiscount />
              <ModalPermissionDiscount />
              <div className="containerBx">

                <div className="top">
                  <CalendarPicker />
                  <FormOrcCorporate />
                </div>
                <div className="bottom">
                  <ListUHsCorporate />
                  <TableCalc />
                </div>
                <div className="buttons">
                  <InfoTable />
                  <ButtonsBudget />
                </div>
              </div>
            </div>
          </div>
        </div>
    </GenerateTariffProvider>
  );
};

export default Corporate;
