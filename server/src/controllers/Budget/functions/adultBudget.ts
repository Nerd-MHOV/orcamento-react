import { RowsProps, UnitaryDiscountProps } from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function adultBudget(
  arrForm: any,
  arrChild: number[],
  unitaryDiscount: UnitaryDiscountProps[],
  initDate: Date,
  finalDate: Date
) {
  //ADULT
  let adultRows: RowsProps[] = [];
  let amountAdults = arrForm.adult ?? 0;
  let countAdult = 0;
  while (countAdult < amountAdults) {
    let discount = (Number(arrForm.discount) || 0) / 100;
    countAdult++;
    const id = 100 + countAdult;
    const desc = "Adulto " + countAdult;
    let valuesAdult: number[] = [];
    let totalAdult = 0;
    let totalNoDiscount = 0;
    if (countAdult <= 2) {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adt");
    } else {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adtex");
    }

    //single
    if (Number(amountAdults) === 1 && arrChild.length === 0) {
      valuesAdult = valuesAdult.map((value) => value * 2);
    }

    //verify Discount Unitary
    unitaryDiscount.map((unit) => {
      if (unit.id === id && unit.name === desc) {
        discount = unit.discount / 100;
      }
    });
    const valueWithDiscountAdult = valuesAdult.map((value) => {
      totalNoDiscount += value;
      let resultDiscount = value * discount;
      let result = Math.round(value - resultDiscount);
      totalAdult += result;

      return result;
    });
    adultRows.push({
      id,
      desc,
      values: valueWithDiscountAdult,
      total: totalAdult,
      noDiscount: valuesAdult,
      totalNoDiscount: totalNoDiscount,
      discountApplied: discount * 100,
    });
  }

  return adultRows;
}
