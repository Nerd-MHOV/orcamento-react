import { addDays, isSameDay } from "date-fns";
import { DateRange } from "../CalcBudgetCorpController";

function getPeriod(date: DateRange[]) {
    let period: Date[] = [];
    let dateRanges = [];

    const dateSelection = date.find(d => d.key === "selection")
    const dateSecond = date.find(d => d.key === "second")
    if (dateSelection) dateRanges.push(dateSelection)
    if (dateSecond) dateRanges.push(dateSecond)
  
    // array com todas as datas;
    dateRanges.forEach(dateRange => {
        let init = new Date(dateRange.startDate);
        let final = new Date(dateRange.endDate);
        while (init < final) {
            period.push(init);
            init = addDays(init, 1);
        }
    })


    // remove duplicatas e ordena
    return period.filter((data, index, self) =>
        index === self.findIndex((d) => isSameDay(d, data))
    ).sort((a,b)=>a.getTime()-b.getTime());
}

export default getPeriod;