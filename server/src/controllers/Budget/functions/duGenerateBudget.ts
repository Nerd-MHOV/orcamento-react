import { addDays, format, isWeekend } from "date-fns";
import { prismaClient } from "../../../database/prismaClient";

const daysOfWeekend = ["Fri", "Sat", "Sun"];

export async function duGenerateBudget(
  date: Date,
  arrForm: any,
  ageGroup: "adt" | "chd0" | "chd6"
) {
  const valuesBudget = [];
  let tariffBudget = 0;
  let tariffName = "";

  if (arrForm.category.match(/Full/)) {
    if (isWeekend(date)) {
      tariffName = "Day-Use 2023 - Full - FDS";
    } else {
      tariffName = "Day-Use 2023 - Full - MDS";
    }
  }

  if (arrForm.category.match(/Tradicional/)) {
    if (isWeekend(date)) {
      tariffName = "Day-Use 2023 - Tradicional - FDS";
    } else {
      tariffName = "Day-Use 2023 - Tradicional - MDS";
    }
  }

  const responseSpecific = await prismaClient.specificDates.findFirst({
    where: {
      date: format(date, "yyyy-MM-dd"),
    },
    include: {
      tariffs: {
        include: {
          food: true,
          TariffValues: true,
        },
      },
    },
  });

  if (responseSpecific) {
    if (arrForm.category.match(/Full/))
      tariffName = "Day-Use 2023 - Full - FDS";
    else tariffName = "Day-Use 2023 - Tradicional - FDS";
  }

  let tariffs = await prismaClient.dUTariff.findUnique({
    where: { name: tariffName },
    include: {
      DUTariffValues: true,
    },
  });

  if (tariffs) {
    tariffBudget = tariffs.DUTariffValues[0][ageGroup];
  }

  valuesBudget.push(tariffBudget);

  date = addDays(date, 1);

  return valuesBudget;
}
