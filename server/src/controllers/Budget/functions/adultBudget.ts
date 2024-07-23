import { RowsProps, UnitaryDiscountProps } from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function adultBudget(
  arrForm: any,
  arrChild: number[],
  unitaryDiscount: UnitaryDiscountProps[],
  daily_courtesy: boolean,
  mainPeriod: Date[],
  completePeriod: Date[],
  isCorp = false,
  room = 0,
) {
  //ADULT
  let adultRows: RowsProps[] = [];
  let amountAdults = arrForm.adult ?? 0;
  let countAdult = 0;
  while (countAdult < amountAdults) {
    let discount = (Number(arrForm.discount) || 0) / 100;
    countAdult++;
    const id = 100 + countAdult + room;
    const desc = "Adulto " + countAdult;
    const type = "adult";
    let valuesAdult: number[] = [];
    let totalAdult = 0;
    let totalNoDiscount = 0;
    if (countAdult <= 2) {
      valuesAdult = await generateBudget(
        mainPeriod,
        completePeriod,
        arrForm,
        "adt",
        false,
        daily_courtesy,
        isCorp
      );
    } else {
      valuesAdult = await generateBudget(
        mainPeriod,
        completePeriod,
        arrForm,
        "adtex",
        false,
        daily_courtesy,
        isCorp,
      );
    }

    //single
    if (Number(amountAdults) === 1 && arrChild.length === 0) {
      valuesAdult = valuesAdult.map((value) => value * 2);
    }

    //verify Discount Unitary
    unitaryDiscount.forEach((unit) => {
      if (unit.id === id && unit.name.includes(desc) && unit.type === type) {
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
      type: type,
    });
  }

  return adultRows;
}
