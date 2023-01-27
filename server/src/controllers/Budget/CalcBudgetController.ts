import { addDays } from "date-fns";
import { Request, Response } from "express";
import { adultBudget } from "./functions/adultBudget";
import { childBudget } from "./functions/childBudget";
import { petBudget } from "./functions/petBudget";
import { requirementBudget } from "./functions/requirementBudget";

export type RowsProps = {
  id: number;
  desc: string;
  values: number[];
  total: number;
  noDiscount: number[];
  totalNoDiscount: number;
  discountApplied: number;
};

export interface ArrFormProps {
  adult?: number;
  discount?: number;
  category?: string;
  pension?: string;
  numberPipe?: number;
}

export interface UnitaryDiscountProps {
  id: number;
  name: string;
  discount: number;
}

export interface ArrRequirementProps {
  requirement: string;
  type: string;
  values: {
    adult: number;
    child: number[];
    amount: number;
  };
}

export type PetProps = "pequeno" | "médio" | "grande";

export class CalcBudgetController {
  async handle(request: Request, response: Response) {
    const {
      arrForm,
      arrChild,
      arrPet,
      arrRequirement,
      rangeDate,
      unitaryDiscount,
    }: {
      arrForm: ArrFormProps;
      arrChild: number[];
      arrPet: PetProps[];
      arrRequirement: ArrRequirementProps[];
      rangeDate: {
        startDate: string;
        endDate: string;
        [key: string]: any;
      };
      unitaryDiscount: UnitaryDiscountProps[];
    } = request.body;

    console.log(arrForm.category);
    //vars:
    let adultRows: RowsProps[] = [];
    let childRows: RowsProps[] = [];
    let petRows: RowsProps[] = [];

    let requirementRows: RowsProps[] = [];

    let initDate = new Date(rangeDate.startDate);
    let finalDate = new Date(rangeDate.endDate);

    //adult
    adultRows = await adultBudget(
      arrForm,
      arrChild,
      unitaryDiscount,
      initDate,
      finalDate
    );

    //child
    childRows = await childBudget(
      arrForm,
      arrChild,
      unitaryDiscount,
      initDate,
      finalDate
    );

    //pet
    petRows = await petBudget(
      arrForm,
      arrPet,
      unitaryDiscount,
      initDate,
      finalDate
    );

    //requirement
    requirementRows = await requirementBudget(
      arrForm,
      arrRequirement,
      unitaryDiscount,
      initDate,
      finalDate
    );

    let completeRows = [
      ...adultRows,
      ...childRows,
      ...petRows,
      ...requirementRows,
    ];

    return response.json({
      rows: completeRows,
    });
  }
}
