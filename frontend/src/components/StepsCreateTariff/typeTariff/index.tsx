import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
import Btn from "../../Btn";
import "./style.scss";

export const TypeTariff = () => {
  const { setTypeTariff, typeTariff } = useContext(CreateTariffContext);

  return (
    <div className="type-tariff">
      <Btn
        action="Tarifário Comum"
        color={typeTariff === "common" ? "blue" : ""}
        onClick={() => setTypeTariff("common")}
      />
      <Btn
        action="Data Especifica"
        color={typeTariff === "specific" ? "blue" : ""}
        onClick={() => setTypeTariff("specific")}
      />
    </div>
  );
};
