import {
  ArrFormProps,
  ArrRequirementProps,
  RowsProps,
  UnitaryDiscountProps,
} from "../CalcBudgetController";
import { generateBudgetRequirement } from "./generateBudgetRequirement";

export async function requirementBudget(
  arrForm: ArrFormProps,
  arrRequirement: ArrRequirementProps[],
  unitaryDiscount: UnitaryDiscountProps[],
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
    const id = 400 + numRequirement;
    let discount = 0;
    let totalNoDiscount = 0;

    valueRequirement = await generateBudgetRequirement(
      initDate,
      finalDate,
      arrForm,
      arrRequirement[countRequirement]
    );

    //verify unitary discount
    unitaryDiscount.map((unit) => {
      if (unit.id === id && unit.name === nameRequirement) {
        discount = unit.discount / 100;
      }
    });

    const valueWithDiscount = valueRequirement.map((value) => {
      totalNoDiscount += value;
      let resultDiscount = value * discount;
      let result = Math.round(value - resultDiscount);
      totalRequirement += result;

      return result;
    });

    const quantity = arrRequirement[countRequirement].values;

    let nameRequirement = uRequirement + " [";

    if (quantity.adult > 0) nameRequirement += ` ${quantity.adult} ADT`;
    if (quantity.child.length > 0)
      nameRequirement += ` ${quantity.child.length} CHD`;
    if (quantity.amount > 0) nameRequirement += ` ${quantity.amount}x`;

    nameRequirement += " ]";

    requirementRows.push({
      id,
      desc: nameRequirement,
      values: valueWithDiscount,
      total: totalRequirement,
      noDiscount: valueRequirement,
      totalNoDiscount: totalNoDiscount,
      discountApplied: discount * 100,
    });
  }

  return requirementRows;
}
