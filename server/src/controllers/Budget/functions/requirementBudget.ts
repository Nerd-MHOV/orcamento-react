import { ArrFormProps, RowsProps } from "../CalcBudgetController";
import { generateBudgetRequirement } from "./generateBudgetRequirement";

export async function requirementBudget(
  initDate: Date,
  finalDate: Date,
  arrForm: ArrFormProps,
  arrRequirement: string[]
) {
  let requirementRows: RowsProps[] = [];

  for (
    let countRequirement = 0;
    countRequirement < arrRequirement.length;
    countRequirement++
  ) {
    const numRequirement = countRequirement + 1;
    let valueRequirement: number[] = [];
    let totalRequirement = 0;
    let uRequirement = arrRequirement[countRequirement];

    valueRequirement = await generateBudgetRequirement(
      initDate,
      finalDate,
      arrForm,
      uRequirement
    );

    for (let i = 0; i < valueRequirement.length; i++) {
      totalRequirement += valueRequirement[i];
    }

    requirementRows.push({
      id: 400 + numRequirement,
      desc: uRequirement,
      values: valueRequirement,
      total: totalRequirement,
    });
  }

  return requirementRows;
}
