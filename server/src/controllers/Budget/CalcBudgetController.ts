import {Request, Response} from "express";
import {adultBudget} from "./functions/adultBudget";
import {childBudget} from "./functions/childBudget";
import {petBudget} from "./functions/petBudget";
import {requirementBudget} from "./functions/requirementBudget";
import { MainBudgetProps, mainBudget } from "./functions/mainBudget";

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
        adult: number; child: number[]; amount: number;
    };
}

export type PetProps = "pequeno" | "médio" | "grande";

export class CalcBudgetController {
    async handle(request: Request, response: Response) {
        const budget: MainBudgetProps = request.body;
        let {rows} = await mainBudget(budget)
        return response.json({
            rows,
        });
    }
}
