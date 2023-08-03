import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {useContext, useEffect} from "react";
import { DateRangePicker } from "react-date-range";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import useQuery from "../../hooks/urlQuery/query";

export const CalendarPicker = () => {
  const { handleSelectDate, holidays, monthsWithTariffs, selectionRange } =
    useContext(GenerateTariffContext);

  const query = useQuery();
  function customDayContent(day: Date) {
    let extraDot = null;
    if (holidays.includes(format(day, "yyyy-MM-dd"))) {
      extraDot = (
        <div
          style={{
            height: "5px",
            width: "5px",
            borderRadius: "100%",
            background: "orange",
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
      );
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }

  function customDisableDays(day: Date) {
    if (holidays.includes(format(day, "yyyy-MM-dd")))  return false;
    else if (monthsWithTariffs.includes(format(day, "yyyy-MM"))) return false;
    return true;
  }

    useEffect(() => {
        if(query.get("check-in") && query.get("check-out")) {
            setTimeout(() => {
                handleSelectDate({
                    selection: {
                        startDate: new Date(query.get("check-in")!),
                        endDate: new Date(query.get("check-out")!),
                        key: "selection"
                    }
                })
            }, 1000)
        }
    }, []);

  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelectDate}
      months={2}
      showDateDisplay={false}
      disabledDay={customDisableDays}
      dayContentRenderer={customDayContent}
      direction="horizontal"
      locale={ptBR}
    />
  );
};
