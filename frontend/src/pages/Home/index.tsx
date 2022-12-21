import React, { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns/esm";
import { ptBR } from "date-fns/locale";
import { format, isWeekend } from "date-fns";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TableCalc, { DataContentProps } from "../../components/TableCalc";
import "./style.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FormOrc } from "../../components/FormOrc";
import Btn from "../../components/Btn";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete, Folder, Paid } from "@mui/icons-material";
import { useApi } from "../../hooks/api";
import pdfBudget from "./pdfBudget";
import { AuthContext } from "../../context/authContext";
import { ModalRequirement } from "../../components/ModalRequirement";
import pdfDescription from "./pdfDescription";
import { useAppApi } from "../../hooks/app";
import { pipeChangeDeal } from "./functions/pipeChangeDeal";

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

const Home = () => {
  const api = useApi();
  const app = useAppApi();
  const { userLogin } = useContext(AuthContext);
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

  async function generatePdfBudget() {
    pipeChangeDeal(userLogin, budgets);
    const arrUser = await api.findUniqueUser(userLogin);
    pdfBudget(
      budgets,
      arrUser.name,
      arrUser.email,
      arrUser.phone,
      arrUser.token_pipe
    );
  }

  async function generatePdfDescription() {
    const arrUser = await api.findUniqueUser(userLogin);

    pdfDescription(budgets, arrUser.token_pipe);
  }

  async function clearTariffs() {
    setBudgets([]);
  }

  function customDayContent(day: Date) {
    let extraDot = null;
    if (holidays.includes(format(day, "yyyy-MM-dd"))) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "orange",
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
      );
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }

  function customDisableDays(day: Date) {
    if (holidays.includes(format(day, "yyyy-MM-dd"))) {
      return false;
    }

    if (monthsWithTariffs.includes(format(day, "yyyy-MM"))) {
      return false;
    }

    return true;
  }

  const dataInitial = {
    rows: [],
    columns: [],
  };

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
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                months={2}
                showDateDisplay={false}
                disabledDay={customDisableDays}
                dayContentRenderer={customDayContent}
                direction="horizontal"
                locale={ptBR}
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
              <div className="infoTable">
                <>
                  <Typography sx={{ mb: 2 }} variant="h6" component="div">
                    Orçamentos:
                  </Typography>
                  {budgets.map((budget, index) => {
                    let countDaily = budget.columns.length - 2;
                    let primary = `${countDaily} diárias no ${budget.arrComplete.responseForm.category}`;
                    let total = 0;
                    budget.rows.map((row) => {
                      total += Number(row.total);
                    });
                    return (
                      <List dense={true} key={index}>
                        <ListItem
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteLine(index)}
                            >
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <Paid />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={primary}
                            secondary={`Pensão: ${
                              budget.arrComplete.responseForm.pension
                            } \n Total: R$ ${total.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                          />
                        </ListItem>
                      </List>
                    );
                  })}
                </>
              </div>
              <div className="boxButtons" style={{ marginTop: 32 }}>
                <Btn
                  action="Salvar Orçamento"
                  color="blue"
                  onClick={() => {
                    if (dataTable.rows.length === 0) {
                      return;
                    }
                    setBudgets((old) => {
                      return [...old, { ...dataTable, arrComplete }];
                    });
                  }}
                />
                <Btn
                  action="Gerar PDF Orçamento"
                  color="darkBlue"
                  onClick={generatePdfBudget}
                />
                <Btn
                  action="Gerar PDF tarifa"
                  color="dashboard"
                  onClick={generatePdfDescription}
                />
                <Btn action="Limpar" color="red" onClick={clearTariffs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
