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

  async function handleSelectDate(ranges: any) {
    setStateApp(null);
    setSelectionRange(ranges.selection);
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