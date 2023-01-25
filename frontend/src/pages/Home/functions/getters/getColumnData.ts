import { addDays, format } from "date-fns";
import { SelectionRangeProps } from "../../../../components/FormOrc/Interfaces";

export function getColumnData(date: SelectionRangeProps) {
  let newColumn: string[] = ["Desc"];
  let init = date.startDate;
  let final = date.endDate;
  while (init < final) {
    newColumn.push(format(init, "dd/MM"));
    init = addDays(init, 1);
  }
  return newColumn;
}
