import {
  ArrFormProps,
  PetProps,
  RowsProps,
  UnitaryDiscountProps,
} from "../CalcBudgetController";
import { generateBudgetPet } from "./generateBudgetPet";

export async function petBudget(
  arrForm: ArrFormProps,
  arrPet: PetProps[],
  unitaryDiscount: UnitaryDiscountProps[],
  initDate: Date,
  finalDate: Date,
  room = 0,
) {
  let petRows: RowsProps[] = [];

  for (let countPet = 0; countPet < arrPet.length; countPet++) {
    const numPet = countPet + 1;
    let valuesPet: number[] = [];
    let totalPet = 0;
    let totalNoDiscount = 0;
    let uPet = arrPet[countPet];
    let discount = 0;
    const id = 300 + numPet + room;
    const desc = "PET " + uPet;
    const type = "pet";

    valuesPet = await generateBudgetPet(initDate, finalDate, arrForm, uPet);

    //verify unitary discount
    unitaryDiscount.map((unit) => {
      if (unit.id === id && unit.name.includes(desc) && unit.type === type) {
        discount = unit.discount / 100;
      }
    });

    const valueWithDiscountPet = valuesPet.map((value) => {
      totalNoDiscount += value;
      let resultDiscount = value * discount;
      let result = Math.round(value - resultDiscount);
      totalPet += result;

      return result;
    });
    petRows.push({
      id,
      desc,
      values: valueWithDiscountPet,
      total: totalPet,
      noDiscount: valuesPet,
      totalNoDiscount: totalNoDiscount,
      discountApplied: discount * 100,
      type: type,
    });
  }

  return petRows;
}
