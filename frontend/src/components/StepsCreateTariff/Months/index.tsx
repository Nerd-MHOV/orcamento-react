import { useContext } from "react";
import { CreateTariffContext } from "../../../context/createTariff/createTariff";
import { CommonMonths } from "./CommonMonth";
import { SpecificMonth } from "./SpecificMonth";

export const MonthsCommon = () => {
  const { typeTariff } = useContext(CreateTariffContext);
  return (
    <div className="months-common">
      {typeTariff === "common" && <CommonMonths />}
      {typeTariff === "specific" && <SpecificMonth />}
    </div>
  );
};
