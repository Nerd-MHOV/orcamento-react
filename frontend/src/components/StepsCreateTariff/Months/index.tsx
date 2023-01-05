import { tariffSelectProps } from "../typeTariff";
import { CommonMonths } from "./CommonMonth";
import { SpecificMonth } from "./SpecificMonth";

interface MonthsCommonProps {
  typeTariff: tariffSelectProps;
  handleSetDates: (dates: string[]) => void;
}
export const MonthsCommon = ({
  typeTariff,
  handleSetDates,
}: MonthsCommonProps) => {
  return (
    <div className="months-common">
      {typeTariff === "common" && (
        <CommonMonths handleSetDates={handleSetDates} />
      )}
      {typeTariff === "specific" && (
        <SpecificMonth handleSetDates={handleSetDates} />
      )}
    </div>
  );
};
