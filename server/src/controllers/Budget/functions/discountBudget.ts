import { RowsProps } from "../CalcBudgetController";
import { generateBudget } from "./generateBudget";

export async function discountBudget(
  arrForm: any,
  arrChild: number[],
  initDate: Date,
  finalDate: Date
) {
  let discountRow: RowsProps[] = [];
  let valuesDiscount: number[] = [];

  //ADULT
  let amountAdults = arrForm.adult ?? 0;
  let countAdult = 0;
  while (countAdult < amountAdults) {
    countAdult++;
    let valuesAdult: number[] = [];
    if (countAdult <= 2) {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adt");
    } else {
      valuesAdult = await generateBudget(initDate, finalDate, arrForm, "adtex");
    }

    for (let i = 0; i < valuesAdult.length; i++) {
      valuesAdult[i] =
        valuesAdult[i] !== 0 && Number(arrForm.discount) !== 0
          ? (valuesAdult[i] * Number(arrForm.discount)) / 100
          : 0;
      valuesAdult[i] = -Math.round(valuesAdult[i]);

      valuesDiscount[i] = valuesDiscount[i]
        ? valuesDiscount[i] + valuesAdult[i]
        : 0 + valuesAdult[i];
    }
  }

  //Child

  arrChild.sort((a, b) => a - b);
  for (let countChild = 0; countChild < arrChild.length; countChild++) {
    const numChild = countChild + 1;
    let valuesChild: number[] = [];
    let uChild = Number(arrChild[countChild]);

    if (uChild <= 3 && numChild == 1)
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd0");
    else if ((uChild > 3 && uChild < 8) || (uChild < 8 && numChild > 1))
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd4");
    else
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd8");

    //COBRAR SO ALIMENTAÇÂO
    if (numChild === 1 && uChild > 3 && uChild < 10)
      valuesChild = await generateBudget(initDate, finalDate, arrForm, "chd0");

    for (let i = 0; i < valuesChild.length; i++) {
      valuesChild[i] =
        valuesChild[i] !== 0 && Number(arrForm.discount) !== 0
          ? (valuesChild[i] * Number(arrForm.discount)) / 100
          : 0;
      valuesChild[i] = -Math.round(valuesChild[i]);

      valuesDiscount[i] = valuesDiscount[i]
        ? valuesDiscount[i] + valuesChild[i]
        : 0 + valuesChild[i];
    }
  }

  let totalDiscount = 0;
  for (let value of valuesDiscount) {
    totalDiscount += value;
  }

  discountRow.push({
    id: 599,
    desc: "Desconto",
    values: valuesDiscount,
    total: totalDiscount,
  });

  if (discountRow[0].total === 0 || !discountRow[0].total) discountRow = [];

  return discountRow;
}
