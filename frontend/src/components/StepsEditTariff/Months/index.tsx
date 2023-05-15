import { useContext } from "react";
import { EditTariffContext } from "../../../context/editTariff/editTariff";
import { CommonMonths } from "./CommonMonth";
import { SpecificMonth } from "./SpecificMonth";

export const MonthsCommon = () => {
  const { getTariffType } = useContext(EditTariffContext);
  const typeTariff = getTariffType();
  console.log("chegou aqui");
  return (
    <div className="months-common">
      {typeTariff !== "specific" && <CommonMonths />}
      {typeTariff === "specific" && <SpecificMonth />}
    </div>
  );
};
