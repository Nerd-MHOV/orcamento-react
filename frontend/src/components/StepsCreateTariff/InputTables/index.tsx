import { FileCopy, Folder } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useContext, useState } from "react";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
import * as XLSX from "xlsx";

type ArrayXML = [
  {
    __EMPTY: "VALORES DA TARIFA PADRÃO PARA PENSÃO SIMPLES";
    __EMPTY_6: "INDEPENDÊNCIA / 2023";
  },
  {
    __EMPTY_1: "Até 02 ADT";
    __EMPTY_2: "ADT EXTRA";
    __EMPTY_3: "CHD 0 a 3";
    __EMPTY_4: "CHD 4 a 7";
    __EMPTY_5: "CHD 8 a 12";
    __EMPTY_6: "x";
  },
  ArrayValueXML,
  ArrayValueXML,
  ArrayValueXML,
  ArrayValueXML,
  ArrayValueXML,
  ArrayValueXML,
  ArrayValueXML,
  ArrayValueXML,
  {
    __EMPTY: "Extra incluso no pacote:";
    __EMPTY_1: 0;
  }
];

type ArrayValueXML = {
  __EMPTY: string;
  __EMPTY_1: number;
  __EMPTY_2: number;
  __EMPTY_3: number;
  __EMPTY_4: number;
  __EMPTY_5: number;
  __EMPTY_6: number;
};
export const InputTables = () => {
  const {
    arrTariffs,
    typeTariff,
    next,
    setAllFoodValues,
    setEarlyEntryValues,
    setUHValues,
    setSpecificName,
  } = useContext(CreateTariffContext);

  const [manualInput, setManualInput] = useState(false);
  const [holiday, setHoliday] = useState("");
  const [midweek, setMidweek] = useState("");
  const [weekend, setWeekend] = useState("");

  const readExcel = async (file: File) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (e.target) {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsName = wb.SheetNames[0];
          const ws = wb.Sheets[wsName];

          const data: any[] = XLSX.utils.sheet_to_json(ws);

          if (!data[2] || data[2].__EMPTY !== "Econômico")
            return reject("insira o tarifário correto");

          resolve(data);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    return promise as Promise<ArrayXML>;
  };

  const title =
    typeTariff === "common"
      ? "Insira as tabelas com os valores"
      : "Insira a tabela com os valores";

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "midweek" | "weekend" | "holiday"
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      readExcel(file).then((data) => {
        if (type === "midweek") {
          setMidweek(data[0].__EMPTY_6);
        }
        if (type === "weekend") {
          setWeekend(data[0].__EMPTY_6);
        }
        if (type === "holiday") {
          setHoliday(data[0].__EMPTY_6);
          setSpecificName(data[0].__EMPTY_6);
        }

        //food
        const keyType = type === "holiday" ? "specific" : type;
        setAllFoodValues(keyType, {
          adt: data[7].__EMPTY_1,
          adtex: data[7].__EMPTY_2,
          chd0: data[7].__EMPTY_3,
          chd4: data[7].__EMPTY_4,
          chd8: data[7].__EMPTY_5,
        });
        //EarlyCheckIn
        setEarlyEntryValues(keyType, "tenHour", "adt", data[9].__EMPTY_1);
        setEarlyEntryValues(keyType, "tenHour", "adtex", data[9].__EMPTY_2);
        setEarlyEntryValues(keyType, "tenHour", "chd0", data[9].__EMPTY_3);
        setEarlyEntryValues(keyType, "tenHour", "chd4", data[9].__EMPTY_4);
        setEarlyEntryValues(keyType, "tenHour", "chd8", data[9].__EMPTY_5);
        setEarlyEntryValues(keyType, "twentyHour", "adt", data[8].__EMPTY_1);
        setEarlyEntryValues(keyType, "twentyHour", "adtex", data[8].__EMPTY_2);
        setEarlyEntryValues(keyType, "twentyHour", "chd0", data[8].__EMPTY_3);
        setEarlyEntryValues(keyType, "twentyHour", "chd4", data[8].__EMPTY_4);
        setEarlyEntryValues(keyType, "twentyHour", "chd8", data[8].__EMPTY_5);
        //UHs
        setUHValues(keyType, "adt", "PAD", data[3].__EMPTY_1);
        setUHValues(keyType, "adtex", "PAD", data[3].__EMPTY_2);
        setUHValues(keyType, "chd0", "PAD", data[3].__EMPTY_3);
        setUHValues(keyType, "chd4", "PAD", data[3].__EMPTY_4);
        setUHValues(keyType, "chd8", "PAD", data[3].__EMPTY_5);

        setUHValues(keyType, "adt", "PADV", data[4].__EMPTY_1);
        setUHValues(keyType, "adtex", "PADV", data[4].__EMPTY_2);
        setUHValues(keyType, "chd0", "PADV", data[4].__EMPTY_3);
        setUHValues(keyType, "chd4", "PADV", data[4].__EMPTY_4);
        setUHValues(keyType, "chd8", "PADV", data[4].__EMPTY_5);

        setUHValues(keyType, "adt", "LUX", data[5].__EMPTY_1);
        setUHValues(keyType, "adtex", "LUX", data[5].__EMPTY_2);
        setUHValues(keyType, "chd0", "LUX", data[5].__EMPTY_3);
        setUHValues(keyType, "chd4", "LUX", data[5].__EMPTY_4);
        setUHValues(keyType, "chd8", "LUX", data[5].__EMPTY_5);

        setUHValues(keyType, "adt", "LUXC", data[6].__EMPTY_1);
        setUHValues(keyType, "adtex", "LUXC", data[6].__EMPTY_2);
        setUHValues(keyType, "chd0", "LUXC", data[6].__EMPTY_3);
        setUHValues(keyType, "chd4", "LUXC", data[6].__EMPTY_4);
        setUHValues(keyType, "chd8", "LUXC", data[6].__EMPTY_5);

        setUHValues(keyType, "adt", "LUXH", data[6].__EMPTY_1);
        setUHValues(keyType, "adtex", "LUXH", data[6].__EMPTY_2);
        setUHValues(keyType, "chd0", "LUXH", data[6].__EMPTY_3);
        setUHValues(keyType, "chd4", "LUXH", data[6].__EMPTY_4);
        setUHValues(keyType, "chd8", "LUXH", data[6].__EMPTY_5);

      });
    }
  };

  const BoxInputFile = ({
    title,
    type,
  }: {
    title: string;
    type: "midweek" | "weekend" | "holiday";
  }) => {
    const day =
      type === "midweek" ? midweek : type === "weekend" ? weekend : holiday;
    const label =
      type === "midweek"
        ? "MDS"
        : type === "weekend"
        ? "FDS"
        : "Tarifário base";
    return (
      <div
        className="box-input"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label htmlFor="" style={{ fontWeight: "bold" }}>
          {label}:
        </label>
        <Button
          component="label"
          variant="contained"
          disabled={manualInput}
          color={day === "" ? "primary" : "success"}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
            {day === "" ? title : day} <Folder />
          </div>
          <input
            type="file"
            hidden
            onChange={(e) => handleChangeInput(e, type)}
          />
        </Button>
      </div>
    );
  };

  return (
    <div className="input-tables">
      <div className="titleContainerBx">{title}</div>

      <FormControlLabel
        value={manualInput}
        control={<Checkbox />}
        label="Inserir valores manualmente"
        labelPlacement="end"
        onChange={(e) => {
          let checked = e as React.ChangeEvent<HTMLInputElement>;
          setManualInput(checked.target.checked);
          next(checked.target.checked);
        }}
      />

      <div
        className="container-input"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {typeTariff === "common" ? (
          <>
            <BoxInputFile title="valores para meio de Semana" type="midweek" />
            <BoxInputFile title="valores para Fim de Semana" type="weekend" />
          </>
        ) : (
          <BoxInputFile title="tabela com valores" type="holiday" />
        )}
      </div>
    </div>
  );
};
