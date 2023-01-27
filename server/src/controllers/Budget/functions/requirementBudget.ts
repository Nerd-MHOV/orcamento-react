import { ArrFormProps, RowsProps } from "../CalcBudgetController";
import { generateBudgetRequirement } from "./generateBudgetRequirement";

export async function requirementBudget(
  arrForm: ArrFormProps,
  arrRequirement: {
    requirement: string;
    type: string;
    values: {
      adult: number;
      child: number[];
      amount: number;
    };
  }[],
  initDate: Date,
  finalDate: Date
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

    const quantity = arrRequirement[countRequirement].values;

    let nameRequirement = uRequirement + " [";

    if (quantity.adult > 0) nameRequirement += ` ${quantity.adult} ADT`;
    if (quantity.child.length > 0)
      nameRequirement += ` ${quantity.child.length} CHD`;
    if (quantity.amount > 0) nameRequirement += ` ${quantity.amount}x`;

    nameRequirement += " ]";

    requirementRows.push({
      id: 400 + numRequirement,
      desc: nameRequirement,
      values: valueRequirement,
      total: totalRequirement,
      noDiscount: valueRequirement,
      totalNoDiscount: totalRequirement,
      discountApplied: 0,
    });
  }

  return requirementRows;
}
