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
import ModalPermissionDiscount from "../../components/ModalPermissionDiscount";
import { FormOrcCorporate } from "../../components/FormOrc/corporate";
import { ListUHsCorporate } from "../../components/ListUHsCorporate/ListUHsCorporate";
import {
  ModalDescriptionUniqueRoomProvider
} from "../../context/generateTariff/context/ModalDescriptionUniqueRoomContext";
import ModalDescriptionUniqueRoom from "./ModalDescriptionUniqueRoom";
import TableCalcCorp from "../../components/TableCalc/corp";

const Corporate = () => {
  return (
    <GenerateTariffCorporateProvider>
      <ModalDescriptionUniqueRoomProvider>

        <div className="corporate">
          <Sidebar />
          <div className="corporateBx">
            <Navbar />
            <div className="p20">
              {/* modal */}
              {/* <ModalDiscount />  DESCONTO UNITARIO NÂO VAI USAR POR ENQUANTO*/}
              <ModalPermissionDiscount corporate />
              <ModalDescriptionUniqueRoom />
              <div className="containerBx">

                <div className="top">
                  <CalendarPicker corporate />
                  <FormOrcCorporate />
                </div>
                
                <div className="bottom">
                  <ListUHsCorporate />
                  
                  <TableCalcCorp />
                </div>
                <div className="buttons">
                    {/* <InfoTable corporate /> */}
                    <ButtonsBudget corporate />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </ModalDescriptionUniqueRoomProvider>
    </GenerateTariffCorporateProvider>
  );
};

export default Corporate;
