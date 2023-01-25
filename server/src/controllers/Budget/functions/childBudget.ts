import { ArrFormProps, RowsProps } from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function childBudget(
  arrForm: ArrFormProps,
  arrChild: number[],
  initDate: Date,
  finalDate: Date
) {
  let amountAdults = arrForm.adult ?? 0;
  let amountChild = arrChild.length;
  let childRows: RowsProps[] = [];
  let discount = (Number(arrForm.discount) || 0) / 100;

  arrChild.sort((a, b) => a - b);
  for (let countChild = 0; countChild < arrChild.length; countChild++) {
    const numChild = countChild + 1;
    let valuesChild: number[] = [];
    let totalChild = 0;
    let uChild = Number(arrChild[countChild]);
    let permitDiscount = true;

    if (uChild <= 3 && numChild === 1)
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd0");
    else if ((uChild > 3 && uChild < 8) || (uChild < 8 && numChild > 1))
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

    const valuesWithDiscountChild = valuesChild.map((child) => {
      if (!permitDiscount) return child;
      let resultDiscount = child * discount;
      let result = Math.round(child - resultDiscount);
      totalChild += result;

      return result;
    });

    childRows.push({
      id: 200 + numChild,
      desc: "CHD " + uChild + " ano(s)",
      values: valuesWithDiscountChild,
      total: totalChild,
      noDiscount: valuesChild,
    });
  }

  return childRows;
}
