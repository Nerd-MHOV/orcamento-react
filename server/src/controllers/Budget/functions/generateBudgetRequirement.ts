import { addDays, format } from "date-fns";
import { prismaClient } from "../../../database/prismaClient";
import { ArrFormProps } from "../CalcBudgetController";
import { getTariff } from "./getTariff";
import getPercentAdjustmentCorp from "./getPercentAdjustmentCorp";

const daysOfWeekend = ["Fri", "Sat", "Sun"];

export async function generateBudgetRequirement(
  initDate: Date,
  finalDate: Date,
  arrRequirement: {
    requirement: string;
    type: string;
    typeModal: string;
    values: {
      adult: number;
      child: number[];
      amount: number;
    };
  },
  isCorporate = false
) {
  const requirement = arrRequirement.requirement;
  const typeRequirement = arrRequirement.type;
  const typeModalRequirement = arrRequirement.typeModal;
  const values = arrRequirement.values;
  const valuesBudget = [];
  let firstDate = initDate;
  console.log(arrRequirement);
  while (initDate < finalDate) {
    let dayMonthYear = format(initDate, "yyyy-MM-dd");
    let monthYear = format(initDate, "yyyy-MM");
    let dayWeek = format(initDate, "E");
    let month = format(initDate, "MM");
    let tariffBudget = 0;

    if (initDate === firstDate) {
      if (typeRequirement === "both" && typeModalRequirement === "person") {
        const tariffValues = await getTariff(dayMonthYear, monthYear);
        let typeCheck = "";
        let adultValues = 0;
        let childValues = 0;
        if (requirement.match(/10h/)) {
          typeCheck = "10h";
        }

        if (requirement.match(/12h/)) {
          typeCheck = "12h";
        }

        // mds or fds
        let tariffWeek = "";
        if (
          daysOfWeekend.includes(dayWeek) ||
          (dayWeek === "Thu" && (month === "07" || month === "01"))
        ) {
          tariffWeek = tariffValues.tariff_we_id ?? "";
        } else {
          tariffWeek = tariffValues.tariff_mw_id ?? "";
        }

        let tariff = await prismaClient.tariffCheckInValues.findFirst({
          where: {
            AND: {
              tariffs_id: tariffWeek,
              type: typeCheck,
            },
          },
        });

        if (tariff) {
          //ADULT
          let amountAdults = values.adult;
          let countAdult = 0;
          while (countAdult < amountAdults) {
            countAdult++;
            if (countAdult <= 2) {
              adultValues += tariff.adt;
            } else {
              adultValues += tariff.adtex;
            }
          }

          //child
          let amountChild = values.child.length;
          values.child.sort((a, b) => a - b);
          for (
            let countChild = 0;
            countChild < values.child.length;
            countChild++
          ) {
            const numChild = countChild + 1;
            let uChild = Number(values.child[countChild]);

            if (uChild <= 3 && numChild === 1) childValues += tariff.chd0;
            else if ((uChild > 3 && uChild < 8) || (uChild < 8 && numChild > 1))
              childValues += tariff.chd4;
            else childValues += tariff.chd8;
          }

          tariffBudget = adultValues + childValues;

          if(isCorporate) {
            tariffBudget = Math.round(tariffBudget * (1 - getPercentAdjustmentCorp(initDate)));
          }
        }
      } else if (typeRequirement === "voucher") {
        let tariff = 3;
        tariffBudget = tariff * values.amount;
      } else {
        let tariff = await prismaClient.requirement.findUnique({
          where: {
            name: requirement,
          },
        });
        if (tariff) tariffBudget = tariff.price * values.amount;
      }
    }

    valuesBudget.push(tariffBudget);

    initDate = addDays(initDate, 1);
  }

  return valuesBudget;
}
