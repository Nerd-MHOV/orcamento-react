import { addDays, format } from "date-fns";
import SelectionRangeProps from "../../interfaces/selectionRangeProps";

export function getColumnDataCorp(date: SelectionRangeProps[]) {
  let newColumn: string[] = [];
  let dateRanges = []
  const dateSelection = date.find(d => d.key === "selection")
  const dateSecond = date.find(d => d.key === "second")
  if (dateSelection) dateRanges.push(dateSelection)
  if (dateSecond) dateRanges.push(dateSecond)

  dateRanges.forEach(dateRange => {
    let init = dateRange.startDate;
    let final = dateRange.endDate;

    if (format(init, "dd-MM-yy") === format(final, "dd-MM-yy")) {
      final = addDays(final, 1);
    }

    while (init < final) {
      newColumn.push(format(init, "dd/MM"));
      init = addDays(init, 1);
    }
  });

  //remove duplicadas
  return [...new Set(["Desc", ...newColumn.sort()])];
}
