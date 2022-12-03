import { RowsProps } from "./CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function adultBudget(
  arrForm: any,
  initDate: Date,
  finalDate: Date
) {
  //ADULT
  let adultRows: RowsProps[] = [];
  let amountAdults = arrForm.adult ?? 0;
  let countAdult = 0;
  while (countAdult < amountAdults) {
    countAdult++;
    let valuesAdult: number[] = [];
    let totalAdult = 0;
    if (countAdult <= 2) {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adt");
    } else {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adtex");
    }

    for (let i = 0; i < valuesAdult.length; i++) {
      totalAdult += valuesAdult[i];
    }
    adultRows.push({
      id: 100 + countAdult,
      desc: "Adulto " + countAdult,
      values: valuesAdult,
      total: totalAdult,
    });
  }

  return adultRows;
}
