import {
  ArrFormProps,
  RowsProps,
  UnitaryDiscountProps,
} from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function childBudget(
  arrForm: ArrFormProps,
  arrChild: number[],
  unitaryDiscount: UnitaryDiscountProps[],
  initDate: Date,
  finalDate: Date
) {
  let amountAdults = arrForm.adult ?? 0;
  let amountChild = arrChild.length;
  let childRows: RowsProps[] = [];

  arrChild.sort((a, b) => a - b);
  for (let countChild = 0; countChild < arrChild.length; countChild++) {
    const numChild = countChild + 1;
    let valuesChild: number[] = [];
    let totalChild = 0;
    let discount = (Number(arrForm.discount) || 0) / 100;
    let totalNoDiscount = 0;
    let discountApplied = 0;
    let uChild = Number(arrChild[countChild]);
    let permitDiscount = true;
    const id = 200 + numChild;
    const desc = "CHD " + uChild + " ano(s)";

    if (uChild <= 3 && numChild === 1) {
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd0");
      permitDiscount = false;
    } else if ((uChild > 3 && uChild < 8) || (uChild < 8 && numChild > 1))
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd4");
    else
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd8");

    //COBRAR SO ALIMENTAÇÃO
    if (numChild === 1 && uChild > 3 && uChild < 10) {
      permitDiscount = false;
      valuesChild = await generateBudget(
        initDate,
        finalDate,
        arrForm,
        "chd8",
        true
      );
    }

    if (Number(amountAdults) === 1 && countChild === amountChild - 1) {
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "adt");
    }

    //verify unitary discount
    unitaryDiscount.map((unit) => {
      if (unit.id === id && unit.name === desc) {
        discount = unit.discount / 100;
        permitDiscount = true;
      }
    });

    const valuesWithDiscountChild = valuesChild.map((child) => {
      if (!permitDiscount) {
        totalChild += child;
        totalNoDiscount += child;
        return child;
      }
      let resultDiscount = child * discount;
      let result = Math.round(child - resultDiscount);
      totalChild += result;
      totalNoDiscount += child;
      discountApplied = discount * 100;
      return result;
    });

    childRows.push({
      id,
      desc,
      values: valuesWithDiscountChild,
      total: totalChild,
      noDiscount: valuesChild,
      totalNoDiscount,
      discountApplied,
    });
  }

  return childRows;
}
