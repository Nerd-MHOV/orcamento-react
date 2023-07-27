import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useApi } from "../../hooks/api/api";
import { ErrorComponent } from "./ErrorComponent";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { DateRange, RangeKeyDict } from "react-date-range";
import { ptBR } from "date-fns/locale";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import Btn from "../Btn";
import { addDays, format } from "date-fns";
import { Box } from "@mui/system";

export interface FormDateRangeProps {
  startDate: Date;
  endDate: Date;
  key: string;
}

type ApplicableInType = "midweek" | "weekend" | "all" | "";

export const FormNewDiscount = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const api = useApi();
  const [errForm, setErrForm] = useState("");
  const [checkCourtesy, setCheckCourtesy] = useState(false);
  const [applicableIn, setApplicableIn] = useState<ApplicableInType>("");
  const [datesRange, setDatesRange] = useState<FormDateRangeProps[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "0",
    },
  ]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!applicableIn) {
      setErrForm("Selecione a onde deseja aplicar a ação");
      return;
    }
    const arrayDates: { date: string }[] = [];
    datesRange.map((range) => {
      let initDay = range.startDate;
      let lastDay = range.endDate;

      while (initDay <= lastDay) {
        arrayDates.push({ date: format(initDay, "yyyy-MM-dd") });
        initDay = addDays(initDay, 1);
      }
    });

    if (!arrayDates.length) {
      setErrForm("Nem uma data selecionada");
      return;
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
        +data.daily_minimum,
        +data.daily_maximum,
        +data.payers_minimum,
        filteredDates,
        checkCourtesy,
        applicableIn
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

  return (
    <div className="new-requirement">
      {!!errForm && <ErrorComponent msg={errForm} />}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={2}>
          <div className="grid">
            <TextField
              required
              margin="dense"
              {...register("name")}
              label="Nome"
              type="text"
              variant="outlined"
            />
            <Box gap={2} display="flex">
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
            </Box>
            <Box gap={2} display="flex">
              <TextField
                required
                margin="dense"
                {...register("daily_minimum")}
                label="Mínimo de diárias"
                type="number"
                variant="outlined"
              />
              <TextField
                required
                margin="dense"
                {...register("daily_maximum")}
                label="Máximo de diárias"
                type="number"
                variant="outlined"
              />
            </Box>
            <TextField
              required
              margin="dense"
              {...register("payers_minimum")}
              label="Mínimo de pagantes"
              type="number"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="applied_in_field">Aplicar em</InputLabel>
              <Select
                labelId="applied_in_field"
                id="applied_in"
                value={applicableIn}
                label="Aplicar em"
                onChange={(e) => {
                  if (
                    e.target.value === "midweek" ||
                    e.target.value === "weekend" ||
                    e.target.value === "all"
                  )
                    setApplicableIn(e.target.value);
                }}
              >
                <MenuItem value={"midweek"}>Somente meio de semana</MenuItem>
                <MenuItem value={"weekend"}>Somente final de semana</MenuItem>
                <MenuItem value={"all"}>Todos</MenuItem>
              </Select>
            </FormControl>

            <div className="daily-courtesy">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setCheckCourtesy(!checkCourtesy);
                }}
              >
                {checkCourtesy ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </IconButton>{" "}
              <p style={{ color: "#757575" }}>Diária Cortesia</p>
            </div>
          </div>

          <Box display="flex" flexDirection="column">
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
            />
          </Box>
        </Box>

        <div className="button">
          <Btn action="Cadastrar" color="whiteBlue" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};
