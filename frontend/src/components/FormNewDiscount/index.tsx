import {
  Alert,
  AlertTitle,
  Button,
  TextField,
  useStepContext,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "../../hooks/api/api";
import { ErrorComponent } from "./ErrorComponent";
import "./style.scss";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useNavigate } from "react-router-dom";
import { DateRange, DateRangePicker, RangeKeyDict } from "react-date-range";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Btn from "../Btn";
import { addDays, format } from "date-fns";

export interface FormDateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

export const FormNewDiscount = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const api = useApi();
  const [errForm, setErrForm] = useState("");
  const [applied, setApplied] = useState<string[]>([]);
  const [datesRange, setDatesRange] = useState<FormDateRangeProps[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "0",
    },
  ]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    console.log(datesRange);
    const arrayDates: { date: string }[] = [];
    datesRange.map((range) => {
      let initDay = range.startDate;
      let lastDay = range.endDate;

      while (initDay <= lastDay) {
        if (!applied.includes(format(initDay, "yyyy-MM-dd")))
          arrayDates.push({ date: format(initDay, "yyyy-MM-dd") });
        initDay = addDays(initDay, 1);
      }
    });

    if (!arrayDates.length) {
      setErrForm("Nem uma data selecionada");
    }

    const setDates = new Set();

    const filteredDates = arrayDates.filter((dates) => {
      const duplicated = setDates.has(dates.date);
      setDates.add(dates.date);
      return !duplicated;
    });
    console.log("NO DUPLICATE", filteredDates);

    api
      .createDiscount(
        data.name,
        +data.generalPercent,
        +data.unitaryPercent,
        filteredDates
      )
      .then((response) => {
        //console.log(response);
        navigate("/discounts");
      })
      .catch((err) => {
        setErrForm("Erro do servidor");
        if (err?.response?.data?.message?.message)
          setErrForm(err.response.data.message.message);
        console.log(err);
      });
  };

  const getApplied = async () => {
    const appliedArrayDates: string[] = [];
    const response = await api.getAllDiscounts();
    response.map((disc) => {
      disc.dates.map((date) => {
        appliedArrayDates.push(date.date);
      });
    });
    setApplied(appliedArrayDates);
  };

  const addRange = () => {
    const key = datesRange.length;
    console.log();
    setDatesRange([
      ...datesRange,
      {
        startDate: addDays(new Date(), key),
        endDate: addDays(new Date(), key),
        key: String(key),
      },
    ]);
  };

  const handleChangeRange = (item: RangeKeyDict) => {
    console.log(item[Object.keys(item)[0]]);
    const obj = item[Object.keys(item)[0]];
    if (obj.key === undefined) return;
    const arr = datesRange;
    arr[+obj.key].startDate = obj.startDate || new Date();
    arr[+obj.key].endDate = obj.endDate || new Date();
    setDatesRange(arr);
  };

  const removeRange = () => {
    const arr = datesRange;
    arr.pop();
    setDatesRange([...arr]);
  };

  const customDisableDays = (day: Date) => {
    if (applied.includes(format(day, "yyyy-MM-dd"))) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    getApplied();
  }, []);

  return (
    <div className="new-requirement">
      {!!errForm && <ErrorComponent msg={errForm} />}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <TextField
            required
            margin="dense"
            {...register("name")}
            label="Nome"
            type="text"
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            {...register("generalPercent")}
            label="% limite Geral"
            type="number"
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            {...register("unitaryPercent")}
            label="% limite unitário"
            type="number"
            variant="outlined"
          />
          <h4>Período:</h4>
          <div className="buttons">
            <Button
              variant="outlined"
              startIcon={<ChevronLeft />}
              onClick={removeRange}
            >
              remover
            </Button>
            <Button
              variant="outlined"
              endIcon={<ChevronRight />}
              onClick={addRange}
            >
              adicionar
            </Button>
          </div>

          <DateRange
            onChange={handleChangeRange}
            ranges={datesRange}
            locale={ptBR}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            disabledDay={customDisableDays}
          />
        </div>

        <div className="button">
          <Btn action="Cadastrar" color="whiteBlue" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
