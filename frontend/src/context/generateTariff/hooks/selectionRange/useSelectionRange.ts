import { useState } from "react";
import { selectionRangeInitial } from "../../initial";
import { AppHotelProps } from "../../../../hooks/appHotel/interfaces";
import DataContentProps from "../../interfaces/tableBudgetDataContentProps";
import { getColumnData } from "../../functions/getters/getColumnData";

const useSelectionRange = () => {
  const [selectionRange, setSelectionRange] = useState(selectionRangeInitial);
  const [stateApp, setStateApp] = useState<AppHotelProps | null>(null);

  async function handleSelectDate(ranges: any) {
    setStateApp(null);
    setSelectionRange(ranges.selection);
  }

    return ({
        selectionRange,
        setStateApp,
        stateApp,
        handleSelectDate
    })
}

export default useSelectionRange