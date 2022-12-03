import { RowsProps } from "./CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function childBudget(
  arrChild: string[],
  arrForm: any[],
  initDate: Date,
  finalDate: Date
) {
  let childRows: RowsProps[] = [];

  arrChild.sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
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
