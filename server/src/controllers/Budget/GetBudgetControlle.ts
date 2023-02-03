import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetBudgetController {
  async handle(request: Request, response: Response) {
    const budgets = await prismaClient.saveBudgets.findMany();
    return response.json(budgets);
  }
}
