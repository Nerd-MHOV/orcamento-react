import { RowsProps } from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function adultBudget(
  arrForm: any,
  arrChild: number[],
  initDate: Date,
  finalDate: Date
) {
  //ADULT
  let adultRows: RowsProps[] = [];
  let amountAdults = arrForm.adult ?? 0;
  let countAdult = 0;
  let discount = (Number(arrForm.discount) || 0) / 100;
  console.log(discount);
  while (countAdult < amountAdults) {
    countAdult++;
    let valuesAdult: number[] = [];
    let totalAdult = 0;
    if (countAdult <= 2) {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adt");
    } else {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adtex");
    }

    //single
    if (Number(amountAdults) === 1 && arrChild.length === 0) {
      valuesAdult = valuesAdult.map((value) => value * 2);
    }

    const valueWithDiscountAdult = valuesAdult.map((value) => {
      let resultDiscount = value * discount;
      let result = Math.round(value - resultDiscount);
      totalAdult += result;

      return result;
    });
    adultRows.push({
      id: 100 + countAdult,
      desc: "Adulto " + countAdult,
      values: valueWithDiscountAdult,
      total: totalAdult,
      noDiscount: valuesAdult,
    });
  }

  return adultRows;
}
