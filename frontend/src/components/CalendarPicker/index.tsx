import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import { SelectionRangeProps } from "../FormOrc/Interfaces";

interface CalendarPickerProps {
  handleSelect: (range: any) => Promise<void>;
  holidays: String[];
  monthsWithTariffs: String[];
  selectionRange: SelectionRangeProps;
}

export const CalendarPicker = ({
  handleSelect,
  holidays,
  monthsWithTariffs,
  selectionRange,
}: CalendarPickerProps) => {
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
    if (holidays.includes(format(day, "yyyy-MM-dd"))) {
      return false;
    }

    if (monthsWithTariffs.includes(format(day, "yyyy-MM"))) {
      return false;
    }

    return true;
  }

  return (
    <DateRangePicker
      ranges={[selectionRange]}
      onChange={handleSelect}
      months={2}
      showDateDisplay={false}
      disabledDay={customDisableDays}
      dayContentRenderer={customDayContent}
      direction="horizontal"
      locale={ptBR}
    />
  );
};
