import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/api/api";
import {
  AllTariffsProps,
  GroupValuesProps,
} from "../../../hooks/api/interfaces";
import { initValuesUHS } from "../../../pages/NewTariffs";
import CollapsibleTableTariff from "../../TableCollapseTariffs";
import { createData } from "../../TableCollapseTariffs/helpers";
import { tariffSelectProps } from "../typeTariff";

interface NameAndConfirmStepProps {
  typeTariff: tariffSelectProps;
  dates: string[];
  tariffValues: ValuesForCreateTariff;
}

interface ValuesForCreateTariff {
  foodValues: GroupValuesProps;
  tenHourValues: GroupValuesProps;
  twentyHourValues: GroupValuesProps;
  FDSValues: typeof initValuesUHS;
  MDSValues: typeof initValuesUHS;
  SpecificValues: typeof initValuesUHS;
}

export const NameAndConfirmStep = ({
  typeTariff,
  dates,
  tariffValues,
}: NameAndConfirmStepProps) => {
  const api = useApi();
  const [row, setRow] = useState<ReturnType<typeof createData>[]>([]);
  const [name, setName] = useState("");
  const [nameMDS, setNameMDS] = useState("");
  const [nameFDS, setNameFDS] = useState("");
  const [pipeNum, setPipeNum] = useState(0);
  const [foodID, setFoodID] = useState(0);
  const [tariffs, setTariffs] = useState<AllTariffsProps[]>([]);

  const getTariffs = async () => {
    const response = await api.getAllTariffs();
    setTariffs(response);
  };

  const makeRow = () => {
    let createdRow = createData({
      name: name,
      product_pipe: `${pipeNum}`,
      active: true,
      order_id: 1,
      food_id: foodID,
      food: {
        id: foodID,
        ...tariffValues.foodValues,
      },
      TariffCheckInValues: [
        {
          id: 0,
          type: "10h",
          tariffs_id: "",
          ...tariffValues.tenHourValues,
        },
        {
          id: 0,
          type: "12h",
          tariffs_id: "",
          ...tariffValues.twentyHourValues,
        },
      ],
      TariffValues: [
        {
          id: 0,
          category_id: "PAD",
          tariffs_id: "",
          ...tariffValues.FDSValues.PAD,
        },
      ],
      tariffs_to_midweek: [],
      tariffs_to_weekend: [],
      SpecificDates: [],
    });
    setRow([createdRow]);
  };

  useEffect(() => {
    makeRow();
    getTariffs();
  }, []);
  return (
    <div className="name-and-confirm-step">
      <div
        className="input-name-for-tariff"
        style={{
          margin: 50,
        }}
      >
        {typeTariff === "specific" ? (
          <div
            className="input-name-box"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <TextField label="Nome do Tarifário" />
            <TextField label="Numero Pipedrive" />
          </div>
        ) : (
          <div
            className="input-name-box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              className="input-name-single"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <TextField
                label="Nome do Tarifário para MDS"
                disabled
                value={nameMDS}
              />
              <TextField label="Numero Pipedrive" />
            </div>

            <div
              className="input-name-single"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <TextField
                label="Nome do Tarifário para FDS"
                disabled
                value={nameFDS}
              />
              <TextField label="Numero Pipedrive" />
            </div>
          </div>
        )}
      </div>

      <div className="confirm-information">
        <CollapsibleTableTariff
          rows={row}
          allTariffs={tariffs}
          ButtonsOn={false}
        />
      </div>
    </div>
  );
};
