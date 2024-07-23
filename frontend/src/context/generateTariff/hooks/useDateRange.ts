import { useEffect, useState } from "react";
import { selectionRangeInitial } from "../initial";
import { AppHotelProps } from "../../../hooks/appHotel/interfaces";
import { getHolidays } from "../functions/getters/getHolidays";
import { getMonthsWithTariffs } from "../functions/getters/getMonthsWithTariffs";

const useDateRange = () => {
  const [selectionRange, setSelectionRange] = useState(selectionRangeInitial);
  const [stateApp, setStateApp] = useState<AppHotelProps | null>(null);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [monthsWithTariffs, setMonthsWithTariffs] = useState<string[]>([]);

  function handleSelectDate(ranges: any) {
    setStateApp(null);
    if (ranges.selection) setSelectionRange(selections => {
      const result = selections.map( range => {
        if(range.key === 'selection') {
          return ranges.selection
        }
        return range
      })
      return result
    });
    if (ranges.second) setSelectionRange(selections => {
      let find = false;
      const result = selections.map( range => {
        if(range.key === 'second') {
          find = true;
          console.log('aqui')

          return ranges.second
        }
        return range
      })
      if (!find) return [
        ...result,
        ranges.second,
      ]
      return result
    });
    if (ranges.clear) setSelectionRange([selectionRange[0]]);
  }  

  async function getVariables() {
    setHolidays(await getHolidays());
    setMonthsWithTariffs(await getMonthsWithTariffs());
  }

  useEffect(() => {
    getVariables();
  }, [])


  return ({
    holidays,
    monthsWithTariffs,
    selectionRange,
    setStateApp,
    stateApp,
    handleSelectDate
  })
}

export default useDateRange