import { addDays } from "date-fns";
import { Request, Response } from "express";
import { ArrFormProps, RowsProps } from "./CalcBudgetController";
import { duAdultBudget } from "./functions/duAdultBudget";
import { duChildBudget } from "./functions/duChildBudget";
import { petBudget } from "./functions/petBudget";
import { requirementBudget } from "./functions/requirementBudget";
import getPeriod from "./functions/getPeriod";
export type PetProps = "pequeno" | "médio" | "grande";

export class CalcBudgetDUController {
  async handle(request: Request, response: Response) {
    const {
      arrForm,
      arrChild,
      arrPet,
      arrRequirement,
      rangeDate,
    }: {
      arrForm: ArrFormProps;
      arrChild: number[];
      arrPet: PetProps[];
      arrRequirement: any[];
      rangeDate: {
        startDate: string;
        endDate: string;
        key: string;
      };
    } = request.body;

    //vars:
    let adultRows: RowsProps[];
    let childRows: RowsProps[];
    let petRows: RowsProps[];

    let requirementRows: RowsProps[];
    let discountRow: RowsProps[] = [];


    let initDate = new Date(rangeDate.startDate);
    // let finalDate = new Date(rangeDate.endDate);
    // finalDate = addDays(finalDate, 1);
    const mainPeriod = getPeriod([rangeDate])

    

    //adult
    adultRows = await duAdultBudget(arrForm, arrChild, initDate);

    //child
    childRows = await duChildBudget(arrChild, arrForm, initDate);

    //pet
    petRows = await petBudget(arrForm, arrPet, [], mainPeriod, mainPeriod);

    // requirement;
    requirementRows = await requirementBudget(
      arrForm,
      arrRequirement,
      [],
      mainPeriod,
      mainPeriod
    );

    let completeRows = [
      ...adultRows,
      ...childRows,
      ...petRows,
      ...requirementRows,
      ...discountRow,
    ];

    return response.json({
      rows: completeRows,
    });
  }
}

