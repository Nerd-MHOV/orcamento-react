import { addDays } from "date-fns";
import { Request, Response } from "express";
import { adultBudget } from "./adultBudget";
import { childBudget } from "./childBudget";
import { petBudget } from "./petBudget";

export type RowsProps = {
  id: number;
  desc: string;
  values: number[];
  total: number;
};

export type PetProps = "pequeno" | "médio" | "grande";

export class CalcBudgetController {
  async handle(request: Request, response: Response) {
    const {
      arrForm,
      arrChild,
      arrPet,
      rangeDate,
    }: {
      arrForm: any[];
      arrChild: string[];
      arrPet: PetProps[];
      rangeDate: {
        startDate: string;
        endDate: string;
        [key: string]: any;
      };
    } = request.body;

    //vars:
    let adultRows: RowsProps[] = [];
    let childRows: RowsProps[] = [];
    let petRows: RowsProps[] = [];

    let lastRow: RowsProps[] = [];

    let initDate = new Date(rangeDate.startDate);
    let finalDate = new Date(rangeDate.endDate);

    finalDate = addDays(finalDate, 1);

    //adult
    adultRows = await adultBudget(arrForm, initDate, finalDate);

    //child
    childRows = await childBudget(arrChild, arrForm, initDate, finalDate);

    //pet
    petRows = await petBudget(arrPet, initDate, finalDate, arrForm);

    let completeRows = [...adultRows, ...childRows, ...petRows, ...lastRow];

    return response.json(completeRows);
  }
}
