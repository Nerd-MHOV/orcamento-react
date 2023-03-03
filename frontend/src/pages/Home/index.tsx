import "./style.scss";
import "react-date-range/dist/styles.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "react-date-range/dist/theme/default.css";
import { FormOrc } from "../../components/FormOrc";
import { InfoTable } from "../../components/InfoTables";
import { ButtonsBudget } from "../../components/ButtonsBudget";
import { CalendarPicker } from "../../components/CalendarPicker";
import TableCalc from "../../components/TableCalc";
import { GenerateTariffProvider } from "../../context/generateTariff/generateTariff";
import { ModalDiscount } from "../../components/ModalDiscount";
import ModalPermissionDiscount from "../../components/ModalPermissionDiscount";

const Home = () => {
  return (
    <GenerateTariffProvider>
      <div className="home">
        <Sidebar />
        <div className="homeBx">
          <Navbar />
          <div className="p20">
            <div className="containerBx">
              {/* modal */}
              <ModalDiscount />
              <ModalPermissionDiscount />
              <div className="top">
                <CalendarPicker />
                <FormOrc />
              </div>
              <div className="bottom">
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

export default Home;
