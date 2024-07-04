import { useState } from "react";
import { ApiDiscountProps } from "../../../hooks/api/interfaces";

const useActionsDiscount = () => {
    const [dailyCourtesy, setDailyCourtesy] = useState(false);
    const [actionSelected, setActionSelected] = useState<
      ApiDiscountProps | undefined
    >();

    return {
        dailyCourtesy,
        setDailyCourtesy,
        actionSelected,
        setActionSelected,
    }
}

export default useActionsDiscount