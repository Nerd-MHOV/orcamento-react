import { useEffect, useState } from "react";
import { addDays } from "date-fns/esm";
import { format } from "date-fns";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TableCalc, { DataContentProps } from "../../components/TableCalc";
import "./style.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FormOrc } from "../../components/FormOrc";

import { useApi } from "../../hooks/api";
import { useAppApi } from "../../hooks/app";
import { CalendarPicker } from "../../components/CalendarPicker";
import { InfoTable } from "../../components/InfoTables";
import { ButtonsBudget } from "../../components/ButtonsBudget";

export interface AppHotelProps {
  reservas: {
    unidade: string;
    [key: string]: any;
  };
  qntdReservas: number;
  processadas: number;
  confirmadas: number;
  bloqueios: number;
  qntdAdt: number;
  qntdChd: number;
}

const dataInitial = {
  rows: [],
  columns: [],
};

const Home = () => {
  const api = useApi();
  const app = useAppApi();
  const [dataTable, setDataTable] = useState<DataContentProps>({
    rows: [],
    columns: [],
  });

  const [budgets, setBudgets] = useState<DataContentProps[]>([]);
  const [arrComplete, setArrComplete] = useState<any>([]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [holidays, setHolidays] = useState<String[]>([]);
  const [monthsWithTariffs, setMonthsWithTariffs] = useState<String[]>([]);
  const [stateApp, setStateApp] = useState<AppHotelProps | null>(null);
  const [unitUsing, setUnitUsing] = useState<string[]>([]);

  async function getHolidays() {
    await api.findHolidays().then((response) => {
      let arrayDate: String[] = [];
      response.map((date: { date: string; tariffs_id: string }) => {
        arrayDate.push(date.date);
      });

      setHolidays(arrayDate);
    });
  }

  async function getMonthsWithTariffs() {
    await api.findMonthWithTariff().then((response) => {
      let arrayMonths: String[] = [];
      response.map(
        (date: {
          date: string;
          tariff_to_midweek_id: string;
          tariff_to_weekend: string;
        }) => {
          arrayMonths.push(date.date);
        }
      );
      setMonthsWithTariffs(arrayMonths);
    });
  }

  async function getUnitUsing(date: {
    endDate: Date;
    key: string;
    startDate: Date;
  }) {
    setUnitUsing([]);
    await app
      .getHousingUnitsUsing(
        format(date.startDate, "yyyy-MM-dd"),
        format(date.endDate, "yyyy-MM-dd")
      )
      .then((response) => {
        let units: string[] = [];

        response.reservas.map((unit: { unidade: string }) => {
          units.push(unit.unidade);
        });
        setStateApp(response);

        setUnitUsing(units);
      });
  }

  async function handleSelect(ranges: any) {
    setSelectionRange(ranges.selection);
    changeColumnData(ranges.selection);
    getUnitUsing(ranges.selection);
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

  function changeColumnData(date: {
    endDate: Date;
    key: string;
    startDate: Date;
  }) {
    let newColumn: string[] = ["Desc"];
    let init = date.startDate;
    let final = date.endDate;
    final = addDays(final, 1);
    while (init < final) {
      newColumn.push(format(init, "dd/MM"));
      init = addDays(init, 1);
    }

    setDataTable((par) => {
      return {
        rows: par.rows,
        columns: newColumn,
      };
    });
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
    setDataTable(dataInitial);
    getHolidays();
    getMonthsWithTariffs();
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
