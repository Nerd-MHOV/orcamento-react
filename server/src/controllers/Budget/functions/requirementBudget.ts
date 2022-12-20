import { ArrFormProps, RowsProps } from "../CalcBudgetController";
import { generateBudgetRequirement } from "./generateBudgetRequirement";

export async function requirementBudget(
  initDate: Date,
  finalDate: Date,
  arrForm: ArrFormProps,
  arrRequirement: {
    requirement: string;
    type: string;
    values: {
      adult: number;
      child: number[];
      amount: number;
    };
  }[]
) {
  let requirementRows: RowsProps[] = [];

  //voucher municipal:
  if (arrForm.adult)
    arrRequirement.push({
      requirement: "voucher",
      type: "voucher",
      values: {
        adult: 0,
        child: [],
        amount: arrForm.adult,
      },
    });

  for (
    let countRequirement = 0;
    countRequirement < arrRequirement.length;
    countRequirement++
  ) {
    const numRequirement = countRequirement + 1;
    let valueRequirement: number[] = [];
    let totalRequirement = 0;
    let uRequirement = arrRequirement[countRequirement].requirement;
    let uType = arrRequirement[countRequirement].type;

    valueRequirement = await generateBudgetRequirement(
      initDate,
      finalDate,
      arrForm,
      arrRequirement[countRequirement]
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
