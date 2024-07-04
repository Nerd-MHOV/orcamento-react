import { ArrFormProps, ArrRequirementProps, PetProps, RowsProps, UnitaryDiscountProps } from "../CalcBudgetController";
import { adultBudget } from "./adultBudget";
import { childBudget } from "./childBudget";
import { petBudget } from "./petBudget";
import { requirementBudget } from "./requirementBudget";

export interface MainBudgetProps {
    arrForm: ArrFormProps;
    arrChild: number[];
    arrPet: PetProps[];
    arrRequirement: ArrRequirementProps[];
    rangeDate: {
        startDate: string; endDate: string; [key: string]: any;
    };
    unitaryDiscount: UnitaryDiscountProps[];
    dailyCourtesy: boolean;
}

export async function mainBudget({
    arrForm, arrChild, arrPet, arrRequirement, rangeDate, unitaryDiscount, dailyCourtesy,
}: MainBudgetProps) {
    //vars:
    let adultRows: RowsProps[] = [];
    let childRows: RowsProps[] = [];
    let petRows: RowsProps[] = [];

    let requirementRows: RowsProps[] = [];

    let initDate = new Date(rangeDate.startDate);
    let finalDate = new Date(rangeDate.endDate);

    //adult
    adultRows = await adultBudget(arrForm, arrChild, unitaryDiscount, dailyCourtesy, initDate, finalDate);

    //child
    childRows = await childBudget(arrForm, arrChild, unitaryDiscount, dailyCourtesy, initDate, finalDate);

    //pet
    petRows = await petBudget(arrForm, arrPet, unitaryDiscount, initDate, finalDate);

    //requirement
    requirementRows = await requirementBudget(arrForm, arrRequirement, unitaryDiscount, initDate, finalDate);

    return {
        rows: [...adultRows, ...childRows, ...petRows, ...requirementRows,],
    };
}