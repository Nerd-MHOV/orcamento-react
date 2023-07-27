import { RowsProps } from "../CalcBudgetController";
import { duGenerateBudget } from "./duGenerateBudget";

export async function duAdultBudget(
  arrForm: any,
  arrChild: number[],
  initDate: Date
) {
  //ADULT
  let adultRows: RowsProps[] = [];
  let amountAdults = arrForm.adult ?? 0;
  let countAdult = 0;
  while (countAdult < amountAdults) {
    countAdult++;
    let valuesAdult: number[] = [];
    let totalAdult = 0;
    valuesAdult = await duGenerateBudget(initDate, arrForm, "adt");

    // //single
    // if (Number(amountAdults) === 1 && arrChild.length === 0) {
    //   valuesAdult = valuesAdult.map((value) => value * 2);
    // }

    for (let i = 0; i < valuesAdult.length; i++) {
      totalAdult += valuesAdult[i];
    }
    adultRows.push({
      id: 100 + countAdult,
      desc: "Adulto " + countAdult,
      values: valuesAdult,
      total: totalAdult,
      noDiscount: valuesAdult,
      totalNoDiscount: totalAdult,
      discountApplied: 0,
    });
  }

  return adultRows;
}
