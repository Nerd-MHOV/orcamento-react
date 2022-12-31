import { Tooltip } from "@mui/material";
import Btn from "../../Btn";
import "./style.scss";

export type tariffSelectProps = "common" | "specific" | null;

export const TypeTariff = ({
  handleSetTariff,
  selected,
}: {
  handleSetTariff: (type: tariffSelectProps) => void;
  selected: tariffSelectProps;
}) => {
  return (
    <div className="type-tariff">
      <Tooltip title="Quando o tarifário abrange um mês todo. ex: Janeiro 2023">
        <Btn
          action="Tarifário Comum"
          color={selected === "common" ? "blue" : ""}
          onClick={() => handleSetTariff("common")}
        />
      </Tooltip>
      <Tooltip title="Para feriados ou datas especificas">
        <Btn
          action="Data Especifica"
          color={selected === "specific" ? "blue" : ""}
          onClick={() => handleSetTariff("specific")}
        />
      </Tooltip>
    </div>
  );
};
