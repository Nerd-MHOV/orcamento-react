import { ArrFormProps, PetProps, RowsProps } from "../CalcBudgetController";
import { generateBudgetPet } from "./generateBudgetPet";

export async function petBudget(
  arrPet: PetProps[],
  initDate: Date,
  finalDate: Date,
  arrForm: ArrFormProps
) {
  let petRows: RowsProps[] = [];

  for (let countPet = 0; countPet < arrPet.length; countPet++) {
    const numPet = countPet + 1;
    let valuesPet: number[] = [];
    let totalPet = 0;
    let uPet = arrPet[countPet];

    valuesPet = await generateBudgetPet(initDate, finalDate, arrForm, uPet);

    for (let i = 0; i < valuesPet.length; i++) {
      totalPet += valuesPet[i];
    }

    petRows.push({
      id: 300 + numPet,
      desc: "PET " + uPet,
      values: valuesPet,
      total: totalPet,
    });
  }

  return petRows;
}
