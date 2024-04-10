import {Request, Response} from "express";
import { MainBudgetProps, mainBudget } from "./functions/mainBudget";
import { mainCorp } from "./functions/mainCorp";
import { ArrRequirementProps, PetProps, RowsProps } from "./CalcBudgetController";

export interface RoomCorporate {
    adt: number,
    chd: number[],
    pet: PetProps[],
    roomNumber: Category,
}

export interface RoomCorporateResponse extends RoomCorporate {
    rowsValues: ResponseValues
}

export interface ArrRequirementPropsResponse extends ArrRequirementProps {
    rowsValues: ResponseValues
}

export interface ResponseValues { 
    rows: RowsProps[],
    total: RowsProps,
}

export interface CorporateBodySendBudget {
    rooms: RoomCorporate[],
    pension: string,
    requirements: ArrRequirementProps[],
    dateRange: DateRange,
    idClient: string | null,
}

export interface CorporateBodyResponseBudget {
    rooms: RoomCorporateResponse[],
    pension: string,
    requirements: ArrRequirementPropsResponse[],
    dateRange: DateRange,
    idClient: string | null,
}

export interface Category {
    label: string;
    unit: string;
    category: string;
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
};


export class CalcBudgetController {
    async handle(request: Request, response: Response) {
        const budget: CorporateBodySendBudget = request.body;
        let {rows} = await mainCorp(budget)
        return response.json({
            rows,
        });
    }
}
