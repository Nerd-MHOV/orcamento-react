import { addDays, format, isDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useApi } from "../../../../hooks/api/api";
import { FindHolidaysProps } from "../../../../hooks/api/interfaces";
const initialDays = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export const SpecificMonth = ({
  handleSetDates,
}: {
  handleSetDates: (dates: string[]) => void;
}) => {
  const api = useApi();
  const [days, setDays] = useState<{
    startDate: Date;
    endDate: Date;
    key: string;
  }>(initialDays);
  const [holidays, setHolidays] = useState<FindHolidaysProps[]>([]);

  const getHolidays = async () => {
    const response = await api.findHolidays();
    console.log(response);
    setHolidays(response);
  };

  const handleGetDays = (ranges: { startDate: Date; endDate: Date }) => {
    if (isDate(ranges.startDate) && isDate(ranges.endDate)) {
      console.log(ranges);
      let stringDates = [];
      let init = ranges.startDate;
      while (init <= ranges.endDate) {
        console.log("ok");
        stringDates.push(format(init, "yyyy-MM-dd"));
        init = addDays(init, 1);
      }
      handleSetDates(stringDates);
    }
  };

  useEffect(() => {
    getHolidays();
  }, []);
  return (
    <div
      className="specific-month"
      style={{ display: "flex", width: "100%", justifyContent: "center" }}
    >
      <DateRange
        ranges={[days]}
        onChange={(ranges) => {
          if (
            typeof ranges.selection.startDate !== "undefined" &&
            typeof ranges.selection.endDate !== "undefined"
          ) {
            handleGetDays({
              startDate: ranges.selection.startDate,
              endDate: ranges.selection.endDate,
            });
            setDays({
              startDate: ranges.selection.startDate,
              endDate: ranges.selection.endDate,
              key: "selection",
            });
          }
        }}
        locale={ptBR}
        disabledDay={(day: Date) => {
          let holidaysDates = holidays.map((day) => day.date);
          if (holidaysDates.includes(format(day, "yyyy-MM-dd"))) return true;
          return false;
        }}
      />
    </div>
  );
};
