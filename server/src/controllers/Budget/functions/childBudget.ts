import { ArrFormProps, RowsProps } from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function childBudget(
  arrChild: number[],
  arrForm: ArrFormProps,
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
    let uChild = Number(arrChild[countChild]);

    if (uChild <= 3 && numChild === 1)
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd0");
    else if ((uChild > 3 && uChild < 8) || (uChild < 8 && numChild > 1))
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd4");
    else
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd8");

    //COBRAR SO ALIMENTAÇÂO
    if (numChild === 1 && uChild > 3 && uChild < 10)
      valuesChild = await generateBudget(
        initDate,
        finalDate,
        arrForm,
        "chd8",
        true
      );

    if (Number(amountAdults) === 1 && countChild === amountChild - 1) {
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "adt");
    }

    for (let i = 0; i < valuesChild.length; i++) {
      totalChild += valuesChild[i];
    }

    childRows.push({
      id: 200 + numChild,
      desc: "CHD " + numChild,
      values: valuesChild,
      total: totalChild,
    });
  }

  return childRows;
}
