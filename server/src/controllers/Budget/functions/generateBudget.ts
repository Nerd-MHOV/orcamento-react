import { Categories } from "@prisma/client";
import { addDays, format } from "date-fns";
import { prismaClient } from "../../../database/prismaClient";
import { getTariff } from "./getTariff";

const daysOfWeekend = ["Fri", "Sat", "Sun"];

export async function generateBudget(
  initDate: Date,
  finalDate: Date,
  arrForm: any,
  ageGroup: "adt" | "adtex" | "chd0" | "chd4" | "chd8",
  onlyFood: boolean,
  daily_courtesy: boolean
) {
  const valuesBudget = [];

  while (initDate < finalDate) {
    let dayMonthYear = format(initDate, "yyyy-MM-dd");
    let monthYear = format(initDate, "yyyy-MM");
    let dayWeek = format(initDate, "E");
    let month = format(initDate, "MM");
    let tariffBudget = 0;
    let tariffs = await getTariff(dayMonthYear, monthYear);

    let numCategory = (await prismaClient.categories.findFirst({
      where: {
        name: arrForm.category,
      },
    })) || { id: 0 };

    let pension = 0;
    if (arrForm.pension === "simples") pension = 0;
    if (arrForm.pension === "meia") pension = 1;
    if (arrForm.pension === "completa") pension = 2;

    if (tariffs.tariff_mw) {
      let tariffWeek;
      let tariffFood = 0;
      if (
        daysOfWeekend.includes(dayWeek) ||
        (dayWeek === "Thu" && (month === "07" || month === "01"))
      ) {
        tariffWeek = tariffs.tariff_we.TariffValues;
        tariffFood = tariffs.tariff_we.food[ageGroup] * pension;
      } else {
        tariffWeek = tariffs.tariff_mw.TariffValues;
        tariffFood = tariffs.tariff_mw.food[ageGroup] * pension;
      }

      let tariffDay = tariffWeek.filter(
        (arr: any) => arr.category_id === numCategory.id
      )[0];

      tariffBudget = tariffDay[ageGroup] + tariffFood;

      if (onlyFood) tariffBudget = 90;
    }

    if (daily_courtesy && addDays(initDate, 2) > finalDate) {
      tariffBudget = 0;
    }

    valuesBudget.push(tariffBudget);

    initDate = addDays(initDate, 1);
  }

  return valuesBudget;
}
