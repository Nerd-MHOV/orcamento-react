import { addDays, differenceInDays, format } from "date-fns";
import { useApi } from "../../../../hooks/api/api";

export const getAllowedDiscount = async (selectionRange: {
  startDate: Date;
  endDate: Date;
  key: string;
}) => {
  const api = useApi();
  const discountData = await api.getAllDiscounts();
  let unitaryAllowed = 0;
  let generalAllowed = 0;
  let daily_courtesy = false;
  let limitPearDay: {
    date: string;
    generalAllowed: number;
    unitaryAllowed: number;
  }[] = [];
  let initialDate = selectionRange.startDate;
  let finalDate = selectionRange.endDate;
  let days = differenceInDays(finalDate, initialDate);

  while (initialDate <= finalDate) {
    let limitGeneral = 0;
    let limitUnitary = 0;
    discountData.map((el) => {
      el.dates.map((date) => {
        if (date.date === format(initialDate, "yyyy-MM-dd")) {
          limitGeneral = el.percent_general;
          limitUnitary = el.percent_unitary;
          if (el.daily_courtesy && days > 2) daily_courtesy = true;
          if (unitaryAllowed < el.percent_unitary)
            unitaryAllowed = el.percent_unitary;
          if (generalAllowed < el.percent_general)
            generalAllowed = el.percent_general;
        }
      });
    });

    limitPearDay.push({
      date: format(initialDate, "yyyy-MM-dd"),
      generalAllowed: limitGeneral,
      unitaryAllowed: limitUnitary,
    });

    initialDate = addDays(initialDate, 1);
  }

  return {
    daily_courtesy,
    unitaryAllowed,
    generalAllowed,
    limitPearDay,
  };
};
