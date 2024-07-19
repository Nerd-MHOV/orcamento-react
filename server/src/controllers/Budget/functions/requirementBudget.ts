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
  finalDate: Date,
  room = 0,
  isCorporate = false,
) {
  let requirementRows: RowsProps[] = [];
  const type = "requirement";
  //voucher municipal:
  if (arrForm.adult)
    arrRequirement.push({
      requirement: "voucher",
      type: "voucher",
      typeModal: "voucher",
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
    const id = 400 + numRequirement + room;
    let totalNoDiscount = 0;

    valueRequirement = await generateBudgetRequirement(
      initDate,
      finalDate,
      arrRequirement[countRequirement],
      isCorporate
    );

    const quantity = arrRequirement[countRequirement].values;


    //  NOME DO REQUERIMENTO
    let nameRequirement = uRequirement + " [";
    if (quantity.adult > 0) nameRequirement += ` ${quantity.adult} ADT`;
    if (quantity.child.length > 0)
      nameRequirement += ` ${quantity.child.length} CHD`;
    if (quantity.amount > 0) nameRequirement += ` ${quantity.amount}x`;
    nameRequirement += " ]";


    //verify unitary discount
    let discount = (unitaryDiscount.find(
      unit => unit.id === id && unit.name === nameRequirement && unit.type === type
    )?.discount ?? 0) / 100

    const valueWithDiscount = valueRequirement.map((value) => {
      totalNoDiscount += value;
      let resultDiscount = value * discount;
      let result = Math.round(value - resultDiscount);
      totalRequirement += result;

      return result;
    });

    requirementRows.push({
      id,
      desc: nameRequirement,
      values: valueWithDiscount,
      total: totalRequirement,
      noDiscount: valueRequirement,
      totalNoDiscount: totalNoDiscount,
      discountApplied: discount * 100,
      type: type,
    });
  }

  return requirementRows;
}
