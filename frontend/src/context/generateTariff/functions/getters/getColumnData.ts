import { addDays, format } from "date-fns";
import { SelectionRangeProps } from "../../../../components/FormOrc/Interfaces";

export function getColumnData(date: SelectionRangeProps) {
  let newColumn: string[] = ["Desc"];
  let init = date.startDate;
  let final = date.endDate;
  if (format(init, "dd-MM-yy") === format(final, "dd-MM-yy")) {
    final = addDays(final, 1);
  }

  while (init < final) {
    newColumn.push(format(init, "dd/MM"));
    init = addDays(init, 1);
  }
  return newColumn;
}
