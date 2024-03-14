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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  return (
    <GenerateTariffProvider>

      <div className="home">

        <Sidebar />
        <div className="homeBx">
          <Navbar />
          <form id="form" onSubmit={(e) => {e.preventDefault()}}>
          <div className="p20">
            {/* modal */}
            <ModalDiscount />
            <ModalPermissionDiscount />
            <div className="containerBx">

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
          </form>
        </div>
      </div>
    </GenerateTariffProvider>
  );
};

export default Home;
