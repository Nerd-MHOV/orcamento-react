import { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns/esm";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

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

const Home = () => {
  const api = useApi();
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

  async function handleSelect(ranges: any) {
    setSelectionRange(ranges.selection);
    changeColumnData(ranges.selection);
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
    console.log(arrComplete, "arr");
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
    const arrUser = await api.findUniqueUser(userLogin);
    pdfBudget(budgets, arrUser.name, arrUser.email, arrUser.phone);
  }

  const dataInitial = {
    rows: [],
    columns: [],
  };

  useEffect(() => {
    setDataTable(dataInitial);
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
                direction="horizontal"
                locale={ptBR}
              />

              <FormOrc selectionRange={selectionRange} addRows={addRows} />
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
                    console.log("budget", budget);
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
                    console.log("budgets", budgets);
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
                  onClick={() => {}}
                />
                <Btn action="Limpar" color="red" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
