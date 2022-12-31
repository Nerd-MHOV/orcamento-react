import "./style.scss";
import { useApi } from "../../hooks/api/api";
import "react-date-range/dist/styles.css";
import { useAppApi } from "../../hooks/appHotel/app";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "react-date-range/dist/theme/default.css";
import { FormOrc } from "../../components/FormOrc";
import { InfoTable } from "../../components/InfoTables";
import { ButtonsBudget } from "../../components/ButtonsBudget";
import { CalendarPicker } from "../../components/CalendarPicker";
import TableCalc, { DataContentProps } from "../../components/TableCalc";
import { AppHotelProps } from "../../hooks/appHotel/interfaces";
import { ArrCompleteProps } from "../../components/FormOrc/Interfaces";
import { getHolidays } from "./functions/getters/getHolidays";
import { getMonthsWithTariffs } from "./functions/getters/getMonthsWithTariffs";
import { getUnitUsing } from "./functions/getters/getUnitUsing";
import { getColumnData } from "./functions/getters/getColumnData";
import { AuthContext } from "../../context/authContext";

const dataInitial = {
  rows: [],
  columns: [],
};

const selectionRangeInitial = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const Home = () => {
  const api = useApi();
  const app = useAppApi();
  const [dataTable, setDataTable] = useState<DataContentProps>(dataInitial);
  const [budgets, setBudgets] = useState<DataContentProps[]>([]);
  const [arrComplete, setArrComplete] = useState<ArrCompleteProps | []>([]);
  const [selectionRange, setSelectionRange] = useState(selectionRangeInitial);
  const [holidays, setHolidays] = useState<String[]>([]);
  const [monthsWithTariffs, setMonthsWithTariffs] = useState<String[]>([]);
  const [stateApp, setStateApp] = useState<AppHotelProps | null>(null);
  const [unitUsing, setUnitUsing] = useState<string[]>([]);

  const getVariables = async () => {
    setDataTable(dataInitial);
    setHolidays(await getHolidays());
    setMonthsWithTariffs(await getMonthsWithTariffs());
  };

  async function handleSelect(ranges: any) {
    setSelectionRange(ranges.selection);
    setDataTable((par) => ({
      rows: par.rows,
      columns: getColumnData(ranges.selection),
    }));
    setUnitUsing([]);
    const response = await getUnitUsing(ranges.selection);
    setStateApp(response.response);
    setUnitUsing(response.units);
  }

  async function handleSaveBudget() {
    if (dataTable.rows.length === 0) {
      return;
    }
    setBudgets((old) => {
      return [...old, { ...dataTable, arrComplete }];
    });
  }

  async function clearTariffs() {
    setBudgets([]);
  }

  function addRows(rows: any[], arrComplete: any) {
    setDataTable((par) => {
      return {
        rows: rows,
        columns: par.columns,
      };
    });
    setArrComplete(arrComplete);
  }

  function deleteLine(indexDelete: number) {
    setBudgets((old) => {
      return old.filter((arr, index) => index !== indexDelete);
    });
  }

  useEffect(() => {
    getVariables();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeBx">
        <Navbar />
        <div className="p20">
          <div className="containerBx">
            <div className="top">
              <CalendarPicker
                handleSelect={handleSelect}
                holidays={holidays}
                monthsWithTariffs={monthsWithTariffs}
                selectionRange={selectionRange}
              />

              <FormOrc
                stateApp={stateApp}
                selectionRange={selectionRange}
                addRows={addRows}
                unitUsing={unitUsing}
              />
            </div>

            <div className="bottom">
              <TableCalc data={dataTable} />
            </div>

            <div className="buttons">
              <InfoTable budgets={budgets} deleteLine={deleteLine} />
              <ButtonsBudget
                budgets={budgets}
                clearTariffs={clearTariffs}
                handleSaveBudget={handleSaveBudget}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
