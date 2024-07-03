import {Request, Response} from "express";
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

export interface ResponseValues { 
    rows: RowsProps[],
    total: RowsProps,
}

export interface CorporateBodySendBudget {
    rooms: RoomCorporate[],
    pension: string,
    requirements: ArrRequirementProps[],
    discount: number,
    dateRange: DateRange,
    idClient: string | null,
}

export interface CorporateBodyResponseBudget {
    rooms: RoomCorporateResponse[],
    pension: string,
    requirements: ArrRequirementProps[],
    dateRange: DateRange,
    idClient: string | null,
    rowsValues: ResponseValues
}

export interface Category {
    label: string;
    unit: string;
    category: string;
}

export interface DateRange {
    startDate: string;
    endDate: string;
}


export class CalcBudgetCorpController {
    async handle(request: Request, response: Response) {
        const budget: CorporateBodySendBudget = request.body;
        let responseBudget = await mainCorp(budget)
        return response.json(responseBudget);
    }
}
