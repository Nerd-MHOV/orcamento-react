import { addDays, format } from "date-fns";
import { prismaClient } from "../../../database/prismaClient";
import { ArrFormProps } from "../CalcBudgetController";

const daysOfWeekend = ["Fri", "Sat", "Sun"];

export async function generateBudgetRequirement(
  initDate: Date,
  finalDate: Date,
  arrForm: ArrFormProps,
  requirement: string
) {
  const valuesBudget = [];
  let firstDate = initDate;
  while (initDate < finalDate) {
    let dayMonthYear = format(initDate, "yyyy-MM-dd");
    let tariffBudget = 0;

    if (initDate === firstDate) {
      if (
        requirement === "check-in às 12h sem apto" ||
        requirement === "check-in às 10h com apto"
      ) {
        // check-ins
      } else {
        let tariff = await prismaClient.requirement.findUnique({
          where: {
            name: requirement,
          },
        });
        if (tariff) tariffBudget = tariff.price;
      }
    }

    valuesBudget.push(tariffBudget);

    initDate = addDays(initDate, 1);
  }

  return valuesBudget;
}
