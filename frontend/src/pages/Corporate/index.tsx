import "./style.scss";
import "react-date-range/dist/styles.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "react-date-range/dist/theme/default.css";
import { InfoTable } from "../../components/InfoTables";
import { ButtonsBudget } from "../../components/ButtonsBudget";
import { CalendarPicker } from "../../components/CalendarPicker";
import TableCalc from "../../components/TableCalc";
import { GenerateTariffCorporateProvider} from "../../context/generateTariff/generateTariff";
import { ModalDiscount } from "../../components/ModalDiscount";
import ModalPermissionDiscount from "../../components/ModalPermissionDiscount";
import { FormOrcCorporate } from "../../components/FormOrc/corporate";
import { Box } from "@mui/system";
import { ListUHsCorporate } from "../../components/ListUHsCorporate/ListUHsCorporate";

const Corporate = () => {
  return (
    <GenerateTariffCorporateProvider>
        <div className="home">
          <Sidebar />
          <div className="homeBx">
            <Navbar />
            <div className="p20">
              {/* modal */}
              {/* <ModalDiscount />  DISCONTO UNITARIO NÂO VAI USAR POR ENQUANTO*/}
              <ModalPermissionDiscount corporate />
              <div className="containerBx">

                <div className="top">
                  <CalendarPicker corporate />
                  <FormOrcCorporate />
                </div>
                <div className="bottom">
                  <ListUHsCorporate />
                  <TableCalc corporate />
                </div>
                <div className="buttons">
                  <InfoTable corporate />
                  <ButtonsBudget corporate />
                </div>
              </div>
            </div>
          </div>
        </div>
    </GenerateTariffCorporateProvider>
  );
};

export default Corporate;
